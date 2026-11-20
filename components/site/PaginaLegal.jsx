import { SiteProvider } from './SiteContext';
import Privacidade from './legal/Privacidade';
import Termos from './legal/Termos';
import PrivacyPolicy from './legal/PrivacyPolicy';
import TermsOfUse from './legal/TermsOfUse';
import FaixaDemo from './FaixaDemo';
import { variaveisDoTema } from '../../lib/cores';

// As duas páginas legais, servidas do caminho da proposta e da raiz do domínio
// do cliente. O rodapé de todas as demos liga-lhes desde o início.
export const PAGINAS = {
  privacidade: { Componente: Privacidade, titulo: 'Política de Privacidade' },
  termos: { Componente: Termos, titulo: 'Termos e Condições' },
};

// As mesmas duas em inglês, para as leads dos EUA (PLANO-EUA.md §A5). O caminho
// é o mesmo: é o que o rodapé de B já liga, numa língua ou noutra.
const PAGINAS_EN = {
  privacidade: { Componente: PrivacyPolicy, titulo: 'Privacy Policy' },
  termos: { Componente: TermsOfUse, titulo: 'Terms of Use' },
};

const paginaDe = (demo, qual) => (demo?.lead.idioma === 'en' ? PAGINAS_EN : PAGINAS)[qual];

export default function PaginaLegal({ demo, qual, basePath }) {
  const { tema, lead, enrich, cliente, local, modo, zonas } = demo;
  const { Componente } = paginaDe(demo, qual);

  return (
    <>
      <style>{`:root{${Object.entries(variaveisDoTema(tema.colors))
        .map(([k, v]) => `${k}:${v}`).join(';')}}`}</style>
      {/* A língua da página é a da lead, como no PaginaDemo. */}
      {lead.idioma === 'en' ? (
        <script dangerouslySetInnerHTML={{ __html: `document.documentElement.lang="en-${String(lead.pais ?? 'us').toUpperCase()}"` }} />
      ) : null}
      <SiteProvider tema={tema} lead={lead} enrich={enrich} cliente={cliente} local={local}
                    basePath={basePath} zonas={zonas}>
        <Componente />
      </SiteProvider>
      {modo === 'cliente' || tema.semMarcasDemo ? null : <FaixaDemo idioma={lead.idioma} />}
    </>
  );
}

// Repetidas em centenas de sites, estas páginas não acrescentam nada ao que se
// procura — nunca se indexam, nem no site do cliente.
export function metadataLegal(demo, qual) {
  if (!PAGINAS[qual]) return {};
  const pagina = paginaDe(demo, qual);
  return {
    title: demo ? `${pagina.titulo} - ${demo.lead.nome_negocio}` : pagina.titulo,
    robots: { index: false, follow: true },
  };
}
