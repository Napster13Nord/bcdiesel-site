'use client'
// GERADO por scripts/port-app.mjs a partir de _gerador/tpl/AppB.jsx — não editar à mão.
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import RodapeZonas from './RodapeZonas'
import {
  ArrowUpRight,
  ArrowDown,
  Phone,
  Mail,
  MapPin,
  MessageSquare,
  Menu,
  Plus,
  X,
  Check,
  ChevronLeft,
  ChevronRight,
  Loader2,
  AlertTriangle,
  Play,
} from 'lucide-react'
import { useSite, SiteProvider } from './SiteContext'

// Versão B da página inicial (PLANO-DEMO-B.md). Lê exatamente as mesmas
// constantes que o App.jsx e não pede campo nenhum de novo aos temas: é isso
// que a deixa correr nos 14 nichos sem mexer num `sites-*.mjs`.
//
// Os textos fixos vêm de `STRINGS`, já na língua da lead (PLANO-EUA.md §A2):
// o português é o de sempre e o inglês é o das demos dos EUA. O inglês só
// existe em B.
//
// Direção: "editorial local". Papel quente, a cor do tema só como acento, os
// botões principais escuros. Não é gosto: em metade dos nichos o branco sobre
// a cor primária não chega ao contraste AA (o dourado do cabeleireiro dá 2,4).

/* ----------------------------------------------------------------
   Estilo próprio de B
---------------------------------------------------------------- */
// Vive aqui e não no globals.css para A não levar nem um byte disto. As cores
// do tema continuam a vir das variáveis (`--primary`…), que é o que o seletor
// de estilo reescreve.
const ESTILO_B = `
.b-papel{background-color:#F6F3ED}
.b-papel-2{background-color:#F1ECE3}
.b-t2{color:#5F584E}
.b-linha{border-color:#E3DCCF}
.site-b section[id]{scroll-margin-top:calc(var(--barra-demo,0px) + 5.5rem)}
.site-b :focus-visible{outline:2px solid rgb(var(--primary-dark));outline-offset:3px}
.site-b .b-escuro :focus-visible,.site-b .b-menu :focus-visible{outline-color:rgb(var(--primary-light))}

.b-sub{background-image:linear-gradient(currentColor,currentColor);background-size:0% 1px;background-position:0 100%;background-repeat:no-repeat;padding-bottom:2px;transition:background-size .35s cubic-bezier(.2,.7,.2,1)}
.b-sub:hover,.b-sub:focus-visible{background-size:100% 1px}

.b-botao{transition:transform .35s cubic-bezier(.2,.7,.2,1),box-shadow .35s}
.b-botao:hover{transform:translateY(-2px)}
.b-botao:active{transform:translateY(0) scale(.98)}
.b-botao .b-seta{transition:transform .45s cubic-bezier(.2,.7,.2,1)}
.b-botao:hover .b-seta{transform:rotate(45deg)}

.b-menu{visibility:hidden;clip-path:circle(0px at calc(100% - 2.6rem) calc(var(--barra-demo,0px) + 2.9rem));transition:clip-path .7s cubic-bezier(.76,0,.24,1),visibility 0s linear .7s}
.b-menu[data-aberto="true"]{visibility:visible;clip-path:circle(150vmax at calc(100% - 2.6rem) calc(var(--barra-demo,0px) + 2.9rem));transition:clip-path .7s cubic-bezier(.76,0,.24,1),visibility 0s}
.b-menu .b-item{opacity:0;transform:translateY(18px);transition:opacity .45s,transform .6s cubic-bezier(.2,.7,.2,1)}
.b-menu[data-aberto="true"] .b-item{opacity:1;transform:none;transition-delay:calc(.2s + var(--i,0) * 60ms)}

.b-cartao{transition:transform .5s cubic-bezier(.2,.7,.2,1),box-shadow .5s}
.b-cartao::before{content:"";position:absolute;inset:0;border-radius:inherit;pointer-events:none;opacity:0;transition:opacity .4s;background:radial-gradient(420px circle at var(--mx,50%) var(--my,50%),rgb(var(--primary) / .18),transparent 45%)}
.b-cartao:hover{transform:translateY(-4px);box-shadow:0 28px 50px -28px rgba(15,20,25,.45)}
.b-cartao:hover .b-icone{animation:b-mexe .7s cubic-bezier(.36,.07,.19,.97)}
@media (hover:hover) and (pointer:fine){.b-cartao:hover::before{opacity:1}}
@keyframes b-mexe{0%,100%{transform:none}20%{transform:rotate(-12deg) scale(1.08)}45%{transform:rotate(9deg) scale(1.08)}70%{transform:rotate(-4deg)}}

.b-anim .b-revela{opacity:0;transform:translateY(26px);transition:opacity .8s cubic-bezier(.2,.7,.2,1),transform .8s cubic-bezier(.2,.7,.2,1);transition-delay:calc(var(--i,0) * 80ms)}
.b-anim .b-revela.b-visto{opacity:1;transform:none}
.b-anim .b-mascara{clip-path:inset(9% 7% 9% 7% round 1.5rem);transition:clip-path 1.2s cubic-bezier(.2,.7,.2,1)}
.b-anim .b-mascara img{transform:scale(1.16);transition:transform 1.5s cubic-bezier(.2,.7,.2,1)}
.b-anim .b-mascara.b-visto{clip-path:inset(0 0 0 0 round 1.5rem)}
.b-anim .b-mascara.b-visto img{transform:none}

.b-respira{animation:b-respira 16s ease-in-out infinite alternate}
@keyframes b-respira{from{transform:scale(1.001)}to{transform:scale(1.07)}}
.b-flutua{animation:b-flutua 7s ease-in-out infinite}
@keyframes b-flutua{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
.b-pulso{animation:b-pulso 2s ease-out infinite}
@keyframes b-pulso{0%{box-shadow:0 0 0 0 rgb(16 185 129 / .55)}70%,100%{box-shadow:0 0 0 7px rgb(16 185 129 / 0)}}


.b-chip{transition:background-color .25s,color .25s,border-color .25s,transform .25s}
.b-chip:hover{transform:translateY(-1px)}
.b-chip[aria-pressed="true"]{animation:b-escolha .5s cubic-bezier(.2,.7,.2,1)}
@keyframes b-escolha{0%{transform:scale(.94)}60%{transform:scale(1.04)}100%{transform:none}}
.b-campo{transition:border-color .2s,box-shadow .2s,background-color .2s}
.b-campo:focus{border-color:rgb(var(--primary-dark));box-shadow:0 0 0 4px rgb(var(--primary) / .18);background-color:#fff;outline:none}
.b-traco{stroke-dasharray:30;stroke-dashoffset:30;animation:b-traco .6s .15s cubic-bezier(.2,.7,.2,1) forwards}
@keyframes b-traco{to{stroke-dashoffset:0}}
.b-surge{animation:b-surge .5s cubic-bezier(.2,.7,.2,1)}
@keyframes b-surge{from{opacity:0;transform:translateY(10px) scale(.97)}to{opacity:1;transform:none}}

@media (prefers-reduced-motion:reduce){
  html{scroll-behavior:auto}
  .site-b *,.site-b *::before,.site-b *::after{animation:none!important;transition:none!important}
  div[class~="z-[75]"]{transition:none!important}
}
`

/* ----------------------------------------------------------------
   Utilitários
---------------------------------------------------------------- */
const semMovimento = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

// O GSAP chega como em A: só depois do `load`, quando o herói já está pintado,
// e uma só vez para toda a página. Nada no primeiro ecrã depende dele.
let promessaGsap
const carregarGsap = () => (promessaGsap ??= Promise
  .all([import('gsap'), import('gsap/ScrollTrigger'), import('gsap/SplitText')])
  .then(([{ gsap }, { ScrollTrigger }, { SplitText }]) => {
    gsap.registerPlugin(ScrollTrigger, SplitText)
    return { gsap, ScrollTrigger, SplitText }
  }))

const depoisDoLoad = (fn) => {
  if (document.readyState === 'complete') { fn(); return () => {} }
  window.addEventListener('load', fn, { once: true })
  return () => window.removeEventListener('load', fn)
}

// `montar(mm, g)` recebe um `gsap.matchMedia` preso à secção: cada animação diz
// para que largura existe, e tudo se desfaz ao sair ou ao mudar de largura.
// Com movimento reduzido o GSAP nem chega a ser pedido.
function useAnimacao(montar, ref, deps = []) {
  useEffect(() => {
    if (semMovimento()) return
    let mm
    let saiu = false
    const parar = depoisDoLoad(() => {
      carregarGsap().then((g) => {
        if (saiu || !ref.current) return
        mm = g.gsap.matchMedia(ref.current)
        montar(mm, g)
      })
    })
    return () => { saiu = true; parar(); mm?.revert() }
  }, deps)
}

// Os textos dos temas trazem travessões ("Ligue, é sempre mais rápido" vinha com
// um no meio), e em B não se mostra nenhum: é o sinal mais reconhecido de texto
// escrito por máquina. A vírgula nunca muda o sentido. Os temas ficam como
// estão, porque são os de A. As avaliações do Google não passam por aqui: são
// palavras de outra pessoa e mostram-se como ela as escreveu.
const semTravessao = (t) =>
  typeof t === 'string'
    ? t.replace(/\s+[\u2013\u2014]\s+/g, ', ').replace(/(\d)\s*[\u2013\u2014]\s*(\d)/g, '$1 a $2')
    : t

// O mesmo helper de A: o `srcset` sai do parâmetro `w=` do Unsplash, ou das
// versões de 640, 960 e 1280 px que o `npm run webp` deixa ao lado das fotos
// do cliente. Sem nenhum dos dois não há `srcset`.
const conjunto = (url, larguras) =>
  /[?&]w=\d+/.test(url ?? '')
    ? larguras.map((w) => `${url.replace(/([?&])w=\d+/, `$1w=${w}`)} ${w}w`).join(', ')
    : /^\/fotos\/.+\.webp$/.test(url ?? '')
      ? [640, 960, 1280]
          .map((w) => `${url.replace(/\.webp$/, `-${w}.webp`)} ${w}w`)
          .concat(`${url} 1920w`)
          .join(', ')
      : undefined

// Igual a A: só se mede numa proposta, e só o nome do servidor de onde veio.
const registarClique = (tipo, servico) => {
  if (!servico?.rastrear) return
  try {
    fetch(`${servico.api}/api/track`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ caminho: servico.site || window.location.pathname.replace(/\/$/, ''), tipo }),
      keepalive: true,
    }).catch(() => {})
  } catch {}
}

// "Marcar horário" nos nichos de marcação, "Pedir orçamento" nos de obra. O
// verbo vem do tema; B só escolhe a forma curta. Em inglês é "Book".
const ehMarcacao = (cta) => /^(marcar|book)/i.test(cta ?? '')

/* ----------------------------------------------------------------
   Horário: saber se está aberto agora
---------------------------------------------------------------- */
// A config traz o horário como está guardado, um texto por dia ({seg:"09:00 a
// 19:00" com o traço do Google, sab:"Encerrado"}). Daqui sai o estado e a tabela
// da semana, escritos na língua da lead. Se algum dia não
// se reconhecer, devolve null e o estado não aparece. Mais vale não dizer nada
// do que dizer "aberto" a uma porta fechada.
const ORDEM = ['seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom']
const DIA_JS = ['dom', 'seg', 'ter', 'qua', 'qui', 'sex', 'sab']

function lerHoras(texto) {
  if (/24 horas/i.test(texto)) return [[0, 1440]]
  const intervalos = []
  for (const parte of texto.split(/,\s*/)) {
    const m = /^(\d{1,2}):(\d{2})\s*[\u2013\u2014-]\s*(\d{1,2}):(\d{2})$/.exec(parte.trim())
    if (!m) return null
    const ini = Number(m[1]) * 60 + Number(m[2])
    let fim = Number(m[3]) * 60 + Number(m[4])
    // Passa da meia-noite: conta até ao fim do dia. Nenhum destes ofícios
    // trabalha de noite, e assim não se inventa uma hora no dia seguinte.
    if (fim <= ini) fim = 1440
    intervalos.push([ini, fim])
  }
  return intervalos.length ? intervalos : null
}

// A semana do negócio: os dias fechados saem, os outros ficam com os intervalos
// em minutos. O mesmo resultado que dava ler de volta o texto de A, sem passar
// por uma língua.
function lerSemana(horario) {
  if (!horario || typeof horario !== 'object') return null
  const semana = {}
  for (const d of ORDEM) {
    const texto = horario[d]
    if (!texto || /^encerrado$/i.test(texto)) continue
    const horas = lerHoras(String(texto))
    if (!horas) return null
    semana[d] = horas
  }
  return Object.keys(semana).length ? semana : null
}

