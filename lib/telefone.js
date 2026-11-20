// O telefone como se mostra e como se liga, pelo país da lead (PLANO-EUA.md §A4).
//
// Em Portugal fica exatamente como veio do CSV: é o que as demos já enviadas
// mostram. Nos EUA, "(615) 555-0142" à vista e "+16155550142" no `tel:`, que um
// telemóvel liga sem ter de adivinhar o indicativo. Um número dos EUA que não
// tenha dez algarismos fica como veio: mais vale feio do que errado. O Canadá
// partilha o plano de numeração dos EUA, "(416) 555-0142" e "+1" (PLANO-UK-AU-CA.md).
//
// Puro, sem base de dados: o SiteContext importa-o e viaja no site ejetado.
//
// Na Austrália, "(02) 9876 5432" num fixo e "0412 345 678" num telemóvel, e o
// `tel:` com +61. Lá o número diz se é telemóvel (04), e por isso só aí se
// devolve `movel`: nos outros países vale o `tipo_telefone` da lead. Os 1300 e
// 1800 não se ligam do estrangeiro e ficam sem indicativo.
export function telefone(numero, pais = 'pt') {
  const cru = String(numero ?? '');
  if (pais === 'au') {
    const d = cru.replace(/\D/g, '').replace(/^61(?=[2-478]\d{8}$)/, '0');
    if (/^0[2378]\d{8}$/.test(d)) return { visivel: `(${d.slice(0, 2)}) ${d.slice(2, 6)} ${d.slice(6)}`, ligar: `+61${d.slice(1)}`, movel: false };
    if (/^04\d{8}$/.test(d)) return { visivel: `${d.slice(0, 4)} ${d.slice(4, 7)} ${d.slice(7)}`, ligar: `+61${d.slice(1)}`, movel: true };
    if (/^1[38]00\d{6}$/.test(d)) return { visivel: `${d.slice(0, 4)} ${d.slice(4, 7)} ${d.slice(7)}`, ligar: d, movel: false };
    return { visivel: numero, ligar: cru.replace(/[^\d+]/g, '') };
  }
  // No Reino Unido, "020 7946 0018" em Londres, "0113 496 0000" nas cidades de
  // 011x e 01x1, "01632 960000" no resto, "07700 900123" num telemóvel, e +44
  // no `tel:`. O 07 diz que é telemóvel (o 070 e o 076 não são).
  if (pais === 'gb') {
    const d = cru.replace(/\D/g, '').replace(/^44(?=[1-9]\d{9}$)/, '0');
    if (!/^0\d{10}$/.test(d)) return { visivel: numero, ligar: cru.replace(/[^\d+]/g, '') };
    const grupos = /^02/.test(d) ? [3, 4, 4] : /^0(1(1\d|\d1)|[389])/.test(d) ? [4, 3, 4] : [5, 6];
    let i = 0;
    return { visivel: grupos.map((n) => d.slice(i, (i += n))).join(' '), ligar: `+44${d.slice(1)}`, movel: /^07[1-57-9]/.test(d) };
  }
  if (pais !== 'us' && pais !== 'ca') return { visivel: numero, ligar: cru.replace(/\s+/g, '') };
  const d = cru.replace(/\D/g, '').replace(/^1(?=\d{10}$)/, '');
  if (d.length !== 10) return { visivel: numero, ligar: cru.replace(/[^\d+]/g, '') };
  return { visivel: `(${d.slice(0, 3)}) ${d.slice(3, 6)}-${d.slice(6)}`, ligar: `+1${d}` };
}
