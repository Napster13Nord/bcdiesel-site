// Correções ao tema que dependem da lead. Corre no servidor, antes de o tema
// ser enviado para o cliente — assim os números da lead-modelo não chegam sequer
// ao HTML.
//
// Os temas nasceram dos 14 projetos Vite, cada um escrito à volta de uma lead
// concreta. Sobraram lá dentro a nota e o número de avaliações dessa lead, nos
// dois primeiros pilares e no sinal de confiança que liga ao Google Maps.

export const virgula = (n) => String(n ?? '').replace('.', ',');

// 5 -> "5,0"   4.75 -> "4,8"
export const nota1 = (n) => (n == null ? '' : virgula(Number(n).toFixed(1)));

// A prova do Google só ajuda acima de um limiar. "4,0 ★" lido isolado é medíocre,
// e meia dúzia de avaliações diz que quase ninguém foi lá. Abaixo destes valores
// o sinal trabalha contra a lead, por isso não se mostra — nunca se maquilha. Os
// dois sinais são independentes: 300 avaliações a 4,3 continuam a valer a contagem.
//
// As 20 avaliações eram demasiado altas para o tipo de negócio que se vende aqui.
// Um salão de estética com 10 avaliações, todas de cinco estrelas, é uma casa que
// agrada a quem lá entra — e a página escondia isso e ficava a falar sozinha.
// Com a nota já travada em 4,5, quatro avaliações chegam (decisão do André, 2026-09-29).
export const NOTA_MINIMA = 4.5;
export const REVIEWS_MINIMAS = 4;

export const mostrarNota = (nota) => nota != null && Number(nota) >= NOTA_MINIMA;
export const mostrarReviews = (reviews) => Number(reviews ?? 0) >= REVIEWS_MINIMAS;

// O badge do herói e a linha das estrelas mostram nota e contagem juntas, por
// isso precisam das duas fortes: uma média boa ao lado de 6 avaliações não convence.
export const mostrarProvaGoogle = (nota, reviews) =>
  mostrarNota(nota) && mostrarReviews(reviews);

// " em Gondomar" · " no Porto" · " na Amadora".
//
// A preposição não se adivinha pelo nome do concelho, e escrevê-la sempre "em"
// punha "Canalização e eletricidade em Porto" no cimo do site de um cliente do
// Porto. Só os concelhos que levam artigo entram na lista; o resto usa "em".
const ARTIGO = {
  Porto: 'no', Barreiro: 'no', Seixal: 'no', Montijo: 'no', Cartaxo: 'no',
  'Fundão': 'no', Entroncamento: 'no',
  Amadora: 'na', 'Covilhã': 'na', Guarda: 'na', Maia: 'na', Moita: 'na',
  'Nazaré': 'na', Trofa: 'na', 'Marinha Grande': 'na', 'Lourinhã': 'na',
  Batalha: 'na', 'Lousã': 'na', 'Golegã': 'na',
};

// Em inglês é sempre " in": " in Williamson County".
export const emLocal = (concelho, idioma = 'pt') => {
  const nome = String(concelho ?? '').trim();
  if (!nome) return '';
  return idioma === 'en' ? ` in ${nome}` : ` ${ARTIGO[nome] ?? 'em'} ${nome}`;
};

// Os números que dependem da lead reconhecem-se pelo rótulo. Os temas em inglês
// (themes/temas-en.json) têm os seus, e o texto que os substitui também muda.
const ROTULOS = {
  pt: {
    reviews: 'Avaliações Google', nota: 'Classificação média', dias: 'Dias por semana',
    textoReviews: (local) => `Clientes${local} que já avaliaram o trabalho da casa no Google.`,
  },
  en: {
    reviews: 'Google reviews', nota: 'Average rating', dias: 'Days a week',
    textoReviews: (local) => `Customers${local} who have reviewed the business on Google.`,
  },
};

