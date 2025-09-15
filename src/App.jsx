// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Team from './pages/Team';
import Contact from './pages/Contact';
import Publications from './pages/publications';
import Ecolabels from './pages/Ecolabels';
import Terms from './pages/Terms';
import Privacy from './pages/Privacy';
import './assets/styles/App.css'


export default function App() {
  return (
    <div className="app-overlay">
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="team" element={<Team />} />
        <Route path="contact" element={<Contact />} />
        <Route path="publications" element={<Publications />} />
        <Route path="ecolabels" element={<Ecolabels />} />
        <Route path="terms" element={<Terms />} />
        <Route path="privacy" element={<Privacy />} />
      </Route>
    </Routes>
    </div>
  );
}