// "9h às 19h, 14h às 18h" ou "9 AM to 7 PM". `t` são os textos das horas.
const horasEmTexto = (intervalos, t) =>
  intervalos
    .map(([a, b]) => (a === 0 && b === 1440 ? t.diaInteiro : t.intervalo(a, b)))
    .join(', ')

// A hora da terra do negócio (Lisboa, em Portugal), seja qual for o fuso de quem
// abre a página. Sem fuso, é a de quem abre.
function agoraNoFuso(fuso) {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat('en-GB', {
      timeZone: fuso, weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23',
    }).formatToParts(new Date()).map((x) => [x.type, x.value])
  )
  const dia = { Sun: 'dom', Mon: 'seg', Tue: 'ter', Wed: 'qua', Thu: 'qui', Fri: 'sex', Sat: 'sab' }[p.weekday]
  return { dia, min: Number(p.hour) * 60 + Number(p.minute) }
}

function estadoAgora(semana, agora, t) {
  const hoje = semana[agora.dia] ?? []
  const dentro = hoje.find(([a, b]) => agora.min >= a && agora.min < b)
  if (dentro) {
    if (dentro[0] === 0 && dentro[1] === 1440) return { aberto: true, texto: t.aberto24 }
    return { aberto: true, texto: t.abertoFecha(t.aHora(dentro[1])) }
  }
  const logo = hoje.find(([a]) => a > agora.min)
  if (logo) return { aberto: false, texto: t.fechadoAbre(t.aHora(logo[0])) }
  const i = DIA_JS.indexOf(agora.dia)
  for (let k = 1; k <= 7; k++) {
    const d = DIA_JS[(i + k) % 7]
    const r = semana[d]?.[0]
    if (r) return { aberto: false, texto: t.fechadoAbre(`${k === 1 ? t.amanha : t.longo[d]} ${t.aHora(r[0])}`) }
  }
  return null
}

// Só no browser: no servidor a hora seria a da máquina, e o HTML sairia com um
// estado que o browser desmentia ao hidratar. Até lá fica o lugar guardado.
function useEstadoAgora(semana) {
  const { BRAND, STRINGS } = useSite()
  const [estado, setEstado] = useState(null)
  useEffect(() => {
    if (!semana) return
    const ver = () => setEstado(estadoAgora(semana, agoraNoFuso(BRAND.fuso), STRINGS.horas))
    ver()
    const id = setInterval(ver, 60000)
    return () => clearInterval(id)
  }, [semana])
  return estado
}

/* ----------------------------------------------------------------
   Peças pequenas
---------------------------------------------------------------- */
const STAR_PATH =
  'M11.7926 19.0032C11.9201 18.9258 12.0799 18.9259 12.2074 19.0032L17.9862 22.5077C18.289 22.6913 18.6634 22.4201 18.5833 22.0752L17.0484 15.4643C17.0149 15.3201 17.0638 15.1693 17.1754 15.0721L22.2877 10.6222C22.5542 10.3902 22.411 9.9519 22.059 9.92189L15.3317 9.34841C15.1837 9.3358 15.0548 9.24219 14.9971 9.10532L12.3686 2.87374C12.231 2.54768 11.769 2.54769 11.6314 2.87374L9.00288 9.10532C8.94515 9.24219 8.81632 9.3358 8.66831 9.34841L1.94098 9.92189C1.58896 9.9519 1.44585 10.3902 1.71234 10.6222L6.82459 15.0721C6.93622 15.1693 6.98508 15.3201 6.95161 15.4643L5.41671 22.0752C5.33664 22.4201 5.71105 22.6913 6.01376 22.5077L11.7926 19.0032Z'

const WHATSAPP_PATH =
  'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51l-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884a9.82 9.82 0 016.988 2.898 9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.548 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z'

// Os desenhos que se repetem (a estrela, o G do Google, o WhatsApp) vivem uma
// só vez na página, e cada ícone aponta para eles com `<use>`. Cada estrela era
// um traçado de 1 kB, cinco por avaliação, e a fita repete as avaliações: o HTML
// de B passava dos 230 kB, e o React manda um bloco desses à parte e tarde.
function Desenhos() {
  return (
    <svg aria-hidden="true" width="0" height="0" className="absolute">
      <symbol id="b-estrela" viewBox="0 0 24 25">
        <path d={STAR_PATH} />
      </symbol>
      <symbol id="b-google" viewBox="0 0 16 16">
        <path d="M3.54594 9.66899L2.989 11.7481L0.953406 11.7912C0.345063 10.6628 0 9.37186 0 7.99999C0 6.67339 0.322625 5.42239 0.8945 4.32086H0.894937L2.70719 4.65311L3.50106 6.45449C3.33491 6.93889 3.24434 7.45889 3.24434 7.99999C3.24441 8.58724 3.35078 9.14989 3.54594 9.66899Z" fill="#FBBB00" />
        <path d="M15.8602 6.50552C15.9521 6.98946 16 7.48924 16 8.00002C16 8.57277 15.9398 9.13146 15.8251 9.67037C15.4357 11.5042 14.4181 13.1055 13.0084 14.2387L13.008 14.2383L10.7253 14.1218L10.4023 12.1051C11.3377 11.5565 12.0687 10.6981 12.4537 9.67037H8.1759V6.50552H12.5161H15.8602Z" fill="#518EF8" />
        <path d="M13.008 14.2382L13.0084 14.2387C11.6375 15.3406 9.8959 16 8.00009 16C4.95349 16 2.30471 14.2971 0.953491 11.7912L3.54602 9.66901C4.22162 11.4721 5.96096 12.7556 8.00009 12.7556C8.87655 12.7556 9.69768 12.5187 10.4023 12.105L13.008 14.2382Z" fill="#28B446" />
        <path d="M13.1064 1.84175L10.5147 3.9635C9.7855 3.50769 8.9235 3.24437 8 3.24437C5.91472 3.24437 4.14284 4.58678 3.50109 6.4545L0.894938 4.32087H0.894501C2.22594 1.75384 4.90813 0 8 0C9.94109 0 11.7209 0.691437 13.1064 1.84175Z" fill="#F14336" />
      </symbol>
      <symbol id="b-whatsapp" viewBox="0 0 24 24">
        <path d={WHATSAPP_PATH} />
      </symbol>
    </svg>
  )
}

// Estrelas pintadas por fração: 4,6 enche quatro e 60% da quinta.
function Estrelas({ valor = 5, className = 'h-4 w-4' }) {
  return (
    <span className="inline-flex items-center gap-0.5" aria-hidden="true">
      {[0, 1, 2, 3, 4].map((i) => {
        const f = Math.max(0, Math.min(1, valor - i))
        return (
          <svg key={i} viewBox="0 0 24 25" className={className}>
            <use href="#b-estrela" fill="#E3DCCF" />
            {f > 0 ? (
              <use href="#b-estrela" fill="#F5A524" style={f < 1 ? { clipPath: `inset(0 ${100 - f * 100}% 0 0)` } : undefined} />
            ) : null}
          </svg>
        )
      })}
    </span>
  )
}

function GoogleLogo({ className = 'h-4 w-4' }) {
  return (
    <svg className={className} viewBox="0 0 16 16" aria-hidden="true">
      <use href="#b-google" />
    </svg>
  )
}

function IconeWhatsApp({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <use href="#b-whatsapp" />
    </svg>
  )
}

// O custo da chamada a seguir ao número, onde quer que ele se veja: o DL
// 59/2021 obriga a dizer "Chamada para a rede móvel nacional" (ou fixa) logo a
// seguir ao número, de forma clara e visível. Em letra pequena, mas legível.
// Sem saber a rede (`phoneNote` vazio) não se afirma nada.
function CustoChamada({ className = '', entreParenteses = false }) {
  const { BRAND } = useSite()
  if (!BRAND.phoneNote) return null
  const nota = entreParenteses ? `(${BRAND.phoneNote.toLowerCase()})` : BRAND.phoneNote
  return <span className={`text-[11px] font-normal leading-snug ${className}`}>{nota}</span>
}

function Sobrancelha({ children, escuro = false, className = '' }) {
  return (
    <p className={`flex items-start gap-2.5 font-mono text-[11px] sm:text-xs font-medium uppercase leading-relaxed tracking-[0.22em] ${escuro ? 'text-white/70' : 'b-t2'} ${className}`}>
      <span aria-hidden="true" className="mt-[0.55em] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
      <span>{children}</span>
    </p>
  )
}

// Título de secção partido em duas letras, como em A: é o que o seletor de
// estilo sabe tratar (`data-titulo`). A segunda metade usa a cor escura do tema
// sobre o papel e a clara sobre o escuro, que são as que passam o AA.
function Titulo({ a, b, escuro = false, className = '' }) {
  return (
    <h2 className={`b-titulo font-display font-bold tracking-[-0.03em] leading-[1.04] text-[clamp(2rem,1.3rem+3.2vw,3.75rem)] text-balance ${escuro ? 'text-white' : 'text-ink'} ${className}`}>
      {semTravessao(a)}
      {b ? (
        <>
          {' '}
          <span className={`font-serif italic font-medium ${escuro ? 'text-primary-light' : 'text-primary-dark'}`}>
            {semTravessao(b)}
          </span>
        </>
      ) : null}
    </h2>
  )
}

