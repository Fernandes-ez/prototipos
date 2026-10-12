#!/usr/bin/env python3
"""Gera os biosites de demonstração por ramo (modelo-<slug>/index.html) e o índice raiz.
Uso: python3 _modelo-biosite/gerar-modelos.py
Regras: sem telefone, sem preço, itens genéricos. Botões só mostram a mensagem de exemplo."""
import html, os

RAMOS = [
 dict(slug="barbearia", nome="Barbearia Modelo", sig="BM", cor="#1F2937", tag="Corte e barba com hora marcada. Escolha o serviço e agende.",
      sec="Serviços", cta="Agendar", main="Agendar horário", mainmsg="Oi! Vi o seu link e quero agendar um horário.",
      msg="Oi! Vi o seu link e quero agendar {i}.",
      itens=[("Corte","Máquina ou tesoura"),("Barba","Toalha quente e acabamento"),("Corte e barba","Combo"),("Sobrancelha","Acabamento")],
      loc="Seu endereço aparece aqui, com botão para o Google Maps.", hor="Seu horário de funcionamento aparece aqui."),
 dict(slug="salao", nome="Salão Modelo", sig="SM", cor="#A23B72", tag="Cabelo, unhas e beleza. Escolha o serviço e agende.",
      sec="Serviços", cta="Agendar", main="Agendar horário", mainmsg="Oi! Vi o seu link e quero agendar um horário.",
      msg="Oi! Vi o seu link e quero agendar {i}.",
      itens=[("Corte feminino","Com lavagem"),("Escova","Modelagem"),("Coloração","Avaliação antes"),("Hidratação","Tratamento"),("Manicure e pedicure","Unhas")],
      loc="Seu endereço aparece aqui, com botão para o Google Maps.", hor="Seu horário de funcionamento aparece aqui."),
 dict(slug="clinica-odontologica", nome="Clínica Odontológica Modelo", sig="CO", cor="#0F766E", tag="Cuidado com o seu sorriso. Peça sua avaliação.",
      sec="Atendimentos", cta="Agendar", main="Agendar avaliação", mainmsg="Oi! Vi o seu link e quero agendar uma avaliação.",
      msg="Oi! Vi o seu link e quero agendar {i}.",
      itens=[("Avaliação","Primeira consulta"),("Limpeza","Profilaxia"),("Clareamento","Avaliação antes"),("Ortodontia","Aparelhos e alinhadores"),("Urgência","Dor ou imprevisto")],
      loc="Seu endereço e o nome do responsável técnico aparecem aqui.", hor="Seu horário de atendimento aparece aqui."),
 dict(slug="estetica", nome="Estética Modelo", sig="EM", cor="#86336B", tag="Cuidados com a pele e o corpo. Escolha e agende.",
      sec="Procedimentos", cta="Agendar", main="Agendar horário", mainmsg="Oi! Vi o seu link e quero agendar um horário.",
      msg="Oi! Vi o seu link e quero agendar {i}.",
      itens=[("Limpeza de pele","Avaliação inclusa"),("Depilação","Escolha a área"),("Massagem","Relaxante ou modeladora"),("Design de sobrancelha","Acabamento")],
      loc="Seu endereço aparece aqui, com botão para o Google Maps.", hor="Seu horário de atendimento aparece aqui."),
 dict(slug="petshop", nome="Pet Shop Modelo", sig="PM", cor="#B45309", tag="Banho, tosa e tudo para o seu pet.",
      sec="Serviços", cta="Agendar", main="Agendar banho ou tosa", mainmsg="Oi! Vi o seu link e quero agendar um horário para o meu pet.",
      msg="Oi! Vi o seu link e quero saber sobre {i} para o meu pet.",
      itens=[("Banho","Por porte"),("Tosa","Higiênica ou completa"),("Leva e traz","Consulte a região"),("Ração e acessórios","Produtos")],
      loc="Seu endereço aparece aqui, com botão para o Google Maps.", hor="Seu horário de funcionamento aparece aqui."),
 dict(slug="assistencia-tecnica", nome="Assistência Técnica Modelo", sig="AT", cor="#1D4ED8", tag="Conserto de celular, notebook e eletrônicos. Peça seu orçamento.",
      sec="O que consertamos", cta="Orçamento", main="Pedir orçamento", mainmsg="Oi! Vi o seu link e quero um orçamento.",
      msg="Oi! Vi o seu link e quero um orçamento para {i}.",
      itens=[("Celular","Tela, bateria e mais"),("Notebook","Formatação e conserto"),("Troca de tela","Consulte o modelo"),("Outros eletrônicos","Envie o modelo")],
      loc="Seu endereço aparece aqui, com botão para o Google Maps.", hor="Seu horário de atendimento aparece aqui."),
 dict(slug="restaurante", nome="Hamburgueria Modelo", sig="HM", cor="#B91C1C", tag="Cardápio rápido e pedido direto pelo WhatsApp.",
      sec="Cardápio", cta="Pedir", main="Fazer pedido", mainmsg="Oi! Vi o seu link e quero fazer um pedido.",
      msg="Oi! Vi o seu link e quero pedir {i}.",
      itens=[("Hambúrguer clássico","Pão, carne e queijo"),("Combo","Lanche, batata e bebida"),("Porção","Para dividir"),("Bebidas","Refrigerantes e sucos")],
      loc="Sua área de entrega e seu endereço aparecem aqui.", hor="Seu horário de funcionamento aparece aqui."),
 dict(slug="personal-academia", nome="Studio Fit Modelo", sig="SF", cor="#166534", tag="Treino com acompanhamento. Marque sua aula experimental.",
      sec="Como começar", cta="Saber mais", main="Marcar aula experimental", mainmsg="Oi! Vi o seu link e quero marcar uma aula experimental.",
      msg="Oi! Vi o seu link e quero saber mais sobre {i}.",
      itens=[("Aula experimental","Conheça o espaço"),("Avaliação física","Ponto de partida"),("Treino personalizado","Acompanhamento"),("Planos","Horários e modalidades")],
      loc="Seu endereço aparece aqui, com botão para o Google Maps.", hor="Seu horário de funcionamento aparece aqui."),
]

