#!/usr/bin/env python3
"""Gera prospeccao/n8n/buscar-leads.workflow.json (importar no n8n).
Uso: python3 prospeccao/n8n/gerar-workflow.py"""
import json, os

CODE_BUSCAS = r"""
const p = $('Parâmetros').first().json;
const bairros = String(p.bairros || '').split(',').map(s => s.trim()).filter(Boolean);
const queries = [`${p.ramo} em ${p.cidade}`, ...bairros.map(b => `${p.ramo} ${b} ${p.cidade}`)];
return queries.map(q => ({ json: { query: q } }));
""".strip()

CODE_FILTRO = r"""
const p = $('Parâmetros').first().json;
const FRACOS = ['instagram.com','linktr.ee','linktree.com','wa.me','api.whatsapp.com','whatsapp.com','facebook.com','fb.com','beacons.ai','bio.link','lnk.bio','taplink.cc','campsite.bio'];
const REDE = /franquia|franchis|\brede\b|\bunidade\b|\bfilial\b|shopping/i;
const OBJ = {
  'boutique': 'catálogo, endereço e botão de WhatsApp',
  'barbearia': 'serviços, endereço e botão de agendar',
  'salao': 'serviços, endereço e botão de agendar',
  'clinica-odontologica': 'atendimentos, endereço e botão de agendar',
  'estetica': 'procedimentos, endereço e botão de agendar',
  'petshop': 'serviços, endereço e botão de agendar',
  'assistencia-tecnica': 'o que consertam, endereço e botão de orçamento',
  'restaurante': 'cardápio, área de entrega e botão de pedido',
  'personal-academia': 'planos, endereço e botão de aula experimental'
};
const obj = OBJ[p.modelo] || 'serviços, endereço e botão de WhatsApp';
const hostOf = u => { try { return new URL(u).hostname.replace(/^www\./, '').toLowerCase(); } catch (e) { return ''; } };
const hoje = new Date().toISOString().slice(0, 10);
const jaRegistrados = new Set($('Ler planilha').all().map(i => String(i.json.place_id || '').trim()).filter(Boolean));
const vistos = new Set();
const lista = [];

for (const item of $input.all()) {
  for (const l of (item.json.places || [])) {
    if (!l.id || vistos.has(l.id) || jaRegistrados.has(l.id)) continue;
    vistos.add(l.id);
    const nome = l.displayName && l.displayName.text ? l.displayName.text : '';
    if (!nome || REDE.test(nome)) continue;
    if (l.businessStatus && l.businessStatus !== 'OPERATIONAL') continue;
    const n = l.userRatingCount || 0;
    if (n < p.min_avaliacoes || n > p.max_avaliacoes) continue;

    const host = hostOf(l.websiteUri || '');
    let statusSite;
    if (!host) statusSite = 'sem site';
    else if (FRACOS.some(f => host === f || host.endsWith('.' + f))) statusSite = 'link fraco (' + host + ')';
    else continue; // site próprio: fora do perfil

    let instagram = '';
    if (host === 'instagram.com') {
      const seg = new URL(l.websiteUri).pathname.split('/').filter(Boolean)[0];
      if (seg) instagram = '@' + seg;
    }

    let msg = `Oi! Vi a ${nome} no Google. Criei um modelo de página pra bio do Insta, com ${obj}. Quer ver como ficaria?`;
    if (msg.length > 200) msg = `Oi! Criei um modelo de página pra bio do Insta, com ${obj}. Quer ver como ficaria pra vocês?`;
    const msgOk = msg.length >= 100 && msg.length <= 200;
    const dig = String(l.nationalPhoneNumber || '').replace(/\D/g, '');
    const linkWa = /^\d{2}9\d{8}$/.test(dig) ? `https://wa.me/55${dig}?text=${encodeURIComponent(msg)}` : '';

    lista.push({
      data: hoje, nome, instagram, whatsapp: '', cidade: p.cidade, nicho: p.ramo,
      servico_alvo: 'biosite', mensagem_enviada: '', respondeu: '', interesse: '', viu_exemplo: '',
      fechou: '', valor: '', motivo_perda: '', observacoes: msgOk ? '' : 'mensagem fora de 100-200 caracteres',
      telefone_maps: l.nationalPhoneNumber || '',
      mensagem_sugerida: msg,
      link_exemplo: `https://demo.ezf-tech.com/modelo-${p.modelo}/`,
      link_maps: l.googleMapsUri || '',
      avaliacao: l.rating || '',
      qtd_avaliacoes: n,
      status_site: statusSite,
      place_id: l.id,
      link_whatsapp: linkWa
    });
  }
}
lista.sort((a, b) => b.qtd_avaliacoes - a.qtd_avaliacoes);
return lista.slice(0, p.limite).map(j => ({ json: j }));
""".strip()

