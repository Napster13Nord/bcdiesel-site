'use client'
// Onde a lead real e o enriquecimento substituem o que era inventado.
// Mapeamento da secção 6 do PLANO.md. Nada aqui inventa: o que não vier do CSV
// nem do Apify ou é genérico do nicho ou desaparece.
import { createContext, useContext, useMemo } from 'react'
import { icone } from './icones'
import { mostrarProvaGoogle } from '../../lib/tema'
import { telefone } from '../../lib/telefone'
import { textos } from './textos'

const Ctx = createContext(null)

export const useSite = () => {
  const v = useContext(Ctx)
  if (!v) throw new Error('useSite fora de <SiteProvider>')
  return v
}

// 4.8 -> "4,8"  (vírgula decimal em português)
const virgula = (n) => (n == null ? '' : String(Number(n).toFixed(1)).replace('.', ','))

// O Apify devolve {seg:"08:00 – 20:00", …}; o template mostra uma linha de texto.
// Agrupa dias seguidos com o mesmo horário: "Seg a Sex 08:00 – 20:00 · Sáb 09:00 – 13:00".
const ORDEM = ['seg', 'ter', 'qua', 'qui', 'sex', 'sab', 'dom']
const ROTULO = { seg: 'Seg', ter: 'Ter', qua: 'Qua', qui: 'Qui', sex: 'Sex', sab: 'Sáb', dom: 'Dom' }

export function horarioEmTexto(horario) {
  if (!horario || typeof horario !== 'object') return null
  const dias = ORDEM.filter((d) => horario[d])
  if (!dias.length) return null

  const blocos = []
  for (const d of dias) {
    const ultimo = blocos[blocos.length - 1]
    const seguido = ultimo && ORDEM.indexOf(d) === ORDEM.indexOf(ultimo.fim) + 1
    if (seguido && ultimo.horas === horario[d]) ultimo.fim = d
    else blocos.push({ ini: d, fim: d, horas: horario[d] })
  }

  return blocos
    .filter((b) => !/^encerrado$/i.test(b.horas))
    .map((b) => `${b.ini === b.fim ? ROTULO[b.ini] : `${ROTULO[b.ini]} a ${ROTULO[b.fim]}`} ${b.horas}`)
    .join(' · ') || null
}

// "Eletricidade e Gás" -> "Eletricidade e Gás" (2 primeiras palavras)
const nomeCurto = (nome) => {
  const p = String(nome || '').split(/\s+/).filter(Boolean)
  return p.length <= 2 ? nome : p.slice(0, 2).join(' ')
}