export function temaComDadosDaLead(tema, lead) {
  const idioma = lead.idioma === 'en' ? 'en' : 'pt';
  const R = ROTULOS[idioma];
  const local = emLocal(lead.concelho, idioma);

  // Os limiares acima protegem a proposta: numa demo por enviar, meia dúzia de
  // avaliações lê-se como "quase ninguém foi lá". Num site que a lead já está a
  // tratar como dela, quem decide o que mostrar é ela — e uma esteticista com
  // dez avaliações, todas de cinco estrelas, quer o número à vista.
  // `tema.provaGoogle: true`, escrito numa ronda de alterações, dispensa o corte.
  //
  // Nada é maquilhado: a nota e a contagem continuam a ser as do Google. O que
  // muda é só o limiar a partir do qual se mostram.
  const semCorte = tema.provaGoogle === true;

  // Os dois primeiros pilares são a ficha do Google. Sem nota saíam "0" e "0,0",
  // que se lê como uma casa avaliada em nada — quando o que falta é o dado.
  // Dado ausente remove o componente: fica só o pilar que não depende do Google.
  const pillars = (tema.pillars ?? []).flatMap((p) => {
    if (p.label === R.reviews) {
      if (!semCorte && !mostrarReviews(lead.reviews)) return [];
      return [{ ...p, end: lead.reviews, text: R.textoReviews(local) }];
    }
    if (p.label === R.nota) {
      if (!semCorte && !mostrarProvaGoogle(lead.nota, lead.reviews)) return [];
      return [{ ...p, end: Number(lead.nota), decimals: 1 }];
    }
    return [p];
  });

  // `href: true` nos temas significa "liga à ficha do Google". No gerador do Vite
  // isso vira BRAND.maps; aqui tem de virar o maps_url da lead, senão o cartão
  // renderiza <a href="true"> e o link fica partido.
  // Sem nota o cartão saía " ★ no Google · 0 avaliações". Dado ausente remove o
  // componente — os outros dois sinais de confiança bastam.
  const trust = (tema.trust ?? []).flatMap((t) => {
    if (!t.href) return [t];
    if (!semCorte && !mostrarProvaGoogle(lead.nota, lead.reviews)) return [];
    return [{
      ...t,
      href: lead.maps_url ?? null,
      title: `${nota1(lead.nota)} ★ no Google`,
      text: `${lead.reviews ?? 0} avaliações de clientes${local}.`,
    }];
  });

  // O eyebrow do tema é só a categoria do ofício; o concelho da lead entra aqui.
  // Os temas não trazem cidade nenhuma no texto — a lead-modelo punha "Braga" na
  // demo de um negócio de Faro.
  //
  // "Cabeleireiro em Vila Nova de Gaia" e não "Vila Nova de Gaia · Cabeleireiro
  // · Cor · Tratamentos": em caixa alta com um quarto de em de espaçamento, a
  // versão longa ocupava três linhas num telemóvel antes de a manchete começar.
  const hero = lead.concelho
    ? { ...tema.hero, eyebrow: `${tema.hero.eyebrow}${local}` }
    : tema.hero;

  return { ...tema, hero, pillars: comDiasReais(pillars, lead.horario, R.dias), trust };
}

// Abrir seis ou sete dias é um argumento; abrir cinco é o normal do ofício e
// lê-se como limitação de horário, não como prova. Mesmo critério da nota do
// Google: o sinal só entra quando joga a favor.
export const DIAS_MINIMOS = 6;

// O pilar "Dias por semana" trazia o número da lead-modelo: um salão fechado à
// segunda mostrava 6. Conta os dias que o Google diz que a porta está aberta e,
// sem horário conhecido, remove o pilar — dado ausente remove o componente.
function comDiasReais(pillars, horario, rotulo) {
  return pillars.flatMap((p) => {
    if (p.label !== rotulo) return [p];
    if (!horario || typeof horario !== 'object') return [];
    const abertos = Object.values(horario)
      .filter((h) => h && !/^encerrado$/i.test(String(h))).length;
    return abertos >= DIAS_MINIMOS ? [{ ...p, end: abertos }] : [];
  });
}
