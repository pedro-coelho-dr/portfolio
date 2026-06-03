import { lazy } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import PosterShell from './components/PosterShell'
import Home from './pages/Home'

// Code-split the detail view: it (and its large data module `detail.ts`, which
// carries the full essay text) loads only when a detail route is opened, keeping
// the initial bundle lean. Home wraps the <Outlet/> in a <Suspense> boundary.
const DetailSection = lazy(() => import('./pages/DetailSection'))

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <PosterShell>
        <div id="top" className="flex min-h-screen flex-col text-primary-text">
          <a className="skip-link" href="#main">skip to content</a>
          <main id="main">
            <Routes>
              {/*
                Home is a layout route; the detail views are nested children
                rendered through Home's <Outlet/>. Keeping them under Home means
                React Router never unmounts Home when opening a detail, so the
                page is one continuous surface — the detail unfolds inline as a
                new section instead of swapping to a separate page.
              */}
              <Route path="/" element={<Home />}>
                <Route path=":category/:slug" element={<DetailSection />} />
              </Route>
            </Routes>
          </main>
          <Footer />
        </div>
      </PosterShell>
    </BrowserRouter>
  )
}

export default App