COLUNAS = ["data","nome","instagram","whatsapp","cidade","nicho","servico_alvo","mensagem_enviada","respondeu","interesse","viu_exemplo","fechou","valor","motivo_perda","observacoes","telefone_maps","mensagem_sugerida","link_exemplo","link_maps","avaliacao","qtd_avaliacoes","status_site","place_id","link_whatsapp"]

RAMOS = [
 ("Barbearia", "barbearia", "barbearia"),
 ("Salão de beleza", "salão de beleza", "salao"),
 ("Clínica odontológica", "clínica odontológica", "clinica-odontologica"),
 ("Estética e sobrancelha", "estética e design de sobrancelha", "estetica"),
 ("Pet shop", "pet shop", "petshop"),
 ("Assistência técnica", "assistência técnica celular", "assistencia-tecnica"),
 ("Restaurante e hamburgueria", "hamburgueria", "restaurante"),
 ("Academia e personal", "academia", "personal-academia"),
 ("Boutique e loja de roupas", "boutique feminina", "boutique")]
RAMOS_FORM = [r[0] for r in RAMOS]
MAPA_JS = "{" + ", ".join("'%s': ['%s', '%s']" % r for r in RAMOS) + "}"

def campo(i, nome, valor, tipo="string"):
    return {"id": f"p{i}", "name": nome, "value": valor, "type": tipo}

