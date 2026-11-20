'use client'
// GERADO por scripts/port-app.mjs a partir de _gerador/tpl/PrivacyPolicy.jsx — não editar à mão.
import LegalLayoutEn from './LegalLayoutEn'
import { useSite } from '../SiteContext'

// A política de privacidade em inglês, para as leads dos EUA (PLANO-EUA.md §A5).
// Diz o que o site faz de facto: o formulário, o email que o entrega, a medição
// sem cookies e o apagamento aos 12 meses. Não cita o RGPD, que não se aplica a
// um negócio nos EUA, nem promete direitos de uma lei estadual em concreto.
// Sem email conhecido, o contacto é o telefone: nunca "mailto:null".
//
// Reino Unido, Austrália e Canadá (PLANO-UK-AU-CA.md): o mesmo texto, mais o que
// a lei de cada um obriga a dizer: quem responde pelos dados, os direitos que a
// pessoa tem, a quem se pode queixar e que os dados podem sair do país. Os EUA
// ficam exatamente como estavam. É um rascunho a rever pelo André.
const LEI = {
  gb: {
    pais: 'the United Kingdom',
    responsavel: ' is the controller of your personal information under UK data protection law',
    base: 'Our legal basis is to take the steps you ask for before any contract, and our legitimate interest in replying to you.',
    direitos: 'Under the UK GDPR and the Data Protection Act 2018 you can ask us for a copy of the information we hold about you, and ask us to correct it, delete it, limit how we use it, or send it to you or to someone you choose. You can also object to how we use it.',
    queixa: <>If you are not happy with how we handled your information, you can complain to the Information Commissioner's Office at <a href="https://ico.org.uk">ico.org.uk</a>.</>,
  },
  au: {
    pais: 'Australia',
    responsavel: '',
    base: null,
    direitos: 'Under the Privacy Act 1988 and the Australian Privacy Principles you can ask us for access to the information we hold about you, and ask us to correct it. You can also ask us to delete it. We will reply within 30 days.',
    queixa: <>If you are not happy with our reply, you can complain to the Office of the Australian Information Commissioner at <a href="https://www.oaic.gov.au">oaic.gov.au</a>.</>,
  },
  ca: {
    pais: 'Canada',
    responsavel: '',
    base: null,
    direitos: 'Under the Personal Information Protection and Electronic Documents Act (PIPEDA), and the privacy laws of your province where they apply, you can ask us what information we hold about you and ask us to correct it. You can also withdraw your consent and ask us to delete it.',
    queixa: <>If you are not happy with our reply, you can complain to the Office of the Privacy Commissioner of Canada at <a href="https://www.priv.gc.ca">priv.gc.ca</a>.</>,
  },
}

export default function PrivacyPolicy() {
  const { BRAND, SERVICO, basePath } = useSite()
  const lei = LEI[BRAND.pais]
  const contacto = BRAND.email ? (
    <>
      by email at <a href={`mailto:${BRAND.email}`}>{BRAND.email}</a> or by phone at {BRAND.phoneDisplay}
    </>
  ) : (
    <>by phone at {BRAND.phoneDisplay}</>
  )

  return (
    <LegalLayoutEn title="Privacy Policy" updated={lei ? 'October 2026' : 'September 2026'}>
      <section>
        <h2>1. Who we are</h2>
        <p>
          This website belongs to {BRAND.name}
          {BRAND.city ? `, serving ${BRAND.city}` : ''}. If you have any question about your
          personal information, you can reach us {contacto}.
        </p>
        {lei?.responsavel ? <p>{BRAND.name}{lei.responsavel}.</p> : null}
      </section>

      <section>
        <h2>2. What we collect</h2>
        <p>
          Only what you choose to send us through the contact form: your name, email address,
          phone number, the service you are interested in and the message you write. We do not buy
          personal information from anyone.
        </p>
      </section>

      <section>
        <h2>3. How we use it</h2>
        <p>
          We use your information only to reply to your request, schedule the work and provide the
          service you ask for. We do not use it for marketing without your permission.{' '}
          <strong>We do not sell or share your personal information</strong>, and we do not use it
          for targeted advertising.
        </p>
        {lei?.base ? <p>{lei.base}</p> : null}
      </section>

      <section>
        <h2>4. Service providers</h2>
        <p>
          This website runs on a hosting provider, and the contact form is delivered through an
          email service. These providers handle your information only to run the website and
          deliver your message to us, and are not allowed to use it for anything else.
        </p>
        {lei ? (
          <p>
            Some of these providers may store information outside {lei.pais}. When that happens,
            we only use providers that protect it to the standard the law of {lei.pais} requires.
          </p>
        ) : null}
      </section>

      <section>
        <h2>5. How long we keep it</h2>
        <p>
          Requests that do not turn into a job are deleted within 12 months. Information linked to
          work we carried out is kept for as long as tax and business record laws require.
        </p>
      </section>

      {lei ? (
        <section>
          <h2>6. Your rights</h2>
          <p>
            {lei.direitos} Just contact us {contacto}.
          </p>
          <p>{lei.queixa}</p>
        </section>
      ) : (
        <section>
          <h2>6. Your choices</h2>
          <p>
            You can ask us at any time what information we hold about you, and ask us to correct or
            delete it. Just contact us {contacto}. Depending on the state you live in, you may have
            additional privacy rights, and we will honor them.
          </p>
        </section>
      )}

      <section>
        <h2>7. Cookies</h2>
        <p>
          This website does not use advertising cookies or third party tracking cookies. It only
          uses what is technically needed for the pages to work.
        </p>
      </section>

      {/* Ligar a medição sem o dizer aqui tornava esta página falsa. Só aparece
          quando há mesmo medição. */}
      {SERVICO.rastrear ? (
        <section>
          <h2>8. Visit statistics</h2>
          <p>
            We count the pages that are opened and the clicks on the call and message buttons, to
            understand whether the website is useful. <strong>Nothing is stored on your device, no
            cookies included</strong>, and we do not use third party analytics services.
          </p>
          <p>
            For each visit we keep only the page, the date, the name of the website you came from,
            your browser type, the time spent on the page, the approximate country and city, and a
            one way code calculated from your IP address. That code stops us from counting the same
            person twice and cannot be used to identify you. Your IP address itself is never stored.
          </p>
          <p>
            The city comes from your internet connection and is approximate. From the website you
            came from we keep only its name, such as <em>google.com</em>, never the full address,
            which could include what you searched for. These records are deleted after 12 months.
          </p>
        </section>
      ) : null}

      <section>
        <h2>{SERVICO.rastrear ? '9' : '8'}. Children</h2>
        <p>
          {lei
            ? 'This website is not meant for children, and we do not knowingly collect information from them.'
            : 'This website is not meant for children under 13, and we do not knowingly collect information from them.'}
        </p>
      </section>

      <section>
        <h2>{SERVICO.rastrear ? '10' : '9'}. Changes</h2>
        <p>
          If this policy changes, we will update this page and the date at the top.
        </p>
      </section>
    </LegalLayoutEn>
  )
}
