// Os textos fixos da página, por língua (PLANO-EUA.md §A2).
//
// Os textos dos nichos vêm dos temas (`COPY`, `SERVICES`…); estes são os que o
// template escrevia no próprio JSX: botões, rótulos, o formulário, o horário. A
// língua é da lead (`leads.idioma`), nunca um interruptor global, e o SiteContext
// entrega à página só a língua dela, como `STRINGS`.
//
// O português tem de sair igual ao que o template escrevia, letra a letra: cada
// demo já enviada continua como estava. O inglês é copy americana, não tradução
// palavra a palavra, e nunca leva travessões.
//
// Onde há um número ou um nome pelo meio, a entrada é uma função.

// 540 -> "9h" · 870 -> "14h30"
const hmPt = (min) => {
  const h = Math.floor(min / 60) % 24
  const m = min % 60
  return m ? `${h}h${String(m).padStart(2, '0')}` : `${h}h`
}

// 540 -> "9 AM" · 870 -> "2:30 PM" · 720 -> "12 PM"
const hmEn = (min) => {
  const h24 = Math.floor(min / 60) % 24
  const m = min % 60
  const h = h24 % 12 || 12
  return `${h}${m ? `:${String(m).padStart(2, '0')}` : ''} ${h24 < 12 ? 'AM' : 'PM'}`
}

const PT = {
  locale: 'pt-PT',
  decimal: ',',
  nav: {
    principal: 'Principal', abrirMenu: 'Abrir menu', menu: 'Menu', fecharMenu: 'Fechar menu',
    servicos: 'Serviços', avaliacoes: 'Avaliações', processo: 'Como trabalhamos', galeria: 'Galeria',
    perguntas: 'Perguntas', horario: 'Horário', zona: 'Zona', contactos: 'Contactos',
  },
  ligar: 'Ligar',
  ligarPara: (n) => `Ligar para ${n}`,
  ligarNumero: (n) => `Ligar ${n}`,
  falarWhatsApp: 'Falar no WhatsApp',
  falarPorWhatsApp: 'Falar por WhatsApp',
  falarComWhatsApp: (nome) => `Falar com ${nome} no WhatsApp`,
  provaAria: (nota, n) => `${nota} em 5 no Google, ${n} avaliações. Abrir no Google Maps`,
  avaliacoesN: 'avaliações',
  // "Estilista em Lisboa" -> "Estilista · Lisboa": as preposições antes do concelho.
  antesDoLocal: /\s+(em|no|na)$/,
  servicos: {
    marcarEste: 'Marcar este serviço',
    pedirOrcamento: 'Pedir orçamento para isto',
    naoVe: 'Não vê o que procura?',
    digaNos: 'Diga-nos o que é.',
  },
  provaSocial: {
    eyebrow: 'Avaliações no Google',
    fita: 'Avaliações de clientes no Google',
    fila: (n) => `Avaliações de clientes no Google, fila ${n}`,
    verTodas: 'Ver todas no Google',
    parar: 'Toque ou passe o rato para parar',
    de: (autor) => `Avaliação de ${autor}`,
    publicada: 'Avaliação publicada no Google',
  },
  fechar: 'Fechar',
  galeria: {
    copy: { eyebrow: 'Galeria', titleA: 'O trabalho', titleB: 'da casa.' },
    verMaior: (alt) => `Ver maior: ${alt}`,
    foto: (i, n) => `Fotografia ${i} de ${n}`,
    anterior: 'Fotografia anterior',
    seguinte: 'Fotografia seguinte',
  },
  zona: {
    horarioEZona: 'Horário e zona', zona: 'Zona', onde: 'Onde estamos', ondeTrabalhamos: 'Onde trabalhamos',
    quando: 'e quando abrimos.', horario: 'Horário', hoje: 'Hoje', morada: 'Morada',
    abrirMaps: 'Abrir no Google Maps',
  },
  horas: {
    hm: hmPt,
    intervalo: (a, b) => `${hmPt(a)} às ${hmPt(b)}`,
    diaInteiro: '24 horas',
    aHora: (min) => (min % 1440 === 0 ? 'à meia-noite' : `${Math.floor(min / 60) === 1 ? 'à' : 'às'} ${hmPt(min)}`),
    aberto24: 'Aberto 24 horas',
    abertoFecha: (quando) => `Aberto agora · fecha ${quando}`,
    fechadoAbre: (quando) => `Fechado · abre ${quando}`,
    amanha: 'amanhã',
    fechado: 'Fechado',
    funcionamento: 'Horário de funcionamento',
    longo: { seg: 'segunda', ter: 'terça', qua: 'quarta', qui: 'quinta', sex: 'sexta', sab: 'sábado', dom: 'domingo' },
    inteiro: { seg: 'Segunda', ter: 'Terça', qua: 'Quarta', qui: 'Quinta', sex: 'Sexta', sab: 'Sábado', dom: 'Domingo' },
  },
  faq: { eyebrow: 'Perguntas frequentes', titleA: 'O que perguntam', titleB: 'mais vezes.' },
  contacto: {
    eyebrow: 'Contacto',
    servico: 'Serviço',
    telefone: 'Telefone',
    telemovel: 'Telemóvel',
    enviarMensagem: 'Enviar mensagem',
    email: 'Email',
    enviado: 'Obrigado. Pedido enviado.',
    confirmacao: 'Enviámos-lhe uma confirmação por email. Se for urgente, ligue para',
    outro: 'Enviar outro pedido',
    queMarcar: 'O que quer marcar?',
    doQuePrecisa: 'Do que precisa?',
    nome: 'Nome',
    opcional: ' (opcional)',
    erro: 'Não foi possível enviar o pedido. Tente novamente ou ligue para',
    privacidade: 'Os seus dados servem só para responder a este pedido e não são partilhados com terceiros.',
    aEnviar: 'A enviar',
    enviar: 'Enviar pedido',
  },
  redeSocial: (nome, rede) => `${nome} no ${rede}`,
  rodape: {
    servicos: 'Serviços', empresa: 'Empresa', contactos: 'Contactos', verMaps: 'Ver no Google Maps',
    direitos: 'Todos os direitos reservados.', privacidade: 'Privacidade', termos: 'Termos',
    // Quem fez o site. Null tira a ligação.
    credito: { texto: 'Site por WP Experts', href: 'https://wpexperts.pt' },
  },
  // As peças à volta da página numa proposta: barra do topo, faixa e seletor.
  demo: {
    preparada: 'Demonstração preparada para',
    colocarOnline: 'Quero colocar online',
    verComoCliente: 'ver como cliente',
    demonstracao: 'demonstração',
    faixa: 'Proposta de demonstração · site de exemplo, não é o site oficial deste negócio',
  },
  seletor: {
    cores: 'Cores', letra: 'Letra', amostraA: 'Feito', amostraB: 'bem',
    experimente: 'Experimente à vontade. Recarregar a página traz tudo ao início.',
    fechar: 'fechar', mudar: 'mudar o estilo',
    // Vazio = o nome da paleta ou da letra como está em lib/paletas.js e lib/tipografias.js.
    paletas: {},
    letras: {},
  },
}

