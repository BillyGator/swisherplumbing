import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const container = document.getElementById('root')!

// Every production route is prerendered: the root already contains the full
// server-rendered page, so hydrate it to preserve the HTML (and avoid
// re-fetch/layout churn). createRoot() is kept ONLY as the development
// fallback for an empty root (e.g. the dev-server shell before SSR, or any
// environment that serves the bare index.html).
if (container.hasChildNodes()) {
  hydrateRoot(
    container,
    <StrictMode>
      <App />
    </StrictMode>,
  )
} else {
  createRoot(container).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