// Botão principal: escuro, com a cor do tema no círculo da seta. É a única
// ação por ecrã que pesa assim.
function BotaoPrincipal({ href, onClick, externo = false, icone, children, className = '' }) {
  return (
    <a
      href={href}
      onClick={onClick}
      {...(externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`b-botao b-magnetico group inline-flex items-center gap-3 rounded-full bg-ink py-2 pl-6 pr-2 text-[15px] font-semibold text-white shadow-[0_18px_36px_-18px_rgba(15,20,25,.7)] ${className}`}
    >
      <span>{children}</span>
      <span aria-hidden="true" className="b-seta grid h-10 w-10 place-items-center rounded-full bg-primary text-white">
        {icone ?? <ArrowUpRight className="h-4 w-4" strokeWidth={2.4} />}
      </span>
    </a>
  )
}

/* ----------------------------------------------------------------
   Marca
---------------------------------------------------------------- */
// O logótipo do negócio quando existe; senão o ícone do nicho num círculo.
// Nunca se inventa uma marca.
// A marca não pode ir para o valor por defeito de `altura`: o port põe a
// leitura dela dentro do corpo, e o parâmetro lia-a antes de existir (500 em
// todas as demos B, 2026-11-20).
function Marca({ escuro = false, altura }) {
  const { BRAND, LogoIcon } = useSite()
  const logo = escuro ? (BRAND.logoEscuro || BRAND.logo) : BRAND.logo
  if (logo) {
    const h = altura ?? (BRAND.logoAlto ? 'h-14 sm:h-16' : 'h-10 sm:h-11')
    return <img src={logo} alt={BRAND.name} className={`${h} w-auto max-w-[11rem] object-contain`} />
  }
  return (
    <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${escuro ? 'bg-white/10 text-primary-light' : 'bg-ink text-primary-light'}`}>
      <LogoIcon className="h-5 w-5" strokeWidth={2.2} />
    </span>
  )
}

/* ----------------------------------------------------------------
   1. Cabeçalho
---------------------------------------------------------------- */
function Cabecalho() {
  const { BRAND, STEPS, REVIEWS, GALERIA, FAQ, SERVICO, STRINGS } = useSite()
  const [desceu, setDesceu] = useState(false)
  const [aberto, setAberto] = useState(false)
  const botaoMenu = useRef(null)
  const fechar = useRef(null)

  useEffect(() => {
    const ver = () => setDesceu(window.scrollY > 24)
    ver()
    window.addEventListener('scroll', ver, { passive: true })
    return () => window.removeEventListener('scroll', ver)
  }, [])

  // Menu aberto: a página por trás não rola, Escape fecha, e o foco vai e volta
  // para quem o abriu.
  useEffect(() => {
    if (!aberto) return
    const raiz = document.documentElement
    raiz.style.overflow = 'hidden'
    fechar.current?.focus()
    const tecla = (e) => e.key === 'Escape' && setAberto(false)
    window.addEventListener('keydown', tecla)
    return () => {
      raiz.style.overflow = ''
      window.removeEventListener('keydown', tecla)
      botaoMenu.current?.focus({ preventScroll: true })
    }
  }, [aberto])

  // Só as secções que existem nesta demo. No topo cabem três; o menu do
  // telemóvel leva todas.
  const N = STRINGS.nav
  const ligacoes = [
    { label: N.servicos, href: '#servicos' },
    ...(REVIEWS.length ? [{ label: N.avaliacoes, href: '#avaliacoes' }] : []),
    ...(STEPS?.length ? [{ label: N.processo, href: '#processo' }] : []),
    ...(GALERIA.length ? [{ label: N.galeria, href: '#galeria' }] : []),
    ...(FAQ?.length ? [{ label: N.perguntas, href: '#perguntas' }] : []),
    ...(BRAND.hours || BRAND.city || BRAND.morada ? [{ label: lerSemana(BRAND.horario) ? N.horario : N.zona, href: '#zona' }] : []),
    { label: N.contactos, href: '#contactos' },
  ]
  const topo = ligacoes.length > 3 ? ligacoes.filter((l) => l.href !== '#contactos').slice(0, 3) : ligacoes
  const whats = Boolean(BRAND.whatsapp)
  const acao = whats
    ? { href: `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(BRAND.whatsappMsg)}`, texto: 'WhatsApp', tipo: 'whatsapp_click' }
    : { href: `tel:${BRAND.phoneTel}`, texto: STRINGS.ligar, tipo: 'cta_click' }

  return (
    <>
      <header
        className={`fixed top-4 left-1/2 z-50 w-[calc(100%-1.5rem)] -translate-x-1/2 ${BRAND.logoAlto ? 'rounded-3xl' : 'rounded-full'} transition-[max-width,padding,background-color,box-shadow] duration-500 ease-[cubic-bezier(.2,.7,.2,1)] ${
          desceu
            ? `max-w-4xl bg-white/95 ${BRAND.logoAlto ? 'py-2 pl-4' : 'py-1.5 pl-3'} pr-1.5 shadow-[0_12px_40px_-16px_rgba(15,20,25,.35)] ring-1 ring-black/5 backdrop-blur`
            : 'max-w-7xl bg-transparent py-2.5 pl-3 pr-2 sm:pl-5'
        }`}
      >
        <nav aria-label={N.principal} className="flex items-center justify-between gap-4">
          <a href="#inicio" className="flex min-w-0 items-center gap-2.5">
            {/* Um logo alto encolhe na barra branca, senão encosta às bordas. */}
            <Marca altura={BRAND.logoAlto && desceu ? 'h-12 sm:h-14' : undefined} />
            <span className={`truncate font-display text-[17px] font-bold tracking-tight text-ink ${BRAND.logo ? 'sr-only' : ''}`}>
              {BRAND.short}
            </span>
          </a>

          <div className="hidden items-center gap-8 lg:flex">
            {topo.map((l) => (
              <a key={l.href} href={l.href} className="b-sub text-sm font-medium text-ink/75 transition-colors hover:text-ink">
                {l.label}
              </a>
            ))}
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <a
              href={acao.href}
              onClick={() => registarClique(acao.tipo, SERVICO)}
              {...(whats ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              className="b-botao hidden items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-semibold text-white sm:inline-flex"
            >
              {whats ? <IconeWhatsApp className="h-4 w-4" /> : <Phone className="h-4 w-4" strokeWidth={2.2} />}
              {acao.texto}
            </a>
            <button
              ref={botaoMenu}
              type="button"
              onClick={() => setAberto(true)}
              aria-label={N.abrirMenu}
              aria-expanded={aberto}
              className="grid h-10 w-10 place-items-center rounded-full border border-ink/15 bg-white/70 text-ink lg:hidden"
            >
              <Menu className="h-4 w-4" />
            </button>
          </div>
        </nav>
      </header>

      <div
        role="dialog"
        aria-modal="true"
        aria-label={N.menu}
        data-aberto={aberto}
        className="b-menu fixed inset-0 z-[60] flex flex-col bg-deep text-white lg:hidden"
      >
        <div className="flex items-center justify-between px-6 pb-6 pt-[calc(var(--barra-demo,0px)+1.5rem)]">
          <span className="flex min-w-0 items-center gap-2.5">
            <Marca escuro />
            <span className={`truncate font-display text-lg font-bold ${BRAND.logo ? 'sr-only' : ''}`}>{BRAND.short}</span>
          </span>
          <button
            ref={fechar}
            type="button"
            onClick={() => setAberto(false)}
            aria-label={N.fecharMenu}
            className="grid h-10 w-10 place-items-center rounded-full border border-white/20"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="flex flex-1 flex-col justify-center gap-2 px-8">
          {ligacoes.map((l, i) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setAberto(false)}
              style={{ '--i': i }}
              className="b-item font-display text-[2.6rem] font-bold leading-tight tracking-tight text-white/90 hover:text-primary-light"
            >
              {l.label}
            </a>
          ))}
        </div>
        <div className="b-item flex flex-col gap-3 px-8 pb-10" style={{ '--i': ligacoes.length }}>
          <a
            href={`tel:${BRAND.phoneTel}`}
            onClick={() => registarClique('cta_click', SERVICO)}
            className="inline-flex items-center gap-3 self-start rounded-full bg-white px-5 py-3 font-semibold text-ink"
          >
            <Phone className="h-4 w-4" strokeWidth={2.2} /> {BRAND.phoneDisplay}
          </a>
          {BRAND.phoneNote ? (
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/60">{BRAND.phoneNote}</p>
          ) : null}
        </div>
      </div>
    </>
  )
}

/* ----------------------------------------------------------------
   2. Herói
---------------------------------------------------------------- */
function ProvaGoogle() {
  const { BRAND, STRINGS } = useSite()
  if (!BRAND.ratingValue) return null
  return (
    <a
      href={BRAND.maps}
      target="_blank"
      rel="noopener nofollow"
      aria-label={STRINGS.provaAria(BRAND.rating, BRAND.reviews)}
      className="group inline-flex items-center gap-2.5 rounded-full bg-white py-2 pl-3 pr-4 text-sm shadow-[0_8px_24px_-14px_rgba(15,20,25,.45)] ring-1 ring-black/5 transition-shadow hover:shadow-[0_12px_28px_-12px_rgba(15,20,25,.45)]"
    >
      <GoogleLogo className="h-4 w-4" />
      <span className="font-display font-bold text-ink">{BRAND.rating}</span>
      <Estrelas valor={BRAND.ratingValue} className="h-3.5 w-3.5" />
      <span className="b-t2">{BRAND.reviews} {STRINGS.avaliacoesN}</span>
    </a>
  )
}

// "Aberto agora · fecha às 19h". Sem horário não aparece; com horário guarda o
// lugar até o browser saber a hora, para a linha não saltar.
function EstadoAgora({ semana, escuro = false }) {
  const { STRINGS } = useSite()
  const estado = useEstadoAgora(semana)
  if (!semana) return null
  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm font-medium ${
        escuro ? 'bg-white/10 text-white' : 'bg-white/70 text-ink ring-1 ring-black/5'
      }`}
      aria-live="polite"
    >
      <span
        aria-hidden="true"
        className={`h-2 w-2 shrink-0 rounded-full ${estado ? (estado.aberto ? 'b-pulso bg-emerald-500' : 'bg-amber-500') : 'bg-transparent'}`}
      />
      <span className={estado ? '' : 'invisible'}>{estado?.texto ?? STRINGS.horas.funcionamento}</span>
    </span>
  )
}

