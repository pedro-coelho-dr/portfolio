import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import App from './App.tsx'

// Own scroll positioning ourselves (Home/DetailSection place the viewport on
// open / close / deep-link). Without this the browser tries to restore a
// remembered scroll on refresh, fighting our deep-link positioning.
if ('scrollRestoration' in history) history.scrollRestoration = 'manual'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