export function construirBrand(tema, lead, enrich, local = null, cliente = null) {
  // A língua e o país da lead (PLANO-EUA.md). Sem eles é Portugal, como sempre.
  const en = lead.idioma === 'en'
  const pais = lead.pais ?? 'pt'
  const tel = telefone(lead.telefone, pais)
  // Onde o número diz se é telemóvel (Austrália), vale o número.
  const telemovel = tel.movel ?? lead.tipo_telefone === 'telemovel'
  // A mensagem que lá se usa (PLANO-UK-AU-CA.md, pedido do André): WhatsApp em
  // Portugal e no Reino Unido; SMS nos EUA, no Canadá e na Austrália.
  const porSms = pais === 'us' || pais === 'ca' || pais === 'au'
  // "davidsolutions.pt", sem esquema nem www. Vazio numa proposta, que não tem domínio.
  const dominio = String(cliente?.dominio ?? '').replace(/^https?:\/\/(www\.)?/, '').replace(/\/$/, '')
  // O mesmo `tema.provaGoogle` que dispensa o corte nos pilares e nos sinais de
  // confiança. Tem de valer aqui também: o corte é espelhado de propósito, para
  // a página não mostrar a nota no herói e escondê-la mais abaixo.
  const prova = tema.provaGoogle === true || mostrarProvaGoogle(lead.nota, lead.reviews)
  // Morada real ou nada. Só ~25% das leads a têm; sem rua não se inventa uma.
  // "Rua X 12, 1000-000 Lisboa" em Portugal; "123 Main St, Franklin, TN 37064"
  // nos EUA e no Canadá, onde o `lib/mapear.js` já guarda o estado junto da cidade;
  // "12 George St, Parramatta NSW 2150" na Austrália. Fora de Portugal o código
  // postal vai sempre no fim.
  const morada = local?.morada
    ? [local.morada, (pais === 'pt' ? [local.codigoPostal, local.localidade] : [local.localidade, local.codigoPostal])
        .filter(Boolean).join(' ')]
        .filter(Boolean).join(', ')
    : null
  return {
    // O país da lead: as páginas legais em inglês dizem a lei de cada um.
    pais,
    morada,
    // Logótipo do próprio negócio, quando ele o dá. Sem ele o site usa o ícone
    // do nicho — nunca se inventa uma marca.
    logo: tema.logo ?? null,
    // A versão para fundo escuro: o cabeçalho é transparente sobre o herói até
    // o visitante rolar, e um logótipo escuro não se via lá. Sem ela a `Marca`
    // usa a normal nos dois sítios.
    logoEscuro: tema.logoEscuro ?? null,
    // Um logótipo alto (símbolo por cima do nome) lia-se a 7 px na altura
    // normal; com isto o cabeçalho dá-lhe mais altura.
    logoAlto: Boolean(tema.logoAlto),
    website: local?.website ?? null,
    sociais: local?.sociais ?? {},
    // O campo de código postal do formulário mostrava literalmente "undefined":
    // era usado no template e nunca definido aqui.
    postalPlaceholder: local?.codigoPostal ?? '1000-000',
    // Até três fotografias de quem avaliou mesmo, para o badge do Google. Sem
    // reviews com foto fica vazio e o template usa os avatares de fallback.
    avatars: (enrich?.reviews ?? []).map((r) => r.avatar).filter(Boolean).slice(0, 3),
    name: lead.nome_negocio,
    // Como a lead pediu para ser chamada numa ronda de alterações. As duas
    // primeiras palavras do Maps davam "CHAVES DAVID" a quem é "DAVID SOLUTIONS".
    short: tema.nomeCurto ?? nomeCurto(lead.nome_negocio),
    tagline: tema.copy?.tagline ?? '',
    phoneDisplay: tel.visivel,
    phoneTel: tel.ligar,
    phoneKind: lead.tipo_telefone,
    // Obrigatório em Portugal ao publicar um número de contacto: o consumidor
    // tem de saber o que a chamada lhe custa antes de marcar (DL 59/2021).
    // Só quando se sabe a rede. Umas poucas leads têm `tipo_telefone` 'outro' e
    // aí não se afirma um custo que não se conhece.
    // A lei é portuguesa: um número dos EUA não leva nota nenhuma.
    phoneNote: pais !== 'pt' ? null
             : telemovel ? 'Chamada para a rede móvel nacional'
             : lead.tipo_telefone === 'fixo' ? 'Chamada para a rede fixa nacional'
             : null,
    // telemóvel -> WhatsApp; fixo -> chamada (o botão flutuante decide por isto)
    whatsapp: telemovel && !porSms ? (pais === 'pt' ? String(lead.telefone || '') : tel.ligar).replace(/[^0-9]/g, '') : null,
    // telemóvel onde se usa SMS -> "Text us", ao lado de "Call"
    sms: telemovel && porSms ? tel.ligar : null,
    // Nos projetos Vite esta frase é escrita à mão por nicho; aqui uma app serve
    // centenas de leads, por isso constrói-se com o nome real do negócio. Sem
    // isto o link do WhatsApp saía com "?text=undefined".
    //
    // Num site vendido diz o domínio: o nome do Maps vinha em maiúsculas e
    // comprido ("vim pelo site da CHAVES DAVID SOLUTIONS"), e o artigo nem
    // sempre batia certo.
    dominio,
    whatsappMsg: en
      ? `Hi, I found your website${dominio ? ` ${dominio}` : ''} and would like some information.`
      : dominio
      ? `Olá, vim pelo site ${dominio} e queria pedir informações.`
      : `Olá, vim pelo site da ${lead.nome_negocio} e queria pedir informações.`,
    city: lead.concelho ?? '',
    region: lead.freguesia ?? '',
    // O badge do herói e a linha das estrelas dependem de `ratingValue`. Abaixo
    // do limiar fica a zero e as duas desaparecem — o mesmo corte que o
    // `temaComDadosDaLead` faz aos pilares, para a página não dizer uma coisa
    // num sítio e outra no outro.
    // Ponto decimal em inglês: "4.8".
    rating: prova ? (en ? Number(lead.nota).toFixed(1) : virgula(lead.nota)) : '',
    ratingValue: prova ? Number(lead.nota) : 0,
    reviews: lead.reviews ?? 0,
    maps: lead.maps_url,
    // Reais ou ausentes — nunca inventados.
    email: enrich?.email ?? null,
    hours: horarioEmTexto(enrich?.horario),
    // O horário por dia, como está guardado ({seg:'08:00 – 20:00', …}). A versão
    // B lê daqui o estado "aberto agora" e a tabela da semana, e escreve-os na
    // língua da lead; o texto acima é o de A, que é só português.
    horario: enrich?.horario ?? null,
    // O fuso do "aberto agora". Em Portugal é o de Lisboa, seja onde for que se
    // abra a página. Nos EUA há quatro e a lead não diz em qual está: vale o de
    // quem abre, que é o dono ou um cliente da mesma terra.
    fuso: (lead.pais ?? 'pt') === 'pt' ? 'Europe/Lisbon' : undefined,
  }
}

