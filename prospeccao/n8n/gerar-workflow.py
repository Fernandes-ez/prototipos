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
const vistos = new Set();
const lista = [];

for (const item of $input.all()) {
  for (const l of (item.json.places || [])) {
    if (!l.id || vistos.has(l.id)) continue;
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
      status_site: statusSite
    });
  }
}
lista.sort((a, b) => b.qtd_avaliacoes - a.qtd_avaliacoes);
return lista.slice(0, p.limite).map(j => ({ json: j }));
""".strip()

def campo(i, nome, valor, tipo="string"):
    return {"id": f"p{i}", "name": nome, "value": valor, "type": tipo}

wf = {
 "name": "Buscar leads (Google Places)",
 "nodes": [
  {"id": "n1", "name": "Iniciar", "type": "n8n-nodes-base.manualTrigger", "typeVersion": 1, "position": [0, 0], "parameters": {}},
  {"id": "n2", "name": "Parâmetros", "type": "n8n-nodes-base.set", "typeVersion": 3.4, "position": [220, 0],
   "parameters": {"assignments": {"assignments": [
     campo(1, "cidade", "Ribeirão Preto, SP"),
     campo(2, "ramo", "barbearia"),
     campo(3, "modelo", "barbearia"),
     campo(4, "bairros", "Centro, Jardim Sumaré, Campos Elíseos, Vila Seixas"),
     campo(5, "min_avaliacoes", 10, "number"),
     campo(6, "max_avaliacoes", 300, "number"),
     campo(7, "limite", 30, "number")]}, "options": {}}},
  {"id": "n3", "name": "Gerar buscas", "type": "n8n-nodes-base.code", "typeVersion": 2, "position": [440, 0],
   "parameters": {"mode": "runOnceForAllItems", "jsCode": CODE_BUSCAS}},
  {"id": "n4", "name": "Google Places", "type": "n8n-nodes-base.httpRequest", "typeVersion": 4.2, "position": [660, 0],
   "parameters": {"method": "POST", "url": "https://places.googleapis.com/v1/places:searchText",
     "authentication": "genericCredentialType", "genericAuthType": "httpHeaderAuth",
     "sendHeaders": True, "headerParameters": {"parameters": [{"name": "X-Goog-FieldMask",
       "value": "places.id,places.displayName,places.nationalPhoneNumber,places.websiteUri,places.rating,places.userRatingCount,places.googleMapsUri,places.businessStatus"}]},
     "sendBody": True, "specifyBody": "json",
     "jsonBody": "={{ JSON.stringify({ textQuery: $json.query, languageCode: 'pt-BR', regionCode: 'BR', pageSize: 20 }) }}",
     "options": {}},
   "credentials": {"httpHeaderAuth": {"id": "", "name": "Google Places API Key"}}},
  {"id": "n5", "name": "Filtrar e montar mensagem", "type": "n8n-nodes-base.code", "typeVersion": 2, "position": [880, 0],
   "parameters": {"mode": "runOnceForAllItems", "jsCode": CODE_FILTRO}},
  {"id": "n6", "name": "Gerar CSV", "type": "n8n-nodes-base.convertToFile", "typeVersion": 1.1, "position": [1100, 0],
   "parameters": {"operation": "csv", "options": {"fileName": "leads.csv"}}},
 ],
 "connections": {
  "Iniciar": {"main": [[{"node": "Parâmetros", "type": "main", "index": 0}]]},
  "Parâmetros": {"main": [[{"node": "Gerar buscas", "type": "main", "index": 0}]]},
  "Gerar buscas": {"main": [[{"node": "Google Places", "type": "main", "index": 0}]]},
  "Google Places": {"main": [[{"node": "Filtrar e montar mensagem", "type": "main", "index": 0}]]},
  "Filtrar e montar mensagem": {"main": [[{"node": "Gerar CSV", "type": "main", "index": 0}]]}},
 "settings": {"executionOrder": "v1"}
}

aqui = os.path.dirname(os.path.abspath(__file__))
with open(os.path.join(aqui, "buscar-leads.workflow.json"), "w", encoding="utf-8") as f:
    json.dump(wf, f, ensure_ascii=False, indent=2)
print("ok")