const EN = {
  locale: 'en-US',
  decimal: '.',
  nav: {
    principal: 'Main', abrirMenu: 'Open menu', menu: 'Menu', fecharMenu: 'Close menu',
    servicos: 'Services', avaliacoes: 'Reviews', processo: 'How we work', galeria: 'Gallery',
    perguntas: 'FAQ', horario: 'Hours', zona: 'Service area', contactos: 'Contact',
  },
  ligar: 'Call',
  ligarPara: (n) => `Call ${n}`,
  ligarNumero: (n) => `Call ${n}`,
  falarWhatsApp: 'Chat on WhatsApp',
  // O SMS só existe em inglês: em Portugal o telemóvel é WhatsApp.
  mensagem: 'Text us',
  falarPorWhatsApp: 'Chat on WhatsApp',
  falarComWhatsApp: (nome) => `Chat with ${nome} on WhatsApp`,
  provaAria: (nota, n) => `Rated ${nota} out of 5 on Google from ${n} reviews. Open in Google Maps`,
  avaliacoesN: 'reviews',
  antesDoLocal: /\s+in$/,
  servicos: {
    marcarEste: 'Book this service',
    pedirOrcamento: 'Get a quote for this',
    naoVe: "Don't see what you need?",
    digaNos: 'Just tell us.',
  },
  provaSocial: {
    eyebrow: 'Google reviews',
    fita: 'Customer reviews on Google',
    fila: (n) => `Customer reviews on Google, row ${n}`,
    verTodas: 'See all on Google',
    parar: 'Tap or hover to pause',
    de: (autor) => `Review by ${autor}`,
    publicada: 'Review posted on Google',
  },
  fechar: 'Close',
  galeria: {
    copy: { eyebrow: 'Gallery', titleA: 'Our work,', titleB: 'up close.' },
    verMaior: (alt) => `View larger: ${alt}`,
    foto: (i, n) => `Photo ${i} of ${n}`,
    anterior: 'Previous photo',
    seguinte: 'Next photo',
  },
  zona: {
    horarioEZona: 'Hours and location', zona: 'Service area', onde: 'Where to find us', ondeTrabalhamos: 'Where we work',
    quando: 'and when we are open.', horario: 'Hours', hoje: 'Today', morada: 'Address',
    abrirMaps: 'Open in Google Maps',
  },
  horas: {
    hm: hmEn,
    intervalo: (a, b) => `${hmEn(a)} to ${hmEn(b)}`,
    diaInteiro: 'Open 24 hours',
    aHora: (min) => (min % 1440 === 0 ? 'at midnight' : `at ${hmEn(min)}`),
    aberto24: 'Open 24 hours',
    abertoFecha: (quando) => `Open now · closes ${quando}`,
    fechadoAbre: (quando) => `Closed · opens ${quando}`,
    amanha: 'tomorrow',
    fechado: 'Closed',
    funcionamento: 'Opening hours',
    longo: { seg: 'Monday', ter: 'Tuesday', qua: 'Wednesday', qui: 'Thursday', sex: 'Friday', sab: 'Saturday', dom: 'Sunday' },
    inteiro: { seg: 'Monday', ter: 'Tuesday', qua: 'Wednesday', qui: 'Thursday', sex: 'Friday', sab: 'Saturday', dom: 'Sunday' },
  },
  faq: { eyebrow: 'FAQ', titleA: 'Questions we', titleB: 'hear a lot.' },
  contacto: {
    eyebrow: 'Contact',
    servico: 'Service',
    telefone: 'Phone',
    telemovel: 'Phone',
    enviarMensagem: 'Send a message',
    email: 'Email',
    enviado: 'Thank you. Your request was sent.',
    confirmacao: 'We sent you a confirmation email. If it is urgent, call',
    outro: 'Send another request',
    queMarcar: 'What would you like to book?',
    doQuePrecisa: 'What do you need?',
    nome: 'Name',
    opcional: ' (optional)',
    erro: 'We could not send your request. Please try again or call',
    privacidade: 'We only use your details to reply to this request. We never share them.',
    aEnviar: 'Sending',
    enviar: 'Send request',
  },
  redeSocial: (nome, rede) => `${nome} on ${rede}`,
  rodape: {
    servicos: 'Services', empresa: 'Company', contactos: 'Contact', verMaps: 'View on Google Maps',
    direitos: 'All rights reserved.', privacidade: 'Privacy', termos: 'Terms',
    // Sem crédito até a marca dos EUA existir (PLANO-EUA.md §A8): o wpexperts.pt
    // é um site português, e o wpexperts.com é de outra agência.
    credito: null,
  },
  demo: {
    preparada: 'Demo website prepared for',
    colocarOnline: 'I want this live',
    verComoCliente: 'view as a customer',
    demonstracao: 'demo',
    faixa: 'Demo proposal · sample website, not the official website of this business',
  },
  seletor: {
    cores: 'Colors', letra: 'Fonts', amostraA: 'Done', amostraB: 'right',
    experimente: 'Try anything you like. Reloading the page resets it all.',
    fechar: 'close', mudar: 'change the style',
    paletas: { ouro: 'Old gold', oceano: 'Ocean', floresta: 'Forest', grafite: 'Graphite', vinho: 'Wine', tinta: 'Ink' },
    letras: {
      original: { nome: 'Original', resumo: 'Headline in two typefaces' },
      editorial: { nome: 'Editorial', resumo: 'All serif headline' },
      moderno: { nome: 'Modern', resumo: 'All sans headline' },
      oficina: { nome: 'Workshop', resumo: 'Two typefaces, heavy stroke' },
    },
  },
}

export const TEXTOS = { pt: PT, en: EN }

// O inglês britânico do Reino Unido e da Austrália (PLANO-UK-AU-CA.md): só o que
// muda. O conteúdo dos nichos vem já trocado de themes/temas-en-{gb,au}.json.
const britanico = (pais) => ({ ...EN, locale: `en-${pais.toUpperCase()}`, seletor: { ...EN.seletor, cores: 'Colours' } })
const BRITANICO = { gb: britanico('gb'), au: britanico('au') }

/** Os textos da língua da lead. Qualquer outra coisa é português, como sempre foi. */
export const textos = (idioma, pais) => (idioma === 'en' && BRITANICO[pais]) || TEXTOS[idioma] || PT
