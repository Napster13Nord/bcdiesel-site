'use client'
// GERADO por scripts/port-app.mjs a partir de _gerador/tpl/TermsOfUse.jsx — não editar à mão.
import LegalLayoutEn from './LegalLayoutEn'
import { useSite } from '../SiteContext'

// Os termos de utilização em inglês, para as leads dos EUA (PLANO-EUA.md §A5).
// Não afirmam nada que não se saiba do negócio: sem "licensed", sem prazos de
// validade de orçamento e sem garantias próprias. A garantia é a do orçamento
// escrito e a da lei; o estado é o do negócio, que a página não sabe qual é.
//
// Reino Unido, Austrália e Canadá (PLANO-UK-AU-CA.md): os direitos do consumidor
// que a lei de cada um não deixa afastar, o imposto pelo nome de lá e a lei que
// rege. Na Austrália, termos que pareçam excluir as garantias da Australian
// Consumer Law são eles próprios ilegais: por isso o aviso vai em dois sítios.
// Os EUA ficam exatamente como estavam. É um rascunho a rever pelo André.
const LEI = {
  gb: {
    direitos: 'Nothing in these terms affects your statutory rights, including those under the Consumer Rights Act 2015.',
    imposto: 'VAT is charged where it applies, as required by law.',
    responsabilidade: 'Nothing in these terms limits liability for death or personal injury caused by negligence, or for fraud.',
    lei: 'the laws of the part of the United Kingdom where',
  },
  au: {
    direitos: 'Our services come with guarantees that cannot be excluded under the Australian Consumer Law, and nothing in these terms limits them.',
    imposto: 'GST is charged where it applies, as required by law.',
    responsabilidade: 'This does not limit your rights under the Australian Consumer Law.',
    lei: 'the laws of the state or territory where',
  },
  ca: {
    direitos: 'Nothing in these terms limits the rights you have under the consumer protection laws of your province or territory.',
    imposto: 'GST, HST or PST is charged where it applies, as required by law.',
    responsabilidade: null,
    lei: 'the laws of the province or territory where',
  },
}

export default function TermsOfUse() {
  const { BRAND, basePath } = useSite()
  const lei = LEI[BRAND.pais]
  return (
    <LegalLayoutEn title="Terms of Use" updated={lei ? 'October 2026' : 'September 2026'}>
      <section>
        <h2>1. Scope</h2>
        <p>
          These terms apply to the use of this website and to requests sent through it to{' '}
          {BRAND.name}.
        </p>
      </section>

      <section>
        <h2>2. Quotes</h2>
        <p>
          A request sent through this website is not a contract. Any price mentioned by phone or
          email before we see the job is an estimate. The final price is the one in the written
          quote you accept.
        </p>
      </section>

      <section>
        <h2>3. The work</h2>
        <p>
          Dates may change because of material availability or conditions on site. If that happens,
          we will let you know as soon as possible.
        </p>
      </section>

      <section>
        <h2>4. Warranties</h2>
        <p>
          Any warranty on work or materials is the one stated in your written quote or invoice, in
          addition to your rights under applicable law. It does not cover damage caused by misuse,
          lack of maintenance or work done by others.
        </p>
        {lei ? <p>{lei.direitos}</p> : null}
      </section>

      <section>
        <h2>5. Payment</h2>
        <p>
          {`Payment terms are the ones stated in the quote you accept. ${lei ? lei.imposto : 'Applicable taxes are added as required by law.'}`}
        </p>
      </section>

      <section>
        <h2>6. Website content</h2>
        <p>
          The information on this website is general and may change without notice. Some photos
          are illustrative and may not show our own work. Reviews shown here come from Google and
          are the words of the people who wrote them.
        </p>
      </section>

      <section>
        <h2>7. Liability</h2>
        <p>
          This website is provided as is. To the extent permitted by law, we are not responsible for
          indirect losses caused by the use of this website or by temporary unavailability.
        </p>
        {lei?.responsabilidade ? <p>{lei.responsabilidade}</p> : null}
      </section>

      <section>
        <h2>8. Governing law</h2>
        <p>
          {`These terms are governed by ${lei ? lei.lei : 'the laws of the state where'} `}{BRAND.name} operates.
        </p>
      </section>

      <section>
        <h2>9. Contact</h2>
        <p>
          For any question: {BRAND.phoneDisplay}
          {BRAND.email ? (
            <>
              {' '}· <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a>
            </>
          ) : null}
          .
        </p>
      </section>
    </LegalLayoutEn>
  )
}
