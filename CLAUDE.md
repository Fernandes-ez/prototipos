# ezf.tech · Kit Presença Digital & IA

Repositório de protótipos e biosites para pequenos negócios locais (boutiques, barbearias, salões, clínicas).

## Pedido padrão
"Biosite para [negócio], [nicho], [cidade]. Dados: [@, WhatsApp, endereço, horário, itens do catálogo]."

## Regras de geração (biosite)
1. Copie `_modelo-biosite/index.html` para `<slug-do-negocio>/index.html`. Não crie outro layout do zero.
2. HTML único, Tailwind via CDN, mobile-first, largura máx. 440px centralizada.
3. Substitua todos os `{{PLACEHOLDERS}}`. **Nunca invente** telefone, endereço, horário, preço ou foto. Dado ausente: remova o bloco, não preencha.
4. Cada item do catálogo é um botão `wa.me/55DDDNUMERO?text=` com mensagem pré-formatada e URL-encoded ("Oi! Vi o [item] no seu link e quero saber tamanho e preço.").
5. Blocos: cabeçalho (nome, tagline, cidade) → botão principal de WhatsApp → catálogo → localização (link do Google Maps) → horário → Instagram.
6. Cores: 1 cor de destaque tirada do perfil do cliente. Contraste mínimo AA.
7. Acessibilidade: `lang="pt-BR"`, `alt` nas imagens, foco visível, alvos de toque ≥ 44px.
8. Sem travessão em textos. Texto direto, sem jargão.
9. Publicação: protótipos em `demo.ezf-tech.com/<slug>/` (GitHub Pages, com `noindex`). Entrega paga em `link.ezf-tech.com/<slug>` (Cloudflare Pages), sem `noindex`.

## Prospecção
Tudo em `prospeccao/`: playbook, prompt mestre, scripts de DM e planilha `leads.csv`.
Regra de ouro: nunca inventar dados de contato. Dado não encontrado = campo vazio.
