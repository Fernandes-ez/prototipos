# Fluxo n8n: buscar leads (Google Places)

Gera uma lista de negócios reais de uma cidade e ramo, já filtrada e com a mensagem de DM sugerida. O envio da DM continua manual.

## Como funciona
Iniciar → **Parâmetros** → Gerar buscas (cidade + cada bairro) → **Google Places** (Text Search) → **Filtrar e montar mensagem** → Gerar CSV.

Filtro aplicado:
- Só negócios em operação, com 10 a 300 avaliações (ajustável), sem "franquia", "rede", "unidade", "filial" ou "shopping" no nome.
- Campo `website` vazio ou só Instagram, Linktree, `wa.me`, Facebook, Beacons e similares → **aprovado**. Site próprio → descartado.
- Sem duplicados, ordenado por nº de avaliações, limitado a `limite` leads.
- Mensagem de 100 a 200 caracteres. Se sair fora, a coluna `observacoes` avisa.

## Configuração (uma vez)
1. **Google Cloud**: crie um projeto, ative a **Places API (New)** e crie uma chave de API. Restrinja a chave à Places API. Ative a cobrança (há crédito gratuito mensal; confira os preços atuais e use o limite de orçamento/alertas).
2. **n8n**: Credentials → New → **Header Auth**. Nome da credencial: `Google Places API Key`. Header Name: `X-Goog-Api-Key`. Header Value: a chave. Nunca coloque a chave em chat, repositório ou no próprio fluxo.
3. **Importar**: Workflows → Import from File → `buscar-leads.workflow.json`. Abra o nó **Google Places** e selecione a credencial.

## Uso
1. Edite o nó **Parâmetros**: `cidade`, `ramo` (termo de busca), `modelo` (barbearia, salao, boutique, clinica-odontologica, estetica, petshop, assistencia-tecnica, restaurante, personal-academia), `bairros` (separados por vírgula), faixa de avaliações e `limite`.
2. **Execute workflow**. No último nó, baixe o `leads.csv`.
3. Cole as linhas no `leads.csv` do repositório (as 15 primeiras colunas seguem a mesma ordem).
4. Para cada lead: abra o `link_maps` ou o Instagram, **confira a bio**, envie a DM com `mensagem_sugerida` e, quando responder, mande o `link_exemplo`.

## Limites
- Cada busca devolve até 20 resultados. Para mais leads, acrescente bairros.
- O telefone do Maps (`telefone_maps`) pode não ser WhatsApp. Confirme antes de usar.
- O Instagram só aparece quando o negócio o cadastrou como site no Google.
- Para rodar todo dia: troque o nó **Iniciar** por um **Schedule Trigger**.
- Se mudar o fluxo, edite `gerar-workflow.py` e rode `python3 prospeccao/n8n/gerar-workflow.py`.