// Os temas referem os ícones por nome, e o template espera-os nas chaves
// ParticleIcon / Icon (maiúsculas). A resolução vive em ./icones.js, que é
// gerado com importações nomeadas: um `import * as` do lucide-react punha o
// pacote inteiro no browser.
const comIcones = (lista) => (lista ?? []).map((x) => ({ ...x, icon: icone(x.icon) }))

// Onde o formulário e o registo de cliques batem. No motor é a própria origem;
// num site ejetado o `ejetar.mjs` escreve aqui o endereço do serviço partilhado
// e desliga o rastreio.
const SERVICO_LOCAL = { api: '', site: '', rastrear: true };

export function SiteProvider({ tema, lead, enrich, cliente = null, local = null,
                               servico = SERVICO_LOCAL, basePath = '', zonas = null,
                               children }) {
  const valor = useMemo(() => {
    const reviews = Array.isArray(enrich?.reviews) ? enrich.reviews : []
    return {
      basePath,
      BRAND: construirBrand(tema, lead, enrich, local, cliente),
      NAV_LINKS: tema.nav,
      SERVICES: comIcones(tema.services),
      HERO: { ...tema.hero, ParticleIcon: icone(tema.heroParticleIcon) },
      FEATURES: tema.features,
      SHUFFLER: tema.shuffler,
      SCHEDULER: tema.scheduler,
      // Os temas em inglês não trazem a assinatura: só A a mostra.
      SIGNATURE: {
        ...tema.signature,
        header: { ...tema.signature?.header, Icon: icone(tema.signature?.header?.icon) },
      },
      PILLARS: tema.pillars,
      STEPS: tema.steps,
      TRUST: comIcones(tema.trust),
      COPY: tema.copy,
      // Fotografias do próprio negócio, quando a lead as dá numa ronda de
      // alterações. Vazio no tema do nicho: a galeria desaparece com elas.
      GALERIA: Array.isArray(tema.galeria) ? tema.galeria : [],
      // A marca que o negócio representa (Liqui Moly, Bosch…), dita pelo próprio
      // cliente. Sem fotografia não há secção.
      PARCEIRO: tema.parceiro?.img ? tema.parceiro : null,
      // Todas as avaliações reais, mesmo uma só. Nunca preenchidas com ficção
      // (PLANO.md §8.1). As estrelas é que têm limiar: `mostrarProvaGoogle`.
      // `semAvaliacoes` = a lead pediu para as tirar numa ronda de alterações.
      REVIEWS: tema.semAvaliacoes ? [] : reviews,
      // Só do próprio negócio. O tema nunca traz FAQ: um genérico do nicho não
      // responde a nada e não podia ser marcado como FAQPage.
      FAQ: (cliente?.faq ?? []).filter((f) => f?.pergunta && f?.resposta),
      // As páginas de zona. Vazias numa proposta — só um site vendido as tem —
      // e o rodapé desaparece com elas em vez de mostrar um título sem lista.
      ZONAS: Array.isArray(zonas) ? zonas : [],
      SERVICO: servico,
      // Os textos fixos do template, na língua da lead (PLANO-EUA.md §A2).
      STRINGS: textos(lead.idioma, lead.pais),
      LogoIcon: icone(tema.logoIcon),
    }
  }, [tema, lead, enrich, cliente, local, servico, basePath, zonas])

  return <Ctx.Provider value={valor}>{children}</Ctx.Provider>
}
