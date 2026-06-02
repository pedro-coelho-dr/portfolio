import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import PosterShell from './components/PosterShell'
import ScrollToTop from './components/ScrollToTop'
import DetailPage from './pages/DetailPage'
import Home from './pages/Home'

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <PosterShell>
        <ScrollToTop />
        <div id="top" className="flex min-h-screen flex-col text-primary-text">
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/project/:slug" element={<DetailPage />} />
              <Route path="/code/:slug" element={<DetailPage />} />
              <Route path="/text/:slug" element={<DetailPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </PosterShell>
    </BrowserRouter>
  )
}

export default App
