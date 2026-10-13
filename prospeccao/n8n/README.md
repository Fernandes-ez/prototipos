# Fluxo n8n: buscar leads (Google Places)

Gera uma lista de negócios reais de uma cidade e ramo, já filtrada e com a mensagem de DM sugerida. O envio da DM continua manual.

## Como funciona
Iniciar → **Parâmetros** → **Ler planilha** (ids já registrados) → Gerar buscas (cidade + cada bairro) → **Google Places** (Text Search) → **Filtrar e montar mensagem** → **Registrar na planilha** (e, em paralelo, Gerar CSV).

Filtro aplicado:
- Só negócios em operação, com 10 a 300 avaliações (ajustável), sem "franquia", "rede", "unidade", "filial" ou "shopping" no nome.
- Campo `website` vazio ou só Instagram, Linktree, `wa.me`, Facebook, Beacons e similares → **aprovado**. Site próprio → descartado.
- Pula os negócios cujo `place_id` já está na planilha (assim cada execução traz só leads novos).
- Sem duplicados, ordenado por nº de avaliações, limitado a `limite` leads.
- Mensagem de 100 a 200 caracteres. Se sair fora, a coluna `observacoes` avisa.

## Configuração (uma vez)
1. **Google Cloud**: crie um projeto, ative a **Places API (New)** e crie uma chave de API. Restrinja a chave à Places API. Ative a cobrança (há crédito gratuito mensal; confira os preços atuais e use o limite de orçamento/alertas).
2. **n8n**: Credentials → New → **Header Auth**. Nome da credencial: `Google Places API Key`. Header Name: `X-Goog-Api-Key`. Header Value: a chave. Nunca coloque a chave em chat, repositório ou no próprio fluxo.
3. **Planilha**: crie uma planilha no Google Sheets com uma aba chamada `leads`. Importe `planilha-modelo.csv` (Arquivo → Importar → Substituir planilha) para criar a linha de cabeçalho. Copie o **ID da planilha** (o trecho entre `/d/` e `/edit` na URL).
4. **Credencial do Google Sheets**: no n8n, Credentials → New → **Google Sheets OAuth2 API** e siga o assistente para autorizar sua conta.
5. **Importar**: Workflows → Import from File → `buscar-leads.workflow.json`. Abra os nós **Google Places** (credencial Header Auth) e **Ler planilha** e **Registrar na planilha** (credencial Google Sheets) e selecione as credenciais.

## Uso
1. Edite o nó **Parâmetros**: `planilha_id` (o ID copiado), `cidade`, `ramo` (termo de busca), `modelo` (barbearia, salao, boutique, clinica-odontologica, estetica, petshop, assistencia-tecnica, restaurante, personal-academia), `bairros` (separados por vírgula), faixa de avaliações e `limite`.
2. **Execute workflow**. Os leads novos entram na aba `leads`. O nó **Gerar CSV** continua disponível para baixar o arquivo, se quiser.
3. A planilha do Google substitui o `leads.csv` do repositório para o controle diário. As 15 primeiras colunas seguem a mesma ordem.
4. Para cada lead: abra o `link_maps` ou o Instagram, **confira a bio**, envie a DM com `mensagem_sugerida` e, quando responder, mande o `link_exemplo`.

## Limites
- A aba precisa se chamar `leads` e ter o cabeçalho de `planilha-modelo.csv`, com a coluna `place_id`. Sem o cabeçalho, a leitura falha.
- Não apague a coluna `place_id`: é com ela que o fluxo evita repetir negócios.
- Cada busca devolve até 20 resultados. Para mais leads, acrescente bairros.
- O telefone do Maps (`telefone_maps`) pode não ser WhatsApp. A coluna `link_whatsapp` só é preenchida para celulares (DDD + 9 dígitos começando com 9) e abre a conversa com a mensagem pronta. Fixos ficam em branco. Confirme que o número é WhatsApp antes de insistir.
- O Instagram só aparece quando o negócio o cadastrou como site no Google.
- Para rodar todo dia: troque o nó **Iniciar** por um **Schedule Trigger**.
- Se mudar o fluxo, edite `gerar-workflow.py` e rode `python3 prospeccao/n8n/gerar-workflow.py`.
