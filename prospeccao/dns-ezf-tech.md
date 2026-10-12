# DNS e hospedagem · ezf-tech.com (GoDaddy)

## 1. Protótipos: demo.ezf-tech.com
1. GoDaddy → Domínios → ezf-tech.com → DNS → Adicionar registro.
2. Tipo `CNAME` · Nome `demo` · Valor `fernandes-ez.github.io` · TTL padrão.
3. GitHub → repositório `prototipos` → Settings → Pages → Custom domain: `demo.ezf-tech.com` → Save (o arquivo `CNAME` na raiz já tem o valor).
4. Aguarde a verificação do DNS e marque **Enforce HTTPS**.
5. Teste: `https://demo.ezf-tech.com/carol-ianes/`.

## 2. Entregas pagas: link.ezf-tech.com/<slug>
1. Crie o repositório `clientes` (uma pasta por cliente, `index.html` dentro).
2. Cloudflare Pages → Create project → conectar ao repositório → sem build, pasta raiz.
3. Custom domain: `link.ezf-tech.com`. A Cloudflare mostra o CNAME a criar na GoDaddy (`link` → `<projeto>.pages.dev`).
4. Teste: `https://link.ezf-tech.com/<slug>/`.

## Opcional
Se quiser gerenciar tudo num painel, troque os nameservers do domínio na GoDaddy para os da Cloudflare (o registro continua na GoDaddy) e recrie lá os CNAMEs acima.

## Regras
- Protótipo: `noindex`. Entrega paga: sem `noindex`.
- Anote o domínio e o slug de cada cliente no `leads.csv` (observações).
