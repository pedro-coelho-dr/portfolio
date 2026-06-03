import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_WHATSAPP } from '../data/contact'

function Footer() {
  const base = import.meta.env.BASE_URL
  return (
    <footer className="footer-contact">
      <div className="page-shell footer-contact-inner">
        <nav aria-label="Contact links" className="footer-links">
          <a
            aria-label="LinkedIn"
            className="footer-icon-link"
            href="https://www.linkedin.com/in/pedro-coelho-dr"
            rel="noreferrer"
            target="_blank"
          >
            <svg aria-hidden="true" className="footer-icon" viewBox="0 0 24 24">
              <path d="M6.94 8.5H3.56V20h3.38V8.5Zm.22-3.56c0-1.02-.77-1.84-1.91-1.84-1.13 0-1.9.82-1.9 1.84 0 1 .75 1.82 1.86 1.84h.02c1.15 0 1.93-.84 1.93-1.84ZM20.44 13.05c0-3.39-1.77-4.97-4.13-4.97-1.9 0-2.75 1.07-3.23 1.82V8.5H9.7c.04.92 0 11.5 0 11.5h3.38v-6.42c0-.34.02-.68.12-.92.27-.68.9-1.38 1.95-1.38 1.38 0 1.93 1.06 1.93 2.61V20h3.38v-6.95Z" fill="currentColor" />
            </svg>
          </a>
          <a
            aria-label="GitHub"
            className="footer-icon-link"
            href="https://github.com/pedro-coelho-dr"
            rel="noreferrer"
            target="_blank"
          >
            <svg aria-hidden="true" className="footer-icon" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.595 2 12.262c0 4.534 2.865 8.38 6.839 9.737.5.095.682-.223.682-.495 0-.244-.009-.89-.014-1.747-2.782.616-3.369-1.387-3.369-1.387-.455-1.19-1.11-1.507-1.11-1.507-.907-.638.069-.626.069-.626 1.002.072 1.529 1.058 1.529 1.058.891 1.562 2.336 1.111 2.905.849.091-.664.349-1.111.635-1.367-2.221-.261-4.555-1.14-4.555-5.074 0-1.121.39-2.038 1.029-2.756-.103-.261-.446-1.312.098-2.735 0 0 .84-.276 2.75 1.053A9.33 9.33 0 0 1 12 6.836c.85.004 1.705.118 2.504.346 1.909-1.329 2.748-1.053 2.748-1.053.546 1.423.202 2.474.1 2.735.64.718 1.028 1.635 1.028 2.756 0 3.944-2.338 4.81-4.566 5.066.359.319.679.948.679 1.911 0 1.38-.012 2.492-.012 2.83 0 .274.18.594.688.493C19.138 20.639 22 16.794 22 12.262 22 6.595 17.523 2 12 2Z" fill="currentColor" />
            </svg>
          </a>
          <a aria-label="Email" className="footer-icon-link" href={`mailto:${CONTACT_EMAIL}`}>
            <svg aria-hidden="true" className="footer-icon" viewBox="0 0 24 24">
              <path d="M3 6.75A1.75 1.75 0 0 1 4.75 5h14.5A1.75 1.75 0 0 1 21 6.75v10.5A1.75 1.75 0 0 1 19.25 19H4.75A1.75 1.75 0 0 1 3 17.25V6.75Zm1.93-.25L12 11.56l7.07-5.06H4.93Zm14.57 1.83-6.99 5a.9.9 0 0 1-1.02 0l-6.99-5v8.92c0 .14.11.25.25.25h14.5a.25.25 0 0 0 .25-.25V8.33Z" fill="currentColor" />
            </svg>
          </a>
          <a
            aria-label="WhatsApp"
            className="footer-icon-link"
            href={`https://wa.me/${CONTACT_WHATSAPP}`}
            rel="noreferrer"
            target="_blank"
          >
            <svg aria-hidden="true" className="footer-icon" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" fill="currentColor" />
            </svg>
          </a>
          <a aria-label="Phone" className="footer-icon-link" href={`tel:${CONTACT_PHONE}`}>
            <svg aria-hidden="true" className="footer-icon" viewBox="0 0 24 24">
              <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="currentColor" />
            </svg>
          </a>
        </nav>

        <p className="footer-bottom-line">
          <span>Pedro Coelho</span>
          <span className="footer-bottom-line-sep">·</span>
          <span>2026</span>
          <span className="footer-bottom-line-sep">·</span>
          <a
            className="footer-recife"
            href="https://en.wikipedia.org/wiki/Recife"
            rel="noreferrer"
            target="_blank"
          >
            <span>Recife</span>
            <img
              alt="Pernambuco"
              className="footer-bottom-line-flag"
              src={`${base}img/flags/pernambuco.svg`}
            />
            <img
              alt="Brazil"
              className="footer-bottom-line-flag"
              src={`${base}img/flags/brazil.svg`}
            />
          </a>
        </p>
      </div>
    </footer>
  )
}

export default Footer
