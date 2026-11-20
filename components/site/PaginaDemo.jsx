import Site from './Site';
import VersaoB from './VersaoB';
import BarraDemo from './BarraDemo';
import FaixaDemo from './FaixaDemo';
import Registar from './Registar';
import SeletorEstilo from './SeletorEstilo';
import { variaveisDoTema } from '../../lib/cores';
import { faqPage, localBusiness } from '../../lib/schema';

// A página de uma demo, servida a partir de duas entradas:
//
//   /nicho/negocio          proposta, com barra e faixa de demonstração
//   /  no domínio do cliente  o site vendido, indexável e com dados estruturados
//
// O `basePath` é a raiz de onde penduram as páginas legais do rodapé: o caminho
// interno numa proposta, vazio no domínio do cliente — onde as páginas vivem em
// `/privacidade` e `/termos`, que é o que o sitemap anuncia.

// Quem preparou a demo, e para onde vai o botão da barra do topo.
const CONTACTO = process.env.NEXT_PUBLIC_CONTACTO ?? '';
const CTA = process.env.NEXT_PUBLIC_CTA_URL ?? '';

// `servico` só vem preenchido num site ejetado, onde o formulário tem de bater
// no endpoint partilhado noutro domínio. No motor fica em branco = mesma origem.
//
// `variante="b"` troca só a página inicial pela versão B (PLANO-DEMO-B.md), numa
// proposta e num site vendido. Barra, faixa, seletor e registo ficam iguais à
// volta das duas.
export default function PaginaDemo({ demo, basePath, servico, variante = 'a' }) {
  const { tema, lead, enrich, demoId, local, cliente, modo, zonas } = demo;
  const ehCliente = modo === 'cliente';
  // `tema.semMarcasDemo`: a lead que já está a fechar vê o site limpo, sem
  // barra, faixa nem seletor. Continua a ser uma demo: noindex, o formulário
  // vem para nós e a abertura conta. O modo cliente partia o formulário (não
  // há email do cliente antes da venda) e abria a página ao Google.
  const semMarcas = ehCliente || Boolean(tema.semMarcasDemo);
  const Pagina = variante === 'b' ? VersaoB : Site;
  const raiz = cliente?.dominio?.replace(/\/$/, '');

  // Dados estruturados: o que dá ao Google nome, telefone, área servida e
  // horário sem os ter de adivinhar do HTML. Só valem quando a página é
  // indexável — numa demo com noindex seriam ruído.
  const ld = ehCliente
    ? [localBusiness({ lead, enrich, local, cliente, url: raiz ?? basePath,
                       imagem: tema.hero?.image, logotipo: tema.logo }),
       faqPage(cliente?.faq)].filter(Boolean)
    : [];

  return (
    <>
      {/* As cores do nicho entram como canais em :root — é isto que permite
          14 paletas numa só app sem 14 builds de Tailwind (PLANO.md §4). */}
      <style>{`:root{${Object.entries(variaveisDoTema(tema.colors))
        .map(([k, v]) => `${k}:${v}`).join(';')}}
        /* A barra ocupa o topo; a pílula de navegação do site (fixed top-4)
           desce a altura real dela. A variável é escrita pelo BarraDemo e vale
           0 quando a barra está escondida. Só existe nas demos. */
        header[class~="top-4"]{top:calc(1rem + var(--barra-demo, 0px))}`}</style>

      {/* A língua da página é a da lead (PLANO-EUA.md §A4). O layout diz
          pt-PT a todas; uma demo em inglês corrige-o logo no HTML, antes de o
          browser decidir se oferece uma tradução do português. "en-US",
          "en-CA"…: o país da lead. */}
      {lead.idioma === 'en' ? (
        <script dangerouslySetInnerHTML={{ __html: `document.documentElement.lang="en-${String(lead.pais ?? 'us').toUpperCase()}"` }} />
      ) : null}

      {ld.map((d, i) => (
        <script key={i} type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(d) }} />
      ))}

      {semMarcas ? null : <BarraDemo nome={lead.nome_negocio} contacto={CONTACTO} cta={CTA} idioma={lead.idioma} />}
      {/* As zonas só existem num site vendido, e é o rodapé que lhes dá a
          única porta de entrada a partir da página inicial. */}
      <Pagina tema={tema} lead={lead} enrich={enrich} cliente={cliente} local={local}
              servico={servico} basePath={basePath} zonas={zonas} />
      {semMarcas ? null : <FaixaDemo idioma={lead.idioma} />}
      {/* Só em propostas. O site vendido não tem seletor nenhum: as cores e a
          letra dele foram decididas na venda e ficam no tema. */}
      {semMarcas ? null : <SeletorEstilo demoId={demoId} idioma={lead.idioma} pais={lead.pais} />}
      {/* Numa proposta mede-se se a lead abriu o link. Num site vendido mede-se
          para o relatório do cliente — quantas pessoas viram e quantas
          carregaram para ligar — e só quando `rastrear` está ligado. */}
      {ehCliente
        ? (servico?.rastrear ? <Registar servico={servico} /> : null)
        : <Registar demoId={demoId} />}
    </>
  );
}
