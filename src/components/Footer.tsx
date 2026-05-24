import type { FormEvent } from 'react'
import { useState } from 'react'

const CONTACT_EMAIL = 'pedrocoelhodr@gmail.com'

function Footer() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const subject = encodeURIComponent('portfolio ping')
    const body = encodeURIComponent(`sender: ${email || '-'}\n\nmessage:\n${message || '-'}`)

    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
  }

  return (
    <footer className="footer-contact">
      <div className="page-shell footer-contact-inner">
        <form className="footer-form" onSubmit={handleSubmit}>
          <h2 className="footer-title">Let&apos;s Talk</h2>

          <label className="footer-label" htmlFor="contact-email">
            e-mail
          </label>
          <input
            className="footer-input"
            id="contact-email"
            name="email"
            onChange={(event) => setEmail(event.target.value)}
            placeholder="e-mail"
            type="email"
            value={email}
          />

          <label className="footer-label" htmlFor="contact-text">
            text
          </label>
          <textarea
            className="footer-textarea"
            id="contact-text"
            name="text"
            onChange={(event) => setMessage(event.target.value)}
            placeholder="text"
            rows={3}
            value={message}
          />

          <button className="footer-button" type="submit">
            ping
          </button>
        </form>

        <div className="footer-links-wrap">
          <nav aria-label="Contact links" className="footer-links">
            <a
              aria-label="GitHub"
              className="footer-icon-link"
              href="https://github.com/pedro-coelho-dr"
            >
              <svg aria-hidden="true" className="footer-icon" viewBox="0 0 24 24">
                <path
                  d="M12 2C6.477 2 2 6.595 2 12.262c0 4.534 2.865 8.38 6.839 9.737.5.095.682-.223.682-.495 0-.244-.009-.89-.014-1.747-2.782.616-3.369-1.387-3.369-1.387-.455-1.19-1.11-1.507-1.11-1.507-.907-.638.069-.626.069-.626 1.002.072 1.529 1.058 1.529 1.058.891 1.562 2.336 1.111 2.905.849.091-.664.349-1.111.635-1.367-2.221-.261-4.555-1.14-4.555-5.074 0-1.121.39-2.038 1.029-2.756-.103-.261-.446-1.312.098-2.735 0 0 .84-.276 2.75 1.053A9.33 9.33 0 0 1 12 6.836c.85.004 1.705.118 2.504.346 1.909-1.329 2.748-1.053 2.748-1.053.546 1.423.202 2.474.1 2.735.64.718 1.028 1.635 1.028 2.756 0 3.944-2.338 4.81-4.566 5.066.359.319.679.948.679 1.911 0 1.38-.012 2.492-.012 2.83 0 .274.18.594.688.493C19.138 20.639 22 16.794 22 12.262 22 6.595 17.523 2 12 2Z"
                  fill="currentColor"
                />
              </svg>
            </a>
            <a
              aria-label="LinkedIn"
              className="footer-icon-link"
              href="https://www.linkedin.com/in/pedro-coelho-dr"
            >
              <svg aria-hidden="true" className="footer-icon" viewBox="0 0 24 24">
                <path
                  d="M6.94 8.5H3.56V20h3.38V8.5Zm.22-3.56c0-1.02-.77-1.84-1.91-1.84-1.13 0-1.9.82-1.9 1.84 0 1 .75 1.82 1.86 1.84h.02c1.15 0 1.93-.84 1.93-1.84ZM20.44 13.05c0-3.39-1.77-4.97-4.13-4.97-1.9 0-2.75 1.07-3.23 1.82V8.5H9.7c.04.92 0 11.5 0 11.5h3.38v-6.42c0-.34.02-.68.12-.92.27-.68.9-1.38 1.95-1.38 1.38 0 1.93 1.06 1.93 2.61V20h3.38v-6.95Z"
                  fill="currentColor"
                />
              </svg>
            </a>
            <a aria-label="Email" className="footer-icon-link" href={`mailto:${CONTACT_EMAIL}`}>
              <svg aria-hidden="true" className="footer-icon" viewBox="0 0 24 24">
                <path
                  d="M3 6.75A1.75 1.75 0 0 1 4.75 5h14.5A1.75 1.75 0 0 1 21 6.75v10.5A1.75 1.75 0 0 1 19.25 19H4.75A1.75 1.75 0 0 1 3 17.25V6.75Zm1.93-.25L12 11.56l7.07-5.06H4.93Zm14.57 1.83-6.99 5a.9.9 0 0 1-1.02 0l-6.99-5v8.92c0 .14.11.25.25.25h14.5a.25.25 0 0 0 .25-.25V8.33Z"
                  fill="currentColor"
                />
              </svg>
            </a>
          </nav>
        </div>
      </div>
    </footer>
  )
}

export default Footer