def esc(s): return html.escape(s, quote=True)

def item_html(r, nome, det):
    m = r["msg"].format(i=nome.lower())
    return f'''      <li><a href="#" data-msg="{esc(m)}"
             class="demo-link flex min-h-[56px] items-center justify-between rounded-xl border border-neutral-200 bg-white px-4 py-3">
        <span><span class="block font-medium">{esc(nome)}</span><span class="block text-xs text-neutral-500">{esc(det)}</span></span>
        <span class="text-sm font-medium" style="color:var(--c)">{esc(r["cta"])}</span></a></li>'''

def page(r):
    itens = "\n".join(item_html(r, n, d) for n, d in r["itens"])
    return f'''<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{esc(r["nome"])} · Exemplo de biosite</title>
<meta name="description" content="Exemplo de biosite: {esc(r["tag"])}">
<meta name="theme-color" content="{r["cor"]}">
<meta name="robots" content="noindex">
<script src="https://cdn.tailwindcss.com"></script>
<style>:root{{--c:{r["cor"]}}} a:focus-visible,button:focus-visible{{outline:3px solid var(--c);outline-offset:2px}}</style>
</head>
<body class="bg-neutral-50 text-neutral-900 antialiased">
<main class="mx-auto max-w-[440px] px-4 py-6">

  <p class="rounded-lg bg-amber-50 px-3 py-2 text-center text-xs text-amber-900">
    Modelo de demonstração. Os itens e dados abaixo são exemplos. No seu biosite entram seus serviços, seu endereço e o WhatsApp do seu negócio.
  </p>

  <header class="mt-6 text-center">
    <div class="mx-auto flex h-24 w-24 items-center justify-center rounded-full text-3xl font-semibold text-white" style="background:var(--c)" aria-hidden="true">{esc(r["sig"])}</div>
    <h1 class="mt-4 text-2xl font-semibold">{esc(r["nome"])}</h1>
    <p class="mt-1 text-sm text-neutral-600">{esc(r["tag"])}</p>
    <p class="mt-1 text-xs text-neutral-500">Sua cidade</p>
  </header>

  <a href="#" data-msg="{esc(r["mainmsg"])}"
     class="demo-link mt-6 flex min-h-[52px] items-center justify-center rounded-xl px-4 font-medium text-white shadow"
     style="background:var(--c)">{esc(r["main"])}</a>

  <section class="mt-8" aria-labelledby="cat">
    <h2 id="cat" class="text-sm font-semibold uppercase tracking-wide text-neutral-500">{esc(r["sec"])}</h2>
    <ul class="mt-3 space-y-3">
{itens}
    </ul>
  </section>

  <section class="mt-8 rounded-xl border border-neutral-200 bg-white p-4 text-sm" aria-labelledby="loc">
    <h2 id="loc" class="font-semibold">Onde estamos</h2>
    <p class="mt-1 text-neutral-600">{esc(r["loc"])}</p>
    <p class="mt-1 text-neutral-600">{esc(r["hor"])}</p>
  </section>

  <p class="mt-8 text-center text-xs text-neutral-500">Biosite de exemplo · <a class="inline-flex min-h-[44px] items-center underline" href="https://ezf-tech.com">ezf.tech</a></p>
</main>

<div id="toast" role="status" aria-live="polite"
     class="pointer-events-none fixed inset-x-4 bottom-4 mx-auto hidden max-w-[408px] rounded-xl bg-neutral-900 px-4 py-3 text-sm text-white shadow-lg"></div>

<script>
  var toast = document.getElementById('toast'), timer;
  document.querySelectorAll('.demo-link').forEach(function (a) {{
    a.addEventListener('click', function (e) {{
      e.preventDefault();
      toast.textContent = 'No seu biosite, isto abre o WhatsApp do negócio com a mensagem pronta: "' + a.dataset.msg + '"';
      toast.classList.remove('hidden');
      clearTimeout(timer);
      timer = setTimeout(function () {{ toast.classList.add('hidden'); }}, 5000);
    }});
  }});
</script>
</body>
</html>
'''

