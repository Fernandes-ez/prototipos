#!/usr/bin/env python3
"""Gera prospeccao/n8n/buscar-leads.workflow.json (importar no n8n).
Uso: python3 prospeccao/n8n/gerar-workflow.py"""
import json, os

CODE_BUSCAS = r"""
const p = $('Parâmetros').first().json;
const SIN = {
  'barbearia': ['barbearia', 'barbershop', 'barbeiro'],
  'salao': ['salão de beleza', 'cabeleireira', 'studio de beleza'],
  'estetica': ['estética', 'design de sobrancelha', 'depilação', 'lash designer'],
  'clinica-odontologica': ['clínica odontológica', 'dentista', 'ortodontia'],
  'petshop': ['pet shop', 'banho e tosa', 'petshop'],
  'assistencia-tecnica': ['assistência técnica celular', 'conserto de celular', 'assistência técnica notebook'],
  'restaurante': ['hamburgueria', 'lanchonete', 'delivery'],
  'personal-academia': ['academia', 'personal trainer', 'studio de treino'],
  'boutique': ['boutique feminina', 'loja de roupas femininas', 'moda feminina']
};
const termos = (p.ampla && SIN[p.modelo]) ? SIN[p.modelo] : [p.ramo];
const bairros = String(p.bairros || '').split(',').map(s => s.trim()).filter(Boolean);
const locais = [p.cidade, ...bairros.map(b => `${b} ${p.cidade}`)];
const queries = [];
for (const t of termos) for (const l of locais) queries.push(`${t} em ${l}`);
return queries.map(q => ({ json: { query: q } }));
""".strip()