wf = {
 "name": "Buscar leads (Google Places)",
 "nodes": [
  {"id": "n1", "name": "Formulário", "type": "n8n-nodes-base.formTrigger", "typeVersion": 2.2, "position": [0, 0],
   "webhookId": "5b0c2f6e-9a41-4d7b-8c3e-7e1f2a6d9b10",
   "parameters": {"authentication": "basicAuth", "formTitle": "Buscar leads",
     "formDescription": "Escolha o ramo e a cidade. Os leads novos entram na planilha.",
     "formFields": {"values": [
       {"fieldLabel": "Cidade", "placeholder": "Ribeirão Preto, SP", "requiredField": True},
       {"fieldLabel": "Ramo", "fieldType": "dropdown", "requiredField": True, "fieldOptions": {"values": [{"option": o} for o in RAMOS_FORM]}},
       {"fieldLabel": "Bairros", "placeholder": "Centro, Jardim Sumaré (opcional, separados por vírgula)"},
       {"fieldLabel": "Mínimo de avaliações", "fieldType": "number", "placeholder": "10"},
       {"fieldLabel": "Máximo de avaliações", "fieldType": "number", "placeholder": "300"},
       {"fieldLabel": "Quantidade de leads", "fieldType": "number", "placeholder": "30"}]},
     "options": {}},
   "credentials": {"httpBasicAuth": {"id": "", "name": "Acesso ao formulário"}}},
  {"id": "n2", "name": "Parâmetros", "type": "n8n-nodes-base.set", "typeVersion": 3.4, "position": [220, 0],
   "parameters": {"assignments": {"assignments": [
     campo(1, "cidade", "={{ $json.Cidade }}"),
     campo(2, "ramo", "={{ (" + MAPA_JS + ")[$json.Ramo][0] }}"),
     campo(3, "modelo", "={{ (" + MAPA_JS + ")[$json.Ramo][1] }}"),
     campo(4, "bairros", "={{ $json.Bairros || '' }}"),
     campo(5, "min_avaliacoes", "={{ Number($json['Mínimo de avaliações']) || 10 }}", "number"),
     campo(6, "max_avaliacoes", "={{ Number($json['Máximo de avaliações']) || 300 }}", "number"),
     campo(7, "limite", "={{ Number($json['Quantidade de leads']) || 30 }}", "number"),
     campo(8, "planilha_id", "COLE_AQUI_O_ID_DA_PLANILHA")]}, "options": {}}},
  {"id": "n7", "name": "Ler planilha", "type": "n8n-nodes-base.googleSheets", "typeVersion": 4.5, "position": [440, 0],
   "alwaysOutputData": True,
   "parameters": {"resource": "sheet", "operation": "read",
     "documentId": {"__rl": True, "mode": "id", "value": "={{ $('Parâmetros').first().json.planilha_id }}"},
     "sheetName": {"__rl": True, "mode": "name", "value": "leads"}, "options": {}},
   "credentials": {"googleSheetsOAuth2Api": {"id": "", "name": "Google Sheets"}}},
  {"id": "n3", "name": "Gerar buscas", "type": "n8n-nodes-base.code", "typeVersion": 2, "position": [660, 0],
   "parameters": {"mode": "runOnceForAllItems", "jsCode": CODE_BUSCAS}},
  {"id": "n4", "name": "Google Places", "type": "n8n-nodes-base.httpRequest", "typeVersion": 4.2, "position": [880, 0],
   "parameters": {"method": "POST", "url": "https://places.googleapis.com/v1/places:searchText",
     "authentication": "genericCredentialType", "genericAuthType": "httpHeaderAuth",
     "sendHeaders": True, "headerParameters": {"parameters": [{"name": "X-Goog-FieldMask",
       "value": "places.id,places.displayName,places.nationalPhoneNumber,places.websiteUri,places.rating,places.userRatingCount,places.googleMapsUri,places.businessStatus"}]},
     "sendBody": True, "specifyBody": "json",
     "jsonBody": "={{ JSON.stringify({ textQuery: $json.query, languageCode: 'pt-BR', regionCode: 'BR', pageSize: 20 }) }}",
     "options": {}},
   "credentials": {"httpHeaderAuth": {"id": "", "name": "Google Places API Key"}}},
  {"id": "n5", "name": "Filtrar e montar mensagem", "type": "n8n-nodes-base.code", "typeVersion": 2, "position": [1100, 0],
   "parameters": {"mode": "runOnceForAllItems", "jsCode": CODE_FILTRO}},
  {"id": "n8", "name": "Registrar na planilha", "type": "n8n-nodes-base.googleSheets", "typeVersion": 4.5, "position": [1320, -120],
   "parameters": {"resource": "sheet", "operation": "append",
     "documentId": {"__rl": True, "mode": "id", "value": "={{ $('Parâmetros').first().json.planilha_id }}"},
     "sheetName": {"__rl": True, "mode": "name", "value": "leads"},
     "columns": {"mappingMode": "defineBelow",
       "value": {c: "={{ $json." + c + " }}" for c in COLUNAS},
       "matchingColumns": [],
       "schema": [{"id": c, "displayName": c, "required": False, "defaultMatch": False, "display": True, "type": "string", "canBeUsedToMatch": True} for c in COLUNAS]},
     "options": {}},
   "credentials": {"googleSheetsOAuth2Api": {"id": "", "name": "Google Sheets"}}},
  {"id": "n6", "name": "Gerar CSV", "type": "n8n-nodes-base.convertToFile", "typeVersion": 1.1, "position": [1320, 120],
   "parameters": {"operation": "csv", "options": {"fileName": "leads.csv"}}},
 ],
 "connections": {
  "Formulário": {"main": [[{"node": "Parâmetros", "type": "main", "index": 0}]]},
  "Parâmetros": {"main": [[{"node": "Ler planilha", "type": "main", "index": 0}]]},
  "Ler planilha": {"main": [[{"node": "Gerar buscas", "type": "main", "index": 0}]]},
  "Gerar buscas": {"main": [[{"node": "Google Places", "type": "main", "index": 0}]]},
  "Google Places": {"main": [[{"node": "Filtrar e montar mensagem", "type": "main", "index": 0}]]},
  "Filtrar e montar mensagem": {"main": [[{"node": "Registrar na planilha", "type": "main", "index": 0}, {"node": "Gerar CSV", "type": "main", "index": 0}]]}},
 "settings": {"executionOrder": "v1"}
}

aqui = os.path.dirname(os.path.abspath(__file__))
with open(os.path.join(aqui, "planilha-modelo.csv"), "w", encoding="utf-8") as f:
    f.write(",".join(COLUNAS) + "\n")
with open(os.path.join(aqui, "buscar-leads.workflow.json"), "w", encoding="utf-8") as f:
    json.dump(wf, f, ensure_ascii=False, indent=2)
print("ok")