raiz = os.path.join(os.path.dirname(os.path.abspath(__file__)), "..")
for r in RAMOS:
    d = os.path.join(raiz, "modelo-" + r["slug"])
    os.makedirs(d, exist_ok=True)
    with open(os.path.join(d, "index.html"), "w", encoding="utf-8") as f:
        f.write(page(r))

# índice raiz com todos os modelos (a boutique é mantida à mão)
lista = [("boutique", "Boutique de moda feminina", "#8E3B4E")] + [(r["slug"], r["nome"], r["cor"]) for r in RAMOS]
lis = "\n".join(
    f'    <li><a class="flex min-h-[52px] items-center gap-3 rounded-xl border border-neutral-200 bg-white px-4 py-3" href="modelo-{s}/"><span class="h-4 w-4 rounded-full" style="background:{c}" aria-hidden="true"></span><span class="font-medium">{esc(n)}</span></a></li>'
    for s, n, c in lista)
with open(os.path.join(raiz, "index.html"), "w", encoding="utf-8") as f:
    f.write(f'''<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>Modelos de biosite · ezf.tech</title>
<script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-neutral-50 text-neutral-900 antialiased">
<main class="mx-auto max-w-[440px] px-4 py-8">
  <h1 class="text-2xl font-semibold">Modelos de biosite</h1>
  <p class="mt-1 text-sm text-neutral-600">Exemplos por ramo. Toque em um para ver como fica.</p>
  <ul class="mt-6 space-y-3">
{lis}
  </ul>
</main>
</body>
</html>
''')
print("ok", len(RAMOS), "modelos")