CODE_FILTRO = r"""
const p = $('Parâmetros').first().json;
const FRACOS = ['instagram.com','linktr.ee','linktree.com','wa.me','api.whatsapp.com','whatsapp.com','facebook.com','fb.com','beacons.ai','bio.link','lnk.bio','taplink.cc','campsite.bio'];
const REDE = /franquia|franchis|\brede\b|\bunidade\b|\bfilial\b|shopping/i;
const PERFIS = {
  'barbearia':            { sauda: ['Fala!', 'E aí!', 'Opa, tudo bem?'], acao: 'marcar horário', pl: 'barbearias', um: 'barbearia' },
  'personal-academia':    { sauda: ['Fala!', 'E aí!', 'Opa, tudo bem?'], acao: 'marcar aula', pl: 'academias e studios', um: 'academia' },
  'assistencia-tecnica':  { sauda: ['Fala!', 'E aí!', 'Opa, tudo bem?'], acao: 'pedir orçamento', pl: 'assistências técnicas', um: 'assistência técnica' },
  'salao':                { sauda: ['Oi, tudo bem?', 'Oii!', 'Olá, tudo bem?'], acao: 'marcar horário', pl: 'salões', um: 'salão' },
  'estetica':             { sauda: ['Oi, tudo bem?', 'Oii!', 'Olá, tudo bem?'], acao: 'marcar horário', pl: 'espaços de estética', um: 'estética' },
  'boutique':             { sauda: ['Oi, tudo bem?', 'Oii!', 'Olá, tudo bem?'], acao: 'ver as peças e pedir', pl: 'lojas de roupa', um: 'loja de roupa' },
  'clinica-odontologica': { sauda: ['Olá, tudo bem?', 'Oi, tudo bem?', 'Bom dia!'], acao: 'agendar consulta', pl: 'clínicas', um: 'clínica' },
  'petshop':              { sauda: ['Oi, tudo bem?', 'Olá, tudo bem?', 'Oii!'], acao: 'marcar banho e tosa', pl: 'pet shops', um: 'pet shop' },
  'restaurante':          { sauda: ['Oi, tudo bem?', 'Olá, tudo bem?', 'Boa tarde!'], acao: 'fazer pedido', pl: 'hamburguerias e delivery', um: 'hamburgueria' }
};
const perfil = PERFIS[p.modelo] || PERFIS['salao'];
const MAIUSC = /^[^a-zà-ú]*$/;
const curto = n => {
  let t = n.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{FE0F}]/gu, '').split(/\s[-–|•·]\s|\(|,/)[0].replace(/\s+/g, ' ').trim();
  if (MAIUSC.test(t)) {
    const liga = ['e', 'de', 'da', 'do', 'dos', 'das', 'a', 'o'];
    t = t.split(' ').map((w, i) => {
      const m = w.toLowerCase();
      if (i > 0 && liga.includes(m)) return m;
      if (w.length <= 3) return w;
      return m.charAt(0).toUpperCase() + m.slice(1);
    }).join(' ');
  }
  return t;
};
const soma = str => Array.from(String(str)).reduce((a, c) => a + c.charCodeAt(0), 0);
const montarMsg = (nomeCurto, id, rating, avaliacoes, link) => {
  const h = soma(id);
  const sauda = perfil.sauda[h % perfil.sauda.length];
  const v = Math.floor(h / 3) % 3;
  const elogio = (rating >= 4.5 && avaliacoes >= 20) ? `, nota ${String(rating).replace('.', ',')} com ${avaliacoes} avaliações` : '';
  const variantes = [
    [`${sauda} Vi a ${nomeCurto} aqui no Google${elogio}. Parabéns pelo trabalho.`,
     `Eu faço páginas pra bio do Insta de ${perfil.pl}, onde o cliente já cai pra ${perfil.acao} direto no WhatsApp.`,
     `Montei um exemplo de ${perfil.um}, dá uma olhada: ${link}`,
     `Me conta o que achou?`],
    [`${sauda} Vi a ${nomeCurto} aqui no Google.`,
     `Hoje o pessoal costuma ${perfil.acao} por onde, direct ou WhatsApp?`,
     `Pergunto porque tenho um exemplo de página de ${perfil.um} que resolve isso: ${link}`,
     `Se curtir, eu adapto pra vocês.`],
    [`${sauda} Achei a ${nomeCurto} aqui no Google.`,
     `A bio do Insta é o primeiro lugar que o cliente vê, e dá pra ela já levar direto pra ${perfil.acao}.`,
     `Fiz um exemplo de ${perfil.um}, sem compromisso: ${link}`,
     `O que achou?`]
  ];
  const trechos = variantes[v];
  return { trechos, texto: trechos.join('\n'), semLink: trechos.join(' ').replace(link, '').trim(), variante: 'V' + (v + 1) };
};
const hostOf = u => {
  const t = String(u || '').trim();
  if (!t) return '';
  try { return new URL(/^[a-z][a-z0-9+.-]*:\/\//i.test(t) ? t : 'http://' + t).hostname.replace(/^www\./, '').toLowerCase() || 'desconhecido'; }
  catch (e) { return 'desconhecido'; }
};
const hoje = new Date().toISOString().slice(0, 10);
const jaRegistrados = new Set($('Ler planilha').all().map(i => String(i.json.place_id || '').trim()).filter(Boolean));
const vistos = new Set();
const lista = [];
const c = { buscas: $input.all().length, encontrados: 0, repetidos_na_busca: 0, ja_na_planilha: 0, rede_ou_sem_nome: 0, fechados: 0, fora_da_faixa_de_avaliacoes: 0, com_site_proprio: 0, google_sem_campo_site: 0 };

for (const item of $input.all()) {
  for (const l of (item.json.places || [])) {
    c.encontrados++;
    if (!l.id) continue;
    if (vistos.has(l.id)) { c.repetidos_na_busca++; continue; }
    vistos.add(l.id);
    if (jaRegistrados.has(l.id)) { c.ja_na_planilha++; continue; }
    const nome = l.displayName && l.displayName.text ? l.displayName.text : '';
    if (!nome || REDE.test(nome)) { c.rede_ou_sem_nome++; continue; }
    if (l.businessStatus && l.businessStatus !== 'OPERATIONAL') { c.fechados++; continue; }
    const n = l.userRatingCount || 0;
    if (n < p.min_avaliacoes || n > p.max_avaliacoes) { c.fora_da_faixa_de_avaliacoes++; continue; }

    const host = hostOf(l.websiteUri || '');
    if (!l.websiteUri) c.google_sem_campo_site++;
    let statusSite;
    if (!host) statusSite = 'sem site';
    else if (FRACOS.some(f => host === f || host.endsWith('.' + f))) statusSite = 'link fraco (' + host + ')';
    else { c.com_site_proprio++; continue; } // site próprio: fora do perfil

    let instagram = '';
    if (host === 'instagram.com') {
      try {
        const u = /^https?:\/\//i.test(l.websiteUri) ? l.websiteUri : 'http://' + l.websiteUri;
        const seg = new URL(u).pathname.split('/').filter(Boolean)[0];
        if (seg) instagram = '@' + seg;
      } catch (e) {}
    }

    const nomeCurto = curto(nome);
    const linkExemplo = `https://demo.ezf-tech.com/modelo-${p.modelo}/`;
    const gerado = montarMsg(nomeCurto, l.id, l.rating, l.userRatingCount, linkExemplo);
    let msg = gerado.texto;
    const msgOk = gerado.semLink.length >= 100 && gerado.semLink.length <= 300;
    const dig = String(l.nationalPhoneNumber || '').replace(/\D/g, '');
    const linkWa = /^\d{2}9\d{8}$/.test(dig) ? `https://wa.me/55${dig}?text=${encodeURIComponent(msg)}` : '';

    lista.push({
      data: hoje, nome, instagram, whatsapp: '', cidade: p.cidade, nicho: p.ramo,
      servico_alvo: 'biosite', mensagem_enviada: '', respondeu: '', interesse: '', viu_exemplo: '',
      fechou: '', valor: '', motivo_perda: '', observacoes: ('variante ' + gerado.variante + (msgOk ? '' : ' | mensagem fora do tamanho')),
      telefone_maps: l.nationalPhoneNumber || '',
      mensagem_sugerida: msg,
      link_exemplo: linkExemplo,
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
const entregues = lista.slice(0, p.limite);
const resumo = { nome: '__RESUMO__', pedidos: p.limite, ...c, aprovados: lista.length, entregues: entregues.length,
  dica: entregues.length < p.limite ? 'Poucos leads novos. Aumente a busca: mais bairros, busca ampla (Sim) ou outra cidade. Veja quantos já estavam na planilha e quantos foram descartados.' : 'Meta atingida.' };
return [...entregues.map(j => ({ json: j })), { json: resumo }];
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
     "formDescription": "Escolha o ramo e a cidade. Cada busca gasta 1 requisição do Google (cidade + cada bairro, e mais por sinônimo se a busca ampla for Sim). Os leads novos entram na planilha.",
     "formFields": {"values": [
       {"fieldLabel": "Cidade", "placeholder": "Ribeirão Preto, SP", "requiredField": True},
       {"fieldLabel": "Ramo", "fieldType": "dropdown", "requiredField": True, "fieldOptions": {"values": [{"option": o} for o in RAMOS_FORM]}},
       {"fieldLabel": "Bairros", "placeholder": "Centro, Jardim Sumaré (opcional, separados por vírgula)"},
       {"fieldLabel": "Mínimo de avaliações", "fieldType": "number", "placeholder": "10"},
       {"fieldLabel": "Máximo de avaliações", "fieldType": "number", "placeholder": "300"},
       {"fieldLabel": "Quantidade de leads", "fieldType": "number", "placeholder": "30"},
       {"fieldLabel": "Busca ampla", "fieldType": "dropdown", "fieldOptions": {"values": [{"option": "Não"}, {"option": "Sim"}]}}]},
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
     campo(8, "planilha_id", "COLE_AQUI_O_ID_DA_PLANILHA"),
     campo(9, "ampla", "={{ $json['Busca ampla'] === 'Sim' }}", "boolean")]}, "options": {}}},
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
  {"id": "n9", "name": "É lead?", "type": "n8n-nodes-base.if", "typeVersion": 2.2, "position": [1320, 0],
   "parameters": {"conditions": {"options": {"caseSensitive": True, "leftValue": "", "typeValidation": "strict", "version": 2},
     "conditions": [{"id": "c1", "leftValue": "={{ $json.nome }}", "rightValue": "__RESUMO__",
       "operator": {"type": "string", "operation": "notEquals"}}], "combinator": "and"}, "options": {}}},
  {"id": "n10", "name": "Resumo do funil", "type": "n8n-nodes-base.noOp", "typeVersion": 1, "position": [1540, 260], "parameters": {}},
  {"id": "n8", "name": "Registrar na planilha", "type": "n8n-nodes-base.googleSheets", "typeVersion": 4.5, "position": [1540, -120],
   "parameters": {"resource": "sheet", "operation": "append",
     "documentId": {"__rl": True, "mode": "id", "value": "={{ $('Parâmetros').first().json.planilha_id }}"},
     "sheetName": {"__rl": True, "mode": "name", "value": "leads"},
     "columns": {"mappingMode": "defineBelow",
       "value": {c: "={{ $json." + c + " }}" for c in COLUNAS},
       "matchingColumns": [],
       "schema": [{"id": c, "displayName": c, "required": False, "defaultMatch": False, "display": True, "type": "string", "canBeUsedToMatch": True} for c in COLUNAS]},
     "options": {}},
   "credentials": {"googleSheetsOAuth2Api": {"id": "", "name": "Google Sheets"}}},
  {"id": "n6", "name": "Gerar CSV", "type": "n8n-nodes-base.convertToFile", "typeVersion": 1.1, "position": [1540, 60],
   "parameters": {"operation": "csv", "options": {"fileName": "leads.csv"}}},
 ],
 "connections": {
  "Formulário": {"main": [[{"node": "Parâmetros", "type": "main", "index": 0}]]},
  "Parâmetros": {"main": [[{"node": "Ler planilha", "type": "main", "index": 0}]]},
  "Ler planilha": {"main": [[{"node": "Gerar buscas", "type": "main", "index": 0}]]},
  "Gerar buscas": {"main": [[{"node": "Google Places", "type": "main", "index": 0}]]},
  "Google Places": {"main": [[{"node": "Filtrar e montar mensagem", "type": "main", "index": 0}]]},
  "Filtrar e montar mensagem": {"main": [[{"node": "É lead?", "type": "main", "index": 0}]]},
  "É lead?": {"main": [[{"node": "Registrar na planilha", "type": "main", "index": 0}, {"node": "Gerar CSV", "type": "main", "index": 0}], [{"node": "Resumo do funil", "type": "main", "index": 0}]]}},
 "settings": {"executionOrder": "v1"}
}

aqui = os.path.dirname(os.path.abspath(__file__))
with open(os.path.join(aqui, "planilha-modelo.csv"), "w", encoding="utf-8") as f:
    f.write(",".join(COLUNAS) + "\n")
with open(os.path.join(aqui, "buscar-leads.workflow.json"), "w", encoding="utf-8") as f:
    json.dump(wf, f, ensure_ascii=False, indent=2)
print("ok")
