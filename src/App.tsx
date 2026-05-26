import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import PosterShell from './components/PosterShell'
import Code from './pages/Code'
import Glhf from './pages/Glhf'
import Home from './pages/Home'
import Project from './pages/Project'
import Text from './pages/Text'

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <PosterShell>
        <div id="top" className="flex min-h-screen flex-col text-primary-text">
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/project" element={<Project />} />
              <Route path="/code" element={<Code />} />
              <Route path="/text" element={<Text />} />
              <Route path="/project/glhf" element={<Glhf />} />
            </Routes>
          </main>
          <div aria-hidden="true" className="page-tail" />
          <Footer />
        </div>
      </PosterShell>
    </BrowserRouter>
  )
}

export default App
