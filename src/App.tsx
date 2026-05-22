import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Header from './components/Header'
import LetsTalk from './components/LetsTalk'
import Code from './pages/Code'
import Glhf from './pages/Glhf'
import Home from './pages/Home'
import Project from './pages/Project'
import Text from './pages/Text'

function App() {
  return (
    <BrowserRouter>
      <div id="top" className="min-h-screen bg-background text-primary-text">
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
        <LetsTalk />
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
