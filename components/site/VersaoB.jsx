'use client'
// A versão B da página inicial (PLANO-DEMO-B.md), pedida à parte.
//
// Importada direto do PaginaDemo, o Turbopack punha o SiteB no mesmo pacote do
// Site, e cada demo em A passava a descarregar as duas páginas: 14 kB a mais
// por visita, para uma versão que quase ninguém vê. Um servidor não separa um
// componente cliente em pacote próprio (docs do Next, "Lazy Loading"); um
// componente cliente separa, e é só para isso que este ficheiro existe.
//
// `lazy` do React e não `next/dynamic`: o segundo custava mais 2 kB em todas as
// páginas de A.
//
// Sem `<Suspense>` à volta, de propósito. O React 19.2 manda à parte todo o
// bloco acabado com mais de 12,8 kB que esteja dentro de um Suspense: escondido,
// revelado por um script, e com um atraso para juntar revelações. Era a página
// inteira de B, que só aparecia depois do HTML todo chegar. Sem a fronteira, B
// sai no HTML principal e pinta-se à medida que chega, como A.
//
// Para o servidor não ter de esperar, o módulo começa a carregar logo que este
// ficheiro carrega, e o `lazy` recebe um `then` que responde na hora: o React
// não suspende. No browser o pedido só parte quando B é mesmo desenhada; senão
// cada demo em A descarregava B à mesma. Enquanto chega, o HTML do servidor
// fica à vista e só a interação espera.
import { lazy } from 'react'

let modulo = null
const carregar = () => import('./SiteB').then((m) => (modulo = m))
if (typeof window === 'undefined') carregar()

const SiteB = lazy(() => (modulo ? { then: (pronto) => pronto(modulo) } : carregar()))

export default function VersaoB(props) {
  return <SiteB {...props} />
}