function Heroi() {
  const { BRAND, HERO, REVIEWS, COPY, SERVICO, STRINGS } = useSite()
  const whats = Boolean(BRAND.whatsapp)
  const semana = lerSemana(BRAND.horario)

  // "Cabeleireiro em Lisboa" vira "Cabeleireiro · Lisboa", e "Plumber in
  // Hamilton County" vira "Plumber · Hamilton County". Só se o fim for mesmo o
  // concelho da lead; um eyebrow com " em " pelo meio fica inteiro.
  const cidade = BRAND.city
  const partes = cidade && HERO.eyebrow?.endsWith(` ${cidade}`)
    ? [HERO.eyebrow.slice(0, -cidade.length - 1).replace(STRINGS.antesDoLocal, ''), cidade]
    : [HERO.eyebrow]

  // O espaço do topo é fixo e não segue a altura da barra da demo: essa só é
  // medida depois de o JS correr, e o herói saltava para baixo nesse momento
  // (CLS de 0,12 num telemóvel lento). Os valores chegam para a barra com
  // quatro linhas a 375 px.
  // Uma frase de quem avaliou, inteira e tal como a escreveu. Só uma avaliação
  // de cinco estrelas e curta o bastante para caber sem cortes.
  const citacao = REVIEWS.find((r) => (r.rating ?? 5) >= 5 && r.text && r.text.length >= 40 && r.text.length <= 150)

  return (
    <section id="inicio" className="relative overflow-hidden pb-14 pt-[11.5rem] sm:pb-20 sm:pt-40 lg:pb-24">
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(closest-side,rgb(var(--primary)/.16),transparent)]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10 lg:px-12">
        <div className="lg:col-span-7">
          <Sobrancelha>{partes.join(' · ')}</Sobrancelha>

          <h1 className="mt-6 font-display text-[clamp(2.6rem,1.6rem+4.6vw,5.25rem)] lg:text-[4.25rem] font-bold leading-[0.98] tracking-[-0.035em] text-ink">
            <span className="block">{semTravessao(HERO.line1)}</span>
            <span className="block font-serif font-medium italic text-primary-dark">{semTravessao(HERO.line2)}</span>
          </h1>

          <p className="b-t2 mt-7 max-w-xl text-[1.0625rem] leading-relaxed sm:text-lg">{semTravessao(HERO.sub)}</p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            {whats ? (
              <BotaoPrincipal
                href={`https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(BRAND.whatsappMsg)}`}
                externo
                onClick={() => registarClique('whatsapp_click', SERVICO)}
                icone={<IconeWhatsApp className="h-[18px] w-[18px]" />}
              >
                {STRINGS.falarWhatsApp}
              </BotaoPrincipal>
            ) : (
              <BotaoPrincipal
                href={`tel:${BRAND.phoneTel}`}
                onClick={() => registarClique('cta_click', SERVICO)}
                icone={<Phone className="h-4 w-4" strokeWidth={2.4} />}
              >
                {STRINGS.ligar} {BRAND.phoneDisplay}
              </BotaoPrincipal>
            )}
            <a
              href="#contactos"
              className="b-botao group inline-flex items-center gap-2 rounded-full border border-ink/15 bg-white/60 px-5 py-3.5 text-[15px] font-semibold text-ink hover:bg-white"
            >
              {COPY.heroCta}
              <ArrowDown className="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5" strokeWidth={2.2} />
            </a>
          </div>

          {/* O custo da chamada acompanha o número (DL 59/2021). Com WhatsApp o
              número não está à vista aqui, mas o botão também liga para ele. */}
          {BRAND.phoneNote && !whats ? (
            <p className="b-t2 mt-3 font-mono text-[11px] uppercase tracking-[0.14em]">{BRAND.phoneNote}</p>
          ) : null}

          {BRAND.ratingValue || semana ? (
            <div className="mt-9 flex flex-col items-start gap-2.5 sm:flex-row sm:flex-wrap sm:items-center">
              <ProvaGoogle />
              <EstadoAgora semana={semana} />
            </div>
          ) : null}
        </div>

        <div className="relative lg:col-span-5">
          <div className="relative aspect-[5/4] overflow-hidden rounded-[2rem] bg-[#E3DCCF] sm:aspect-[16/11] lg:aspect-auto lg:h-[clamp(26rem,calc(100svh-12rem),40rem)] lg:rounded-[2.5rem]">
            {/* A maior imagem da página: nunca lazy, e pedida à frente. Ganha
                movimento lento, mas já está à vista desde o primeiro pintar. */}
            <img
              src={HERO.image}
              srcSet={conjunto(HERO.image, [640, 960, 1280, 1920])}
              sizes="(min-width: 1024px) 40vw, 100vw"
              alt={HERO.alt}
              fetchPriority="high"
              decoding="async"
              className="b-respira absolute inset-0 h-full w-full object-cover"
            />
            <div aria-hidden="true" className="absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-black/5" />
          </div>

          {citacao ? (
            // O mesmo cartão da secção das avaliações, na versão clara, para
            // as duas lerem como uma só peça. No telemóvel fica por
            // baixo da foto, a tapar só a orla; do tablet para cima flutua sobre
            // o canto. Carregar leva às outras avaliações.
            <div className="b-flutua relative z-10 mx-4 -mt-10 w-fit rounded-3xl shadow-[0_24px_50px_-24px_rgba(15,20,25,.6)] sm:absolute sm:-bottom-8 sm:right-6 sm:mx-0 sm:mt-0 lg:-left-10 lg:right-auto">
              <CartaoAvaliacao
                avaliacao={citacao}
                claro
                onAbrir={() => document.getElementById('avaliacoes')?.scrollIntoView({ behavior: semMovimento() ? 'auto' : 'smooth' })}
              />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  )
}
// Acima de `md` fica o botão redondo de A, no canto oposto ao seletor.
function ContactoFlutuante() {
  const { BRAND, SERVICO, STRINGS } = useSite()
  const whats = Boolean(BRAND.whatsapp)
  const href = whats
    ? `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(BRAND.whatsappMsg)}`
    : `tel:${BRAND.phoneTel}`
  return (
    <a
      href={href}
      onClick={() => registarClique(whats ? 'whatsapp_click' : 'telefone_click', SERVICO)}
      {...(whats ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      aria-label={whats ? STRINGS.falarComWhatsApp(BRAND.name) : STRINGS.ligarPara(BRAND.phoneDisplay)}
      className="group fixed bottom-7 right-7 z-50 hidden items-center gap-3 md:flex"
    >
      <span className="max-w-0 overflow-hidden whitespace-nowrap rounded-full bg-white text-sm font-semibold text-ink opacity-0 shadow-lg ring-1 ring-black/5 transition-all duration-300 group-hover:max-w-[16rem] group-hover:px-4 group-hover:py-2.5 group-hover:opacity-100">
        {whats ? STRINGS.falarPorWhatsApp : STRINGS.ligarNumero(BRAND.phoneDisplay)}
        {whats ? null : <CustoChamada className="ml-1.5 font-normal b-t2" />}
      </span>
      <span
        className={`grid h-14 w-14 place-items-center rounded-full text-white shadow-lg transition-transform duration-300 group-hover:scale-105 group-active:scale-95 ${whats ? 'bg-[#25D366]' : 'bg-ink'}`}
      >
        {whats ? <IconeWhatsApp className="h-7 w-7" /> : <Phone className="h-6 w-6" strokeWidth={2.4} />}
      </span>
    </a>
  )
}

/* ----------------------------------------------------------------
   4. Serviços
---------------------------------------------------------------- */
// Tamanhos do bento numa grelha de 6 colunas: o primeiro largo, depois filas de
// três, e a última fila estica o que sobrar para não deixar buracos. Escrito por
// extenso porque o Tailwind procura as classes no ficheiro.
function tamanhos(n) {
  const lg = []
  if (n > 0) lg.push('lg:col-span-4')
  if (n > 1) lg.push('lg:col-span-2')
  const resto = Math.max(0, n - 2)
  const cheias = Math.floor(resto / 3) * 3
  for (let i = 0; i < cheias; i++) lg.push('lg:col-span-2')
  if (resto % 3 === 2) lg.push('lg:col-span-3', 'lg:col-span-3')
  if (resto % 3 === 1) lg.push('lg:col-span-6')
  // No tablet: duas colunas, o primeiro a toda a largura, e o último também se
  // ficar sozinho.
  return lg.map((c, i) => {
    const sm = i === 0 || (i === n - 1 && (n - 1) % 2 === 1) ? 'sm:col-span-2' : ''
    return `${c} ${sm}`
  })
}

// O brilho que segue o cursor. Só com rato: num ecrã tátil não há cursor.
const seguirCursor = (e) => {
  if (e.pointerType !== 'mouse') return
  const r = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
}

function Servicos({ onPedir }) {
  const { BRAND, SERVICES, COPY, SERVICO, STRINGS } = useSite()
  const marcacao = ehMarcacao(COPY.heroCta)
  const pedirTexto = marcacao ? STRINGS.servicos.marcarEste : STRINGS.servicos.pedirOrcamento
  const total = SERVICES.length + 1
  const classes = tamanhos(total)

  return (
    <section id="servicos" className="relative py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="grid items-end gap-6 lg:grid-cols-12">
          <div className="b-revela lg:col-span-8">
            <Sobrancelha>{COPY.services.eyebrow}</Sobrancelha>
            <Titulo className="mt-5" a={COPY.services.titleA} b={COPY.services.titleB} />
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-6">
          {SERVICES.map((s, i) => {
            const grande = i === 0
            return (
              <article
                key={s.title}
                onPointerMove={seguirCursor}
                style={{ '--i': i % 3 }}
                className={`b-revela b-cartao group relative flex flex-col overflow-hidden rounded-[1.75rem] p-6 sm:p-7 ${classes[i]} ${
                  grande ? 'b-escuro bg-deep text-white lg:p-10' : 'bg-white ring-1 ring-black/5'
                }`}
              >
                <div className="flex items-start justify-between">
                  <span
                    className={`b-icone grid h-12 w-12 place-items-center rounded-2xl ${
                      grande ? 'bg-white/10 text-primary-light' : 'bg-primary/10 text-primary-dark'
                    }`}
                  >
                    <s.icon className="h-5 w-5" strokeWidth={2.2} />
                  </span>
                  <span className={`font-mono text-xs tracking-[0.18em] ${grande ? 'text-white/60' : 'b-t2'}`}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <h3
                  className={`mt-6 font-display font-bold tracking-tight sm:mt-8 ${
                    grande ? 'text-[clamp(1.6rem,1.2rem+1.4vw,2.4rem)] leading-[1.08]' : 'text-xl leading-snug'
                  }`}
                >
                  {s.title}
                </h3>
                <p className={`mt-3 text-[15px] leading-relaxed ${grande ? 'max-w-lg text-white/75' : 'b-t2'}`}>
                  {semTravessao(s.text)}
                </p>
                <a
                  href="#contactos"
                  onClick={(e) => {
                    e.preventDefault()
                    onPedir(s.title)
                  }}
                  className={`mt-auto inline-flex items-center gap-1.5 self-start pt-7 text-sm font-semibold ${
                    grande ? 'text-primary-light' : 'text-ink'
                  }`}
                >
                  <span className="b-sub">{pedirTexto}</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:rotate-45" strokeWidth={2.2} />
                </a>
              </article>
            )
          })}

          {/* A última peça do bento: para quem não viu o que procurava. */}
          <article
            style={{ '--i': (total - 1) % 3 }}
            className={`b-revela b-escuro relative flex flex-col justify-between overflow-hidden rounded-[1.75rem] bg-ink p-6 text-white sm:p-7 ${classes[total - 1]}`}
          >
            <div aria-hidden="true" className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-[radial-gradient(closest-side,rgb(var(--primary)/.45),transparent)]" />
            <p className="relative font-display text-2xl font-bold leading-tight tracking-tight">
              {STRINGS.servicos.naoVe}{' '}
              <span className="font-serif font-medium italic text-primary-light">{STRINGS.servicos.digaNos}</span>
            </p>
            <div className="relative mt-8 flex flex-wrap items-center gap-3">
              <a
                href="#contactos"
                onClick={(e) => {
                  e.preventDefault()
                  onPedir('')
                }}
                className="b-botao inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink"
              >
                {COPY.heroCta} <ArrowUpRight className="h-4 w-4" strokeWidth={2.2} />
              </a>
              <span className="flex flex-col">
                <a
                  href={`tel:${BRAND.phoneTel}`}
                  onClick={() => registarClique('cta_click', SERVICO)}
                  className="b-sub self-start text-sm font-semibold text-white/85"
                >
                  {BRAND.phoneDisplay}
                </a>
                <CustoChamada className="mt-0.5 text-white/60" />
              </span>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   6. Prova social
---------------------------------------------------------------- */
// O número já está escrito no HTML; só desce a zero e conta se estiver abaixo
// da dobra quando o JS chega. Sem JS, ou com movimento reduzido, fica o número
// certo e não um zero.
function Contagem({ fim, casas = 0, sufixo = '' }) {
  const { STRINGS } = useSite()
  const ref = useRef(null)
  const [valor, setValor] = useState(fim)

  useEffect(() => {
    const el = ref.current
    if (!el || semMovimento() || el.getBoundingClientRect().top < window.innerHeight) return
    setValor(0)
    let raf
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return
      io.disconnect()
      const ini = performance.now()
      const passo = (agora) => {
        const t = Math.min(1, (agora - ini) / 1600)
        setValor(fim * (1 - Math.pow(1 - t, 3)))
        if (t < 1) raf = requestAnimationFrame(passo)
      }
      raf = requestAnimationFrame(passo)
    }, { threshold: 0.5 })
    io.observe(el)
    return () => { io.disconnect(); cancelAnimationFrame(raf) }
  }, [fim])

  const texto = casas ? valor.toFixed(casas).replace('.', STRINGS.decimal) : String(Math.round(valor))
  return <span ref={ref} className="tabular-nums">{texto}{sufixo}</span>
}

const CORES_AVATAR = ['#4285F4', '#DB4437', '#0F9D58', '#7B1FA2', '#00838F', '#EF6C00']

function Avatar({ avaliacao, tamanho = 'h-10 w-10' }) {
  if (avaliacao.avatar) {
    return (
      <img
        src={avaliacao.avatar}
        alt=""
        width="40"
        height="40"
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
        className={`${tamanho} shrink-0 rounded-full bg-white/10 object-cover`}
      />
    )
  }
  const cor = CORES_AVATAR[(avaliacao.author ?? '?').charCodeAt(0) % CORES_AVATAR.length]
  return (
    <span aria-hidden="true" className={`${tamanho} grid shrink-0 place-items-center rounded-full font-display font-semibold text-white`} style={{ background: cor }}>
      {(avaliacao.author ?? '?')[0]}
    </span>
  )
}

// "2025-10-06" -> "outubro de 2025" ou "October 2025", pela língua da lead. Em
// UTC, para o servidor e o browser escreverem o mesmo mês seja qual for o fuso
// de quem abre.
const mesDe = (data, locale) => {
  const d = new Date(data)
  return Number.isNaN(d.getTime())
    ? ''
    : new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric', timeZone: 'UTC' }).format(d)
}

// A fita corre sozinha e pára com o rato, o dedo ou o foco; é um contentor de
// scroll a sério, por isso também se arrasta com o dedo. Só anda enquanto está
// no ecrã: fora dele não gasta bateria a ninguém.
function useFita(ref, primeira, sentido = 1) {
  useEffect(() => {
    const el = ref.current
    if (!el || semMovimento()) return
    let pos = el.scrollLeft
    let parado = false
    let visivel = false
    let ultimo = performance.now()
    let raf
    let retoma
    const passo = (agora) => {
      const dt = Math.min(64, agora - ultimo)
      ultimo = agora
      const volta = primeira.current?.offsetWidth ?? 0
      // A segunda volta já está montada quando o scroll passa da primeira.
      if (!parado && visivel && volta && el.scrollWidth > volta) {
        pos += dt * 0.035 * sentido
        if (pos >= volta) pos -= volta
        if (pos <= 0) pos += volta
        el.scrollLeft = pos
      }
      raf = requestAnimationFrame(passo)
    }
    const parar = () => { parado = true; clearTimeout(retoma) }
    const seguir = () => {
      clearTimeout(retoma)
      retoma = setTimeout(() => { pos = el.scrollLeft; ultimo = performance.now(); parado = false }, 1500)
    }
    const io = new IntersectionObserver(([e]) => { visivel = e.isIntersecting })
    io.observe(el)
    const ouvir = [['pointerenter', parar], ['pointerleave', seguir], ['pointerdown', parar], ['pointerup', seguir],
                   ['touchstart', parar], ['touchend', seguir], ['focusin', parar], ['focusout', seguir]]
    ouvir.forEach(([n, f]) => el.addEventListener(n, f, { passive: true }))
    raf = requestAnimationFrame(passo)
    return () => {
      cancelAnimationFrame(raf)
      clearTimeout(retoma)
      io.disconnect()
      ouvir.forEach(([n, f]) => el.removeEventListener(n, f))
    }
  }, [])
}

// `claro` é a mesma peça sobre fundo claro: a do herói, sobre a foto.
function CartaoAvaliacao({ avaliacao, onAbrir, copia = false, claro = false }) {
  const { STRINGS } = useSite()
  const mes = mesDe(avaliacao.date, STRINGS.locale)
  return (
    <button
      type="button"
      onClick={onAbrir}
      tabIndex={copia ? -1 : 0}
      className={`group flex w-[82vw] max-w-[22rem] shrink-0 flex-col rounded-3xl p-6 text-left ring-1 transition-colors sm:w-[22rem] ${
        claro ? 'bg-white ring-black/5 hover:bg-[#FBFAF7]' : 'bg-white/[0.05] ring-white/10 hover:bg-white/[0.08]'
      }`}
    >
      <span className="flex items-center justify-between">
        <Estrelas valor={avaliacao.rating ?? 5} className="h-4 w-4" />
        <GoogleLogo className="h-4 w-4 opacity-80" />
      </span>
      <span className={`mt-4 line-clamp-5 text-[15px] leading-relaxed ${claro ? 'text-ink/85' : 'text-white/85'}`}>{avaliacao.text}</span>
      <span className="mt-auto flex items-center gap-3 pt-6">
        <Avatar avaliacao={avaliacao} />
        <span className="min-w-0">
          <span className={`block truncate font-display font-semibold ${claro ? 'text-ink' : 'text-white'}`}>{avaliacao.author}</span>
          {mes ? (
            <span className={`block font-mono text-[11px] uppercase tracking-[0.14em] ${claro ? 'b-t2' : 'text-white/60'}`}>{mes}</span>
          ) : null}
        </span>
      </span>
    </button>
  )
}

// Uma fila da fita. A segunda volta só se monta no browser e só se a fita
// for andar: no HTML do servidor era a mesma lista outra vez, a pesar para nada.
function Fita({ lista, sentido = 1, onAbrir, rotulo }) {
  const ref = useRef(null)
  const primeira = useRef(null)
  const [volta, setVolta] = useState(false)
  useEffect(() => { if (!semMovimento()) setVolta(true) }, [])
  useFita(ref, primeira, sentido)
  return (
    <div
      ref={ref}
      role="region"
      aria-label={rotulo}
      className="relative flex overflow-x-auto overscroll-x-contain px-5 pb-2 [scrollbar-width:none] sm:px-8 lg:px-12 [&::-webkit-scrollbar]:hidden"
    >
      <div ref={primeira} className="flex shrink-0 gap-4 pr-4">
        {lista.map(({ r, i }) => (
          <CartaoAvaliacao key={`${r.author}-${i}`} avaliacao={r} onAbrir={() => onAbrir(i)} />
        ))}
      </div>
      {/* Não conta para quem lê com leitor de ecrã nem para o Tab. */}
      {volta ? (
        <div aria-hidden="true" className="flex shrink-0 gap-4 pr-4">
          {lista.map(({ r, i }) => (
            <CartaoAvaliacao key={`c-${r.author}-${i}`} avaliacao={r} copia onAbrir={() => onAbrir(i)} />
          ))}
        </div>
      ) : null}
    </div>
  )
}

// As colunas seguem o número de números que sobraram do corte da prova do
// Google. Numa grelha fixa de três, com dois ficava uma célula vazia à direita;
// assim estreita e o `mx-auto` centra. Escrito por extenso porque o Tailwind
// procura as classes no ficheiro.
const COLUNAS_PILARES = {
  1: 'sm:max-w-md sm:grid-cols-1',
  2: 'sm:max-w-3xl sm:grid-cols-2',
  3: 'sm:grid-cols-3',
}

function ProvaSocial() {
  const { BRAND, PILLARS, REVIEWS, COPY, STRINGS } = useSite()
  const [aberta, setAberta] = useState(null)
  const fechar = useRef(null)

  useEffect(() => {
    if (aberta === null) return
    // O foco vai para o fecho e, ao fechar, volta ao cartão que o abriu.
    const antes = document.activeElement
    fechar.current?.focus()
    const tecla = (e) => e.key === 'Escape' && setAberta(null)
    window.addEventListener('keydown', tecla)
    return () => {
      window.removeEventListener('keydown', tecla)
      antes?.focus?.({ preventScroll: true })
    }
  }, [aberta])

  // Sem avaliações reais a secção não existe (PLANO.md §8.1).
  if (!REVIEWS.length) return null
  const avaliacao = aberta === null ? null : REVIEWS[aberta]
  // Cada avaliação leva o índice original, para a janela abrir a certa.
  const todas = REVIEWS.map((r, i) => ({ r, i }))
  const meio = Math.ceil(todas.length / 2)
  const filas = todas.length > 10 ? [todas.slice(0, meio), todas.slice(meio)] : [todas]
  const estrelas = PILLARS.find((p) => p.decimals)
  const T = STRINGS.provaSocial

  return (
    <section id="avaliacoes" className="b-escuro relative overflow-hidden bg-deep py-20 text-white sm:py-28 lg:py-32">
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-0 h-[30rem] w-[30rem] rounded-full bg-[radial-gradient(closest-side,rgb(var(--primary)/.22),transparent)]" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="b-revela max-w-3xl">
          <Sobrancelha escuro>{T.eyebrow}</Sobrancelha>
          <Titulo escuro className="mt-5" a={COPY.reviews.titleA} b={COPY.reviews.titleB} />
          {COPY.reviews.sub ? <p className="mt-6 max-w-xl text-[1.0625rem] leading-relaxed text-white/75">{semTravessao(COPY.reviews.sub)}</p> : null}
        </div>

        {PILLARS.length ? (
          <dl className={`mx-auto mt-14 grid gap-px overflow-hidden rounded-3xl bg-white/10 ${COLUNAS_PILARES[PILLARS.length] ?? COLUNAS_PILARES[3]}`}>
            {PILLARS.map((p, i) => (
              <div key={p.label} className="b-revela bg-deep p-6 sm:p-8" style={{ '--i': i }}>
                <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/60">{p.label}</dt>
                <dd className="mt-3 font-display text-[clamp(2.75rem,2rem+2.5vw,4rem)] font-bold leading-none tracking-[-0.04em]">
                  <Contagem fim={p.end} casas={p.decimals || 0} sufixo={p.suffix || ''} />
                </dd>
                {p === estrelas ? <div className="mt-3"><Estrelas valor={p.end} className="h-4 w-4" /></div> : null}
                <dd className="mt-3 max-w-xs text-sm leading-relaxed text-white/70">{semTravessao(p.text)}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </div>

      {/* Com poucas a fita repetia as mesmas: ficam paradas, uma a uma.
          Com mais de 10 avaliações passam duas filas, em sentidos opostos. */}
      {todas.length < 4 ? (
        <div className="relative mx-auto mt-12 flex max-w-7xl flex-wrap justify-center gap-4 px-5 sm:px-8 lg:px-12">
          {todas.map(({ r, i }) => (
            <CartaoAvaliacao key={`${r.author}-${i}`} avaliacao={r} onAbrir={() => setAberta(i)} />
          ))}
        </div>
      ) : (
        <div className="mt-12 space-y-4">
          {filas.map((fila, f) => (
            <Fita key={f} lista={fila} sentido={f ? -1 : 1} onAbrir={setAberta} rotulo={filas.length > 1 ? T.fila(f + 1) : T.fita} />
          ))}
        </div>
      )}

      <div className="relative mx-auto mt-10 flex max-w-7xl flex-wrap items-center gap-4 px-5 sm:px-8 lg:px-12">
        <a
          href={BRAND.maps}
          target="_blank"
          rel="noopener nofollow"
          className="b-botao inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink"
        >
          <GoogleLogo className="h-4 w-4" /> {T.verTodas} <ArrowUpRight className="h-4 w-4" strokeWidth={2.2} />
        </a>
        <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/60 motion-reduce:hidden">{T.parar}</p>
      </div>

      {avaliacao ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={T.de(avaliacao.author)}
          onClick={() => setAberta(null)}
          className="b-surge fixed inset-0 z-[70] grid place-items-center bg-deep/80 p-5 backdrop-blur-sm"
        >
          <div onClick={(e) => e.stopPropagation()} className="relative w-full max-w-lg rounded-3xl bg-white p-7 text-ink shadow-2xl sm:p-8">
            <button
              ref={fechar}
              type="button"
              onClick={() => setAberta(null)}
              aria-label={STRINGS.fechar}
              className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full text-ink/60 hover:bg-black/5 hover:text-ink"
            >
              <X className="h-5 w-5" />
            </button>
            <div className="flex items-center gap-3 pr-10">
              <Avatar avaliacao={avaliacao} tamanho="h-12 w-12" />
              <div>
                <p className="font-display text-lg font-bold">{avaliacao.author}</p>
                {mesDe(avaliacao.date, STRINGS.locale) ? <p className="b-t2 font-mono text-[11px] uppercase tracking-[0.14em]">{mesDe(avaliacao.date, STRINGS.locale)}</p> : null}
              </div>
            </div>
            <div className="mt-5"><Estrelas valor={avaliacao.rating ?? 5} className="h-4 w-4" /></div>
            <blockquote className="mt-4 max-h-[50vh] overflow-y-auto leading-relaxed text-ink/85">{avaliacao.text}</blockquote>
            <p className="b-t2 mt-6 flex items-center gap-2 border-t border-black/10 pt-5 font-mono text-[11px] uppercase tracking-[0.16em]">
              <GoogleLogo className="h-4 w-4" /> {T.publicada}
            </p>
          </div>
        </div>
      ) : null}
    </section>
  )
}

/* ----------------------------------------------------------------
   7. Como trabalhamos
---------------------------------------------------------------- */
// No computador os passos correm da esquerda para a direita enquanto a secção
// fica presa, com uma barra a dizer quanto falta. No telemóvel empilham-se, e a
// linha do tempo desenha-se ao descer. Sem movimento, ou antes de o GSAP
// chegar, o computador vê os três lado a lado e o telemóvel a linha inteira.
function Processo() {
  const { STEPS, COPY } = useSite()
  const ref = useRef(null)
  const palco = useRef(null)
  const pista = useRef(null)
  const barra = useRef(null)
  const linha = useRef(null)
  const [presa, setPresa] = useState(false)

  // A pista horizontal só existe com GSAP, num ecrã largo e com movimento.
  useEffect(() => {
    if (semMovimento()) return
    let saiu = false
    const parar = depoisDoLoad(() => {
      carregarGsap().then(() => {
        if (!saiu && window.matchMedia('(min-width: 1024px)').matches) setPresa(true)
      })
    })
    return () => { saiu = true; parar() }
  }, [])

  useAnimacao((mm, { gsap }) => {
    mm.add('(max-width: 1023.98px)', () => {
      gsap.fromTo(linha.current, { scaleY: 0 }, {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: { trigger: pista.current, start: 'top 75%', end: 'bottom 65%', scrub: 0.5 },
      })
    })
  }, ref)

  useAnimacao((mm, { gsap, ScrollTrigger }) => {
    if (!presa) return
    mm.add('(min-width: 1024px)', () => {
      const distancia = () => Math.max(0, pista.current.scrollWidth - document.documentElement.clientWidth)
      if (!distancia()) return
      gsap.to(pista.current, {
        x: () => -distancia(),
        ease: 'none',
        scrollTrigger: {
          trigger: palco.current,
          start: 'top top',
          end: () => `+=${distancia()}`,
          pin: true,
          scrub: 0.6,
          invalidateOnRefresh: true,
          onUpdate: (st) => { if (barra.current) barra.current.style.transform = `scaleX(${st.progress})` },
        },
      })
      // A secção presa ganha altura; o que vem a seguir tem de o saber.
      ScrollTrigger.sort()
      ScrollTrigger.refresh()
    })
  }, ref, [presa])

  if (!STEPS?.length) return null

  return (
    <section id="processo" ref={ref} className="relative">
      <div
        ref={palco}
        className={`py-20 sm:py-28 lg:py-32 ${presa ? 'lg:flex lg:h-[100svh] lg:flex-col lg:justify-center lg:overflow-hidden lg:pb-10 lg:pt-28' : ''}`}
      >
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="b-revela max-w-2xl">
              <Sobrancelha>{COPY.steps.eyebrow}</Sobrancelha>
              <Titulo className="mt-5" a={COPY.steps.titleA} b={COPY.steps.titleB} />
            </div>
            {presa ? (
              <div aria-hidden="true" className="hidden w-64 pb-2 lg:block">
                <div className="b-t2 flex justify-between font-mono text-[11px] uppercase tracking-[0.16em]">
                  {STEPS.map((s) => <span key={s.n}>{s.n}</span>)}
                </div>
                <div className="mt-2 h-[2px] w-full overflow-hidden rounded-full bg-ink/10">
                  <div ref={barra} className="h-full w-full origin-left scale-x-0 bg-primary-dark" />
                </div>
              </div>
            ) : null}
          </div>
        </div>

        <ol
          ref={pista}
          className={`relative mx-auto mt-12 max-w-7xl px-5 sm:px-8 lg:mt-14 ${
            presa
              ? 'lg:mx-0 lg:flex lg:w-max lg:max-w-none lg:gap-12 lg:pl-[max(3rem,calc((100vw_-_80rem)/2_+_3rem))] lg:pr-12'
              : 'lg:grid lg:grid-cols-3 lg:gap-8 lg:px-12'
          }`}
        >
          <span aria-hidden="true" className="absolute bottom-6 left-[2.5rem] top-4 w-px bg-ink/15 sm:left-[3.25rem] lg:hidden">
            <span ref={linha} className="block h-full w-full origin-top bg-primary-dark" />
          </span>
          {STEPS.map((s) => (
            <li
              key={s.n}
              className={`relative pb-14 pl-14 last:pb-0 sm:pl-16 lg:pb-0 lg:pl-0 ${
                presa ? 'lg:grid lg:w-[min(62vw,54rem)] lg:shrink-0 lg:grid-cols-[1fr_1.1fr] lg:items-center lg:gap-10' : ''
              }`}
            >
              <span
                aria-hidden="true"
                className="absolute left-0 top-0 grid h-10 w-10 place-items-center rounded-full bg-ink font-mono text-xs font-semibold text-white ring-8 ring-[#F6F3ED] lg:hidden"
              >
                {s.n}
              </span>
              <div
                className={`b-mascara relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-[#E3DCCF] ${
                  presa ? 'lg:aspect-auto lg:h-[min(56vh,34rem)]' : ''
                }`}
              >
                <img
                  src={s.img}
                  srcSet={conjunto(s.img, [480, 768, 1024, 1536])}
                  sizes="(min-width: 1024px) 30vw, 100vw"
                  alt={s.alt}
                  loading="lazy"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
              <div className="mt-6 lg:mt-7">
                <p className="flex items-baseline gap-3">
                  <span aria-hidden="true" className="hidden font-display text-5xl font-bold tracking-tighter text-primary-dark/30 lg:inline">
                    {s.n}
                  </span>
                  <span className="b-t2 font-mono text-[11px] uppercase tracking-[0.18em]">{s.eyebrow}</span>
                </p>
                <h3 className="mt-3 font-display text-2xl font-bold leading-tight tracking-tight sm:text-[1.75rem]">
                  {semTravessao(s.title)}
                </h3>
                <p className="b-t2 mt-3 max-w-md text-[15px] leading-relaxed">{semTravessao(s.text)}</p>
                {s.bullets?.length ? (
                  <ul className="mt-5 flex flex-wrap gap-2">
                    {s.bullets.map((b) => (
                      <li key={b} className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[13px] font-medium ring-1 ring-black/5">
                        <Check className="h-3.5 w-3.5 text-primary-dark" strokeWidth={2.6} />
                        {semTravessao(b)}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   8. Galeria
---------------------------------------------------------------- */
// O mosaico repete um desenho de seis: uma grande, duas pequenas, uma alta,
// uma pequena, uma larga. O `grid-flow-dense` tapa os buracos que sobrarem.
const MOSAICO = ['lg:col-span-2 lg:row-span-2', '', '', 'lg:row-span-2', '', 'lg:col-span-2']

function Galeria() {
  const { GALERIA, COPY, STRINGS } = useSite()
  const [aberta, setAberta] = useState(null)
  const [arrasto, setArrasto] = useState(0)
  const inicio = useRef(null)
  const fechar = useRef(null)
  const n = GALERIA.length

  const passar = (d) => setAberta((i) => (i === null ? i : (i + d + n) % n))

  useEffect(() => {
    if (aberta === null) return
    const antes = document.activeElement
    const raiz = document.documentElement
    raiz.style.overflow = 'hidden'
    fechar.current?.focus()
    const tecla = (e) => {
      if (e.key === 'Escape') setAberta(null)
      if (e.key === 'ArrowRight') passar(1)
      if (e.key === 'ArrowLeft') passar(-1)
    }
    window.addEventListener('keydown', tecla)
    return () => {
      raiz.style.overflow = ''
      window.removeEventListener('keydown', tecla)
      antes?.focus?.({ preventScroll: true })
    }
  }, [aberta === null])

  // Sem fotografias do próprio negócio não há secção: um mosaico de banco de
  // imagens prometia um trabalho que não é o dele.
  if (!n) return null
  const copy = COPY.gallery ?? STRINGS.galeria.copy
  const foto = aberta === null ? null : GALERIA[aberta]

  // Arrastar para passar: o dedo leva a foto, e passa de 60 px muda.
  const tocar = {
    onPointerDown: (e) => { inicio.current = e.clientX; e.currentTarget.setPointerCapture?.(e.pointerId) },
    onPointerMove: (e) => { if (inicio.current !== null) setArrasto(e.clientX - inicio.current) },
    onPointerUp: () => {
      if (Math.abs(arrasto) > 60) passar(arrasto < 0 ? 1 : -1)
      inicio.current = null
      setArrasto(0)
    },
    onPointerCancel: () => { inicio.current = null; setArrasto(0) },
  }

  return (
    <section id="galeria" className="b-escuro relative bg-deep py-20 text-white sm:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="b-revela max-w-2xl">
          <Sobrancelha escuro>{copy.eyebrow}</Sobrancelha>
          <Titulo escuro className="mt-5" a={copy.titleA} b={copy.titleB} />
        </div>
      </div>

      {/* No telemóvel é um carrossel que encaixa foto a foto; a partir do
          tablet, um mosaico. */}
      <ul className="mt-12 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 [scrollbar-width:none] sm:mx-auto sm:grid sm:max-w-7xl sm:grid-flow-dense sm:grid-cols-3 sm:gap-4 sm:overflow-visible sm:px-8 lg:auto-rows-[13rem] lg:grid-cols-4 lg:px-12 [&::-webkit-scrollbar]:hidden">
        {GALERIA.map((f, i) => (
          <li key={f.img} className={`b-revela w-[78vw] shrink-0 snap-center sm:w-auto ${MOSAICO[i % 6]}`} style={{ '--i': i % 4 }}>
            <button
              type="button"
              onClick={() => setAberta(i)}
              aria-label={STRINGS.galeria.verMaior(f.alt)}
              className="group relative block aspect-[4/5] h-full w-full overflow-hidden rounded-[1.25rem] bg-white/5 sm:aspect-square lg:aspect-auto"
            >
              <img
                src={f.img}
                srcSet={conjunto(f.img, [640, 960, 1280])}
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 78vw"
                alt={f.alt}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.06]"
              />
              {/* Um vídeo é a imagem `img` (o poster) com um play por cima. Só
                  descarrega quando se abre: cinco vídeos a tocar sozinhos
                  pesavam mais do que a página toda. */}
              {f.video ? (
                <span className="absolute inset-0 grid place-items-center">
                  <span className="grid h-14 w-14 place-items-center rounded-full bg-deep/60 text-white backdrop-blur-sm transition-transform duration-300 group-hover:scale-110">
                    <Play className="ml-1 h-6 w-6 fill-current" />
                  </span>
                </span>
              ) : null}
              <span className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-deep/80 to-transparent p-4 pt-10 text-left font-mono text-[11px] uppercase tracking-[0.14em] text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                {f.alt}
              </span>
            </button>
          </li>
        ))}
      </ul>

      {foto ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={STRINGS.galeria.foto(aberta + 1, n)}
          className="b-surge fixed inset-0 z-[70] flex flex-col bg-deep/95 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between px-5 pb-3 pt-[calc(var(--barra-demo,0px)+1rem)] sm:px-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-white/70">
              {String(aberta + 1).padStart(2, '0')} / {String(n).padStart(2, '0')}
            </p>
            <button
              ref={fechar}
              type="button"
              onClick={() => setAberta(null)}
              aria-label={STRINGS.fechar}
              className="grid h-11 w-11 place-items-center rounded-full border border-white/20 text-white hover:bg-white/10"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          {/* Num vídeo o arrasto sai: a captura do ponteiro roubava os cliques
              aos controlos. Passa-se com as setas ou o teclado. */}
          <div {...(foto.video ? {} : tocar)} className={`relative flex flex-1 select-none items-center justify-center overflow-hidden px-4 sm:px-20 ${foto.video ? '' : 'touch-none'}`}>
            {foto.video ? (
              <video
                key={foto.video}
                src={foto.video}
                poster={foto.img}
                aria-label={foto.alt}
                controls
                autoPlay
                muted
                loop
                playsInline
                className="b-surge max-h-full max-w-full rounded-2xl object-contain"
              />
            ) : (
              <img
                key={foto.img}
                src={foto.img}
                srcSet={conjunto(foto.img, [640, 960, 1280])}
                sizes="100vw"
                alt={foto.alt}
                draggable={false}
                className="b-surge max-h-full max-w-full rounded-2xl object-contain"
                style={{ transform: `translateX(${arrasto}px)`, transition: arrasto ? 'none' : 'transform .3s' }}
              />
            )}
            {n > 1 ? (
              <>
                <button type="button" onClick={() => passar(-1)} aria-label={STRINGS.galeria.anterior} className="absolute left-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:grid">
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button type="button" onClick={() => passar(1)} aria-label={STRINGS.galeria.seguinte} className="absolute right-3 top-1/2 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:grid">
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            ) : null}
          </div>
          <p className="px-5 pb-8 pt-4 text-center text-sm text-white/75 sm:px-8">{foto.alt}</p>
        </div>
      ) : null}
    </section>
  )
}

/* ----------------------------------------------------------------
   9. Zona e horário
---------------------------------------------------------------- */
// A semana inteira com o dia de hoje marcado, e onde fica ou onde trabalha.
// O mapa é uma ligação e não um `iframe`: um mapa embebido pesa mais do que a
// página toda e rastreia quem a abre. Sem horário fica só o cartão da zona;
// sem horário nem zona, a secção não existe.
function Zona() {
  const { BRAND, STRINGS } = useSite()
  const semana = lerSemana(BRAND.horario)
  const [hoje, setHoje] = useState(null)
  useEffect(() => { if (semana) setHoje(agoraNoFuso(BRAND.fuso).dia) }, [])

  if (!semana && !BRAND.city && !BRAND.morada) return null
  const Z = STRINGS.zona
  const H = STRINGS.horas

  return (
    <section id="zona" className="relative py-20 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="b-revela max-w-2xl">
          <Sobrancelha>{semana ? Z.horarioEZona : Z.zona}</Sobrancelha>
          <Titulo className="mt-5" a={BRAND.morada ? Z.onde : Z.ondeTrabalhamos} b={semana ? Z.quando : ''} />
        </div>

        <div className={`mt-12 grid gap-4 ${semana ? 'lg:grid-cols-[1.15fr_1fr]' : 'lg:max-w-2xl'}`}>
          {semana ? (
            <div className="b-revela rounded-[2rem] bg-white p-6 ring-1 ring-black/5 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <p className="b-t2 font-mono text-[11px] uppercase tracking-[0.18em]">{Z.horario}</p>
                <EstadoAgora semana={semana} />
              </div>
              <dl className="mt-6 space-y-1">
                {ORDEM.map((d) => {
                  const eHoje = d === hoje
                  return (
                    <div
                      key={d}
                      className={`flex items-center justify-between gap-4 rounded-xl px-3 py-2.5 text-[15px] transition-colors duration-500 ${
                        eHoje ? 'bg-ink text-white' : ''
                      }`}
                    >
                      <dt className={`flex items-center gap-2 font-medium ${eHoje ? '' : 'text-ink'}`}>
                        {H.inteiro[d]}
                        {eHoje ? (
                          <span className="rounded-full bg-white/15 px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-white">{Z.hoje}</span>
                        ) : null}
                      </dt>
                      <dd className={`text-right tabular-nums ${eHoje ? 'text-white/85' : 'b-t2'}`}>
                        {semana[d] ? horasEmTexto(semana[d], H) : H.fechado}
                      </dd>
                    </div>
                  )
                })}
              </dl>
            </div>
          ) : null}

          <div className="b-revela b-escuro relative flex min-h-[20rem] flex-col justify-between overflow-hidden rounded-[2rem] bg-deep p-6 text-white sm:p-8" style={{ '--i': 1 }}>
            {/* Um padrão de ruas, só decoração: o mapa verdadeiro é o do Google. */}
            <svg aria-hidden="true" className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.14]" preserveAspectRatio="none" viewBox="0 0 400 300">
              <g fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M-10 60 C 80 40, 160 90, 260 70 S 380 40, 420 60" />
                <path d="M-10 170 C 90 150, 180 200, 280 175 S 380 150, 420 170" />
                <path d="M-10 250 C 70 240, 170 270, 270 245 S 380 230, 420 250" />
                <path d="M70 -10 C 60 80, 110 160, 90 310" />
                <path d="M200 -10 C 215 90, 180 190, 210 310" />
                <path d="M320 -10 C 300 70, 345 170, 330 310" />
              </g>
            </svg>
            <span aria-hidden="true" className="pointer-events-none absolute right-10 top-10 grid h-16 w-16 place-items-center">
              <span className="absolute inset-0 rounded-full bg-primary/25 motion-safe:animate-ping" />
              <span className="relative grid h-10 w-10 place-items-center rounded-full bg-primary text-white shadow-lg">
                <MapPin className="h-5 w-5" strokeWidth={2.4} />
              </span>
            </span>

            <div className="relative">
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/70">{BRAND.morada ? Z.morada : Z.zona}</p>
              {BRAND.city ? (
                <p className="mt-4 max-w-[80%] font-display text-[clamp(2.25rem,1.6rem+2.4vw,3.5rem)] font-bold leading-none tracking-[-0.03em]">
                  {BRAND.city}
                </p>
              ) : null}
              {BRAND.region ? <p className="mt-3 max-w-sm text-[15px] text-white/75">{BRAND.region}</p> : null}
              {BRAND.morada ? <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-white/85">{BRAND.morada}</p> : null}
            </div>

            {BRAND.maps ? (
              <a
                href={BRAND.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="b-botao relative mt-10 inline-flex items-center gap-2 self-start rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink"
              >
                {Z.abrirMaps} <ArrowUpRight className="h-4 w-4" strokeWidth={2.2} />
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   11. Perguntas frequentes
---------------------------------------------------------------- */
// Só com perguntas do próprio negócio, como em A. Um acordeão a sério: botão
// com `aria-expanded`, e a resposta fechada sai da leitura e do Tab (`inert`).
// A altura anima pela grelha (0fr para 1fr), sem medir nada em JS.
function Faq() {
  const { FAQ, COPY, STRINGS } = useSite()
  const [aberta, setAberta] = useState(0)
  if (!FAQ?.length) return null

  return (
    <section id="perguntas" className="relative py-20 sm:py-28 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:px-12">
        <div className="b-revela lg:col-span-4">
          <Sobrancelha>{STRINGS.faq.eyebrow}</Sobrancelha>
          <Titulo className="mt-5" a={COPY.faq?.titleA ?? STRINGS.faq.titleA} b={COPY.faq?.titleB ?? STRINGS.faq.titleB} />
        </div>
        <ul className="b-revela divide-y divide-black/10 border-y border-black/10 lg:col-span-8" style={{ '--i': 1 }}>
          {FAQ.map((f, i) => {
            const sim = aberta === i
            return (
              <li key={f.pergunta}>
                <h3>
                  <button
                    id={`b-faq-p${i}`}
                    type="button"
                    aria-expanded={sim}
                    aria-controls={`b-faq-r${i}`}
                    onClick={() => setAberta(sim ? null : i)}
                    className="group flex w-full items-center justify-between gap-6 py-6 text-left"
                  >
                    <span className="font-display text-lg font-semibold leading-snug text-ink sm:text-xl">{semTravessao(f.pergunta)}</span>
                    <span
                      aria-hidden="true"
                      className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ring-1 transition-all duration-300 ${
                        sim ? 'rotate-45 bg-ink text-white ring-ink' : 'text-ink ring-black/15 group-hover:ring-black/40'
                      }`}
                    >
                      <Plus className="h-4 w-4" strokeWidth={2.2} />
                    </span>
                  </button>
                </h3>
                <div
                  id={`b-faq-r${i}`}
                  role="region"
                  aria-labelledby={`b-faq-p${i}`}
                  inert={!sim}
                  className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(.2,.7,.2,1)]"
                  style={{ gridTemplateRows: sim ? '1fr' : '0fr' }}
                >
                  <div className="overflow-hidden">
                    <p className="b-t2 max-w-2xl pb-7 pr-14 text-[1.0625rem] leading-relaxed">{semTravessao(f.resposta)}</p>
                  </div>
                </div>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   5. Contacto
---------------------------------------------------------------- */
function Campo({ id, label, tipo = 'text', nome, obrigatorio = false, autoComplete }) {
  const { STRINGS } = useSite()
  return (
    <div className="relative">
      <input
        id={id}
        type={tipo}
        name={nome}
        required={obrigatorio}
        autoComplete={autoComplete}
        placeholder=" "
        className="b-campo peer block w-full rounded-2xl border border-[#E3DCCF] bg-[#FBFAF7] px-4 pb-2.5 pt-6 text-[15px] text-ink"
      />
      <label
        htmlFor={id}
        className="b-t2 pointer-events-none absolute left-4 top-2 font-mono text-[11px] uppercase tracking-[0.14em] transition-all duration-200 peer-placeholder-shown:top-[1.05rem] peer-placeholder-shown:text-[14px] peer-placeholder-shown:normal-case peer-placeholder-shown:tracking-normal peer-placeholder-shown:font-body peer-focus:top-2 peer-focus:font-mono peer-focus:text-[11px] peer-focus:uppercase peer-focus:tracking-[0.14em]"
      >
        {label}
        {obrigatorio ? '' : STRINGS.contacto.opcional}
      </label>
    </div>
  )
}

function Contacto({ escolhido, escolher }) {
  const { BRAND, SERVICES, COPY, SERVICO, STRINGS } = useSite()
  const [estado, setEstado] = useState('idle')
  const semana = lerSemana(BRAND.horario)
  const C = STRINGS.contacto

  // Envia mesmo, como em A. O serviço escolhido nos chips entra à cabeça da
  // mensagem: a rota não conhece outro campo, e assim chega na mesma a quem lê.
  const enviar = async (e) => {
    e.preventDefault()
    setEstado('sending')
    const dados = new FormData(e.currentTarget)
    dados.set('caminho', SERVICO.site || window.location.pathname.replace(/\/$/, ''))
    if (escolhido) dados.set('mensagem', `${C.servico}: ${escolhido}\n\n${dados.get('mensagem') ?? ''}`.trim())
    try {
      const r = await fetch(`${SERVICO.api}/api/contacto`, { method: 'POST', body: dados })
      setEstado(r.ok ? 'sent' : 'erro')
    } catch {
      setEstado('erro')
    }
  }

  const whats = Boolean(BRAND.whatsapp)
  const zona = [BRAND.city, BRAND.region].filter(Boolean).join(', ')
  // Dado ausente tira a linha inteira: nunca "mailto:null" nem "Lisboa, ".
  const diretos = [
    {
      icone: <Phone className="h-4 w-4" strokeWidth={2.2} />,
      rotulo: BRAND.phoneKind === 'fixo' ? C.telefone : C.telemovel,
      valor: BRAND.phoneDisplay,
      nota: BRAND.phoneNote,
      href: `tel:${BRAND.phoneTel}`,
      tipo: 'cta_click',
    },
    whats && {
      icone: <IconeWhatsApp className="h-4 w-4" />,
      rotulo: 'WhatsApp',
      valor: C.enviarMensagem,
      href: `https://wa.me/${BRAND.whatsapp}?text=${encodeURIComponent(BRAND.whatsappMsg)}`,
      tipo: 'whatsapp_click',
    },
    BRAND.sms && {
      icone: <MessageSquare className="h-4 w-4" strokeWidth={2.2} />,
      rotulo: STRINGS.mensagem,
      valor: C.enviarMensagem,
      href: `sms:${BRAND.sms}`,
      tipo: 'telefone_click',
    },
    BRAND.email && {
      icone: <Mail className="h-4 w-4" strokeWidth={2.2} />,
      rotulo: C.email,
      valor: BRAND.email,
      href: `mailto:${BRAND.email}`,
    },
    (BRAND.morada || zona) && BRAND.maps && {
      icone: <MapPin className="h-4 w-4" strokeWidth={2.2} />,
      rotulo: BRAND.morada ? STRINGS.zona.morada : STRINGS.zona.zona,
      valor: BRAND.morada || zona,
      href: BRAND.maps,
    },
  ].filter((c) => c && c.valor && c.href)

  return (
    <section id="contactos" className="b-papel-2 relative py-20 sm:py-28 lg:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16 lg:px-12">
        <div className="lg:col-span-5">
          <div className="b-revela">
            <Sobrancelha>{C.eyebrow}</Sobrancelha>
            <Titulo className="mt-5" a={COPY.contact.titleA} b={COPY.contact.titleB} />
            <p className="b-t2 mt-6 max-w-md text-[1.0625rem] leading-relaxed">{semTravessao(COPY.contact.sub)}</p>
          </div>

          <ul className="mt-10 space-y-2.5">
            {diretos.map((c, i) => (
              <li key={c.rotulo} className="b-revela" style={{ '--i': i }}>
                <a
                  href={c.href}
                  onClick={c.tipo ? () => registarClique(c.tipo, SERVICO) : undefined}
                  {...(c.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  className="group flex items-center gap-4 rounded-2xl bg-white/70 p-4 ring-1 ring-black/5 transition-colors hover:bg-white"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-ink text-white">{c.icone}</span>
                  {/* Base zero e quebra em qualquer sítio: um email comprido não empurra a
                      coluna para lá dos 375 px, e a morada lê-se inteira. */}
                  <span className="w-0 min-w-0 flex-1">
                    <span className="b-t2 block font-mono text-[11px] uppercase tracking-[0.16em]">{c.rotulo}</span>
                    <span className="block font-display text-[17px] font-semibold leading-snug text-ink [overflow-wrap:anywhere]">{c.valor}</span>
                    {c.nota ? <span className="b-t2 mt-0.5 block text-xs">{c.nota}</span> : null}
                  </span>
                  <ArrowUpRight className="h-4 w-4 shrink-0 text-ink/40 transition-all duration-300 group-hover:rotate-45 group-hover:text-ink" />
                </a>
              </li>
            ))}
          </ul>

          {semana ? (
            <div className="b-revela mt-8 flex flex-wrap items-center gap-3">
              <EstadoAgora semana={semana} />
            </div>
          ) : null}
        </div>

        <div className="lg:col-span-7">
          <div className="b-revela rounded-[2rem] bg-white p-6 shadow-[0_30px_60px_-30px_rgba(15,20,25,.35)] ring-1 ring-black/5 sm:p-10">
            {estado === 'sent' ? (
              <div className="b-surge flex flex-col items-center py-14 text-center" role="status">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-ink text-white">
                  <svg viewBox="0 0 24 24" className="h-8 w-8" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path className="b-traco" d="M5 12.5l4.5 4.5L19 7.5" />
                  </svg>
                </span>
                <h3 className="mt-6 font-display text-2xl font-bold">{C.enviado}</h3>
                <p className="b-t2 mt-3 max-w-sm text-[15px]">
                  {C.confirmacao} {BRAND.phoneDisplay}{BRAND.phoneNote ? ' ' : null}<CustoChamada entreParenteses className="b-t2" />.
                </p>
                <button
                  type="button"
                  onClick={() => setEstado('idle')}
                  className="b-sub mt-8 font-mono text-[11px] uppercase tracking-[0.18em] text-ink"
                >
                  {C.outro}
                </button>
              </div>
            ) : (
              <form onSubmit={enviar} className="space-y-5">
                <fieldset>
                  <legend className="b-t2 font-mono text-[11px] uppercase tracking-[0.16em]">
                    {ehMarcacao(COPY.heroCta) ? C.queMarcar : C.doQuePrecisa}
                  </legend>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {SERVICES.map((s) => {
                      const ativo = escolhido === s.title
                      return (
                        <button
                          key={s.title}
                          type="button"
                          aria-pressed={ativo}
                          onClick={() => escolher(ativo ? '' : s.title)}
                          className={`b-chip inline-flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-medium ${
                            ativo ? 'border-ink bg-ink text-white' : 'border-[#E3DCCF] bg-[#FBFAF7] text-ink hover:border-ink/40'
                          }`}
                        >
                          {ativo ? <Check className="h-3.5 w-3.5 text-primary-light" strokeWidth={3} /> : null}
                          {s.title}
                        </button>
                      )
                    })}
                  </div>
                </fieldset>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Campo id="b-nome" nome="nome" label={C.nome} obrigatorio autoComplete="name" />
                  <Campo id="b-email" nome="email" tipo="email" label={C.email} obrigatorio autoComplete="email" />
                </div>
                <Campo id="b-telefone" nome="telefone" tipo="tel" label={C.telemovel} autoComplete="tel" />
                <div>
                  <label htmlFor="b-mensagem" className="b-t2 font-mono text-[11px] uppercase tracking-[0.16em]">
                    {COPY.contact.fieldLabel}
                  </label>
                  <textarea
                    id="b-mensagem"
                    name="mensagem"
                    rows={4}
                    placeholder={semTravessao(COPY.contact.fieldPlaceholder)}
                    className="b-campo mt-2 block w-full rounded-2xl border border-[#E3DCCF] bg-[#FBFAF7] px-4 py-3 text-[15px] text-ink placeholder:text-[#6F685D]"
                  />
                </div>

                {/* Invisível para quem preenche; se vier com texto é um robô. */}
                <input type="text" name="empresa" tabIndex={-1} autoComplete="off" aria-hidden="true" className="absolute -z-10 h-0 w-0 opacity-0" />

                {estado === 'erro' ? (
                  <p role="alert" className="b-surge flex items-start gap-2.5 rounded-2xl bg-amber-50 px-4 py-3 text-sm text-ink ring-1 ring-amber-200">
                    <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-700" />
                    <span>{C.erro} {BRAND.phoneDisplay}{BRAND.phoneNote ? ' ' : null}<CustoChamada entreParenteses className="b-t2" />.</span>
                  </p>
                ) : null}

                <div className="flex flex-col-reverse items-start gap-4 pt-1 sm:flex-row sm:items-center sm:justify-between">
                  <p className="b-t2 max-w-xs text-xs leading-relaxed">
                    {C.privacidade}
                  </p>
                  <button
                    type="submit"
                    disabled={estado === 'sending'}
                    className="b-botao group inline-flex shrink-0 items-center gap-3 rounded-full bg-ink py-2 pl-6 pr-2 text-[15px] font-semibold text-white disabled:opacity-70"
                  >
                    {estado === 'sending' ? C.aEnviar : C.enviar}
                    <span aria-hidden="true" className="b-seta grid h-10 w-10 place-items-center rounded-full bg-primary text-white">
                      {estado === 'sending' ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowUpRight className="h-4 w-4" strokeWidth={2.4} />}
                    </span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ----------------------------------------------------------------
   Redes sociais
---------------------------------------------------------------- */
const REDES_SOCIAIS = {
  instagram: { nome: 'Instagram', d: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
  facebook: { nome: 'Facebook', d: 'M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z' },
  tiktok: { nome: 'TikTok', d: 'M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z' },
  youtube: { nome: 'YouTube', d: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' },
  linkedin: { nome: 'LinkedIn', d: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
  twitter: { nome: 'X', d: 'M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z' },
}

// Só as redes que o negócio tem mesmo. Sem nenhuma, o bloco não existe.
function Sociais() {
  const { BRAND, STRINGS } = useSite()
  const redes = Object.entries(REDES_SOCIAIS)
    .map(([chave, rede]) => [rede, BRAND.sociais?.[chave]])
    .filter(([, url]) => typeof url === 'string' && url.startsWith('http'))
  if (!redes.length) return null
  return (
    <div className="mt-6 flex flex-wrap gap-2">
      {redes.map(([rede, url]) => (
        <a
          key={rede.nome}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={STRINGS.redeSocial(BRAND.name, rede.nome)}
          className="grid h-10 w-10 place-items-center rounded-full border border-white/15 text-white/75 transition-colors hover:border-white/50 hover:text-white"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4" aria-hidden="true">
            <path d={rede.d} />
          </svg>
        </a>
      ))}
    </div>
  )
}

/* ----------------------------------------------------------------
   Rodapé
---------------------------------------------------------------- */
// O rodapé de A, trazido para B a pedido do André. Muda o mínimo: as ligações
// apontam às secções que B tem, o horário sai (a página já o mostra, e o
// texto de A trazia travessões), e os cinzentos mais claros sobem a 60% para
// passar o AA.
function Footer() {
  const { BRAND, SERVICES, STEPS, REVIEWS, COPY, SERVICO, STRINGS, basePath } = useSite()
  const R = STRINGS.rodape
  const empresa = [
    ...(STEPS?.length ? [{ label: STRINGS.nav.processo, href: '#processo' }] : []),
    ...(REVIEWS.length ? [{ label: STRINGS.nav.avaliacoes, href: '#avaliacoes' }] : []),
    { label: STRINGS.nav.contactos, href: '#contactos' },
    { label: R.verMaps, href: BRAND.maps },
  ].filter((x) => x.href)
  const zona = [BRAND.city, BRAND.region].filter(Boolean).join(', ')

  return (
    <footer id="rodape" className="b-escuro bg-deep pb-10 pt-20 text-white">
      <div className="mx-auto max-w-7xl px-6 sm:px-10 lg:px-16">
        <div className="grid gap-12 lg:grid-cols-6">
          <div className="flex flex-col gap-3 text-lg lg:col-span-2">
            <div className="flex items-center gap-2">
              <Marca escuro altura="h-16" />
              <span className={`font-display text-2xl font-bold ${BRAND.logo ? 'sr-only' : ''}`}>{BRAND.name}</span>
            </div>
            {BRAND.tagline ? <p className="max-w-xs font-serif italic text-white/70">{semTravessao(BRAND.tagline)}</p> : null}
            {COPY.footerStatus ? (
              <div className="mt-2 flex items-center gap-2">
                <span className="relative h-2 w-2 rounded-full bg-emerald-500">
                  <span className="absolute inset-0 rounded-full bg-emerald-500 opacity-75 motion-safe:animate-ping" />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/60">{semTravessao(COPY.footerStatus)}</span>
              </div>
            ) : null}
            <Sociais />
          </div>

          <div>
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">{R.servicos}</p>
            <ul className="space-y-2.5">
              {SERVICES.map((s) => (
                <li key={s.title}>
                  <a href="#servicos" className="text-sm text-white/70 transition-colors hover:text-primary-light">
                    {s.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">{R.empresa}</p>
            <ul className="space-y-2.5">
              {empresa.map((x) => (
                <li key={x.label}>
                  <a
                    href={x.href}
                    {...(x.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                    className="text-sm text-white/70 transition-colors hover:text-primary-light"
                  >
                    {x.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/60">{R.contactos}</p>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li>
                <a href={`tel:${BRAND.phoneTel}`} onClick={() => registarClique('cta_click', SERVICO)} className="transition-colors hover:text-primary-light">
                  {BRAND.phoneDisplay}
                </a>
                {BRAND.phoneNote ? <span className="block text-[11px] text-white/60">{BRAND.phoneNote}</span> : null}
              </li>
              {BRAND.email ? (
                <li className="break-all">
                  <a href={`mailto:${BRAND.email}`} className="transition-colors hover:text-primary-light">
                    {BRAND.email}
                  </a>
                </li>
              ) : null}
              {zona ? <li>{zona}</li> : null}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 sm:flex-row">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/60">
            © {new Date().getFullYear()} {BRAND.name}. {R.direitos}
          </p>
          <div className="flex items-center gap-6">
            <Link href={`${basePath}/privacidade`} className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/60 transition-colors hover:text-primary-light">
              {R.privacidade}
            </Link>
            <Link href={`${basePath}/termos`} className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/60 transition-colors hover:text-primary-light">
              {R.termos}
            </Link>
            {R.credito ? (
              <a
                href={R.credito.href}
                target="_blank"
                rel="noopener"
                className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/60 transition-colors hover:text-primary-light"
              >
                {R.credito.texto}
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ----------------------------------------------------------------
   12. Polimento
---------------------------------------------------------------- */
// Os títulos de secção sobem palavra a palavra quando entram no ecrã. Só os
// que ainda estão abaixo da dobra quando o GSAP chega: um título que já se lê
// não se apaga para voltar a aparecer. No fim o texto volta a ser só texto.
function useTitulos(ref) {
  useAnimacao((mm, { gsap, SplitText }) => {
    mm.add('(min-width: 0px)', () => {
      const partidos = []
      ref.current.querySelectorAll('.b-titulo').forEach((h) => {
        if (h.getBoundingClientRect().top < window.innerHeight) return
        // O contentor já não precisa de aparecer por si: aparecem as palavras.
        h.closest('.b-revela')?.classList.add('b-visto')
        const partido = SplitText.create(h, { type: 'words', aria: 'auto' })
        partidos.push(partido)
        gsap.from(partido.words, {
          yPercent: 70,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          stagger: 0.06,
          scrollTrigger: { trigger: h, start: 'top 85%', once: true },
          onComplete: () => partido.revert(),
        })
      })
      return () => partidos.forEach((p) => p.revert())
    })
  }, ref)
}

// O botão principal puxa um pouco para o cursor. Só com rato e com movimento:
// num ecrã tátil não há cursor para seguir.
function useMagnetico(ref) {
  useEffect(() => {
    if (semMovimento() || !window.matchMedia('(pointer: fine)').matches) return
    const botoes = [...ref.current.querySelectorAll('.b-magnetico')]
    const mover = (e) => {
      const b = e.currentTarget
      const r = b.getBoundingClientRect()
      const x = (e.clientX - r.left - r.width / 2) * 0.18
      const y = (e.clientY - r.top - r.height / 2) * 0.3
      b.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px)`
    }
    const largar = (e) => { e.currentTarget.style.transform = '' }
    botoes.forEach((b) => { b.addEventListener('pointermove', mover); b.addEventListener('pointerleave', largar) })
    return () => botoes.forEach((b) => { b.removeEventListener('pointermove', mover); b.removeEventListener('pointerleave', largar) })
  }, [])
}

// Quanto já se leu, numa linha fina colada à barra da demo. É resposta ao
// scroll e não animação, por isso fica também com movimento reduzido.
function BarraLeitura() {
  const ref = useRef(null)
  useEffect(() => {
    let raf = 0
    const medir = () => {
      raf = 0
      const total = document.documentElement.scrollHeight - window.innerHeight
      if (ref.current) ref.current.style.transform = `scaleX(${total > 0 ? Math.min(1, window.scrollY / total) : 0})`
    }
    const pedir = () => { if (!raf) raf = requestAnimationFrame(medir) }
    medir()
    window.addEventListener('scroll', pedir, { passive: true })
    window.addEventListener('resize', pedir)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', pedir)
      window.removeEventListener('resize', pedir)
    }
  }, [])
  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 z-[55] h-[3px] origin-left bg-primary"
      style={{ top: 'var(--barra-demo, 0px)', transform: 'scaleX(0)' }}
    />
  )
}

/* ----------------------------------------------------------------
   Revelar ao descer
---------------------------------------------------------------- */
// Um só observador para a página toda. A classe que esconde (`b-anim`) só entra
// depois de o JS correr, e nunca com movimento reduzido: sem JS, ou antes dele,
// está tudo à vista.
function useRevelar(ref) {
  useEffect(() => {
    const raiz = ref.current
    if (!raiz || semMovimento()) return
    raiz.classList.add('b-anim')
    const io = new IntersectionObserver(
      (entradas) =>
        entradas.forEach((e) => {
          if (!e.isIntersecting) return
          e.target.classList.add('b-visto')
          io.unobserve(e.target)
        }),
      { rootMargin: '0px 0px -8% 0px' }
    )
    raiz.querySelectorAll('.b-revela, .b-mascara').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

/* ----------------------------------------------------------------
   App
---------------------------------------------------------------- */
function ArvoreDoSite() {
  const raiz = useRef(null)
  const [escolhido, setEscolhido] = useState('')
  useRevelar(raiz)
  useTitulos(raiz)
  useMagnetico(raiz)

  // A letra definitiva chega depois do primeiro pintar e muda a altura dos
  // blocos; as posições que o ScrollTrigger guardou deixavam de bater certo.
  useEffect(() => {
    if (semMovimento()) return
    let saiu = false
    const parar = depoisDoLoad(() => {
      Promise.all([carregarGsap(), document.fonts?.ready]).then(([{ ScrollTrigger }]) => {
        if (!saiu) ScrollTrigger.refresh()
      })
    })
    return () => { saiu = true; parar() }
  }, [])

  // "Pedir orçamento para isto": escolhe o serviço no formulário e desce até
  // lá. O chip que acende é a confirmação.
  const pedir = (titulo) => {
    setEscolhido(titulo)
    document.getElementById('contactos')?.scrollIntoView({ behavior: semMovimento() ? 'auto' : 'smooth' })
  }

  return (
    <div ref={raiz} className="site-b b-papel relative text-ink">
      <style>{ESTILO_B}</style>
      <Desenhos />
      <BarraLeitura />
      <Cabecalho />
      <main>
        <Heroi />
        <Servicos onPedir={pedir} />
        <ProvaSocial />
        <Processo />
        <Galeria />
        <Zona />
        <Faq />
        <Contacto escolhido={escolhido} escolher={setEscolhido} />
      </main>
      <RodapeZonas />
      <Footer />
      <ContactoFlutuante />
    </div>
  )
}

export default function SiteB({ tema, lead, enrich, cliente, local, servico, basePath, zonas }) {
  return (
    <SiteProvider tema={tema} lead={lead} enrich={enrich} cliente={cliente}
                  local={local} servico={servico} basePath={basePath} zonas={zonas}>
      <ArvoreDoSite />
    </SiteProvider>
  )
}
