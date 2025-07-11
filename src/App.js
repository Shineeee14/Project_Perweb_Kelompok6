
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Catalog from './pages/Catalog';
import Reviews from './pages/Reviews';
import About from './pages/About';
import Contact from './pages/Contact';
import Menu from './pages/Menu';
import ReadBook from './pages/ReadBook';
import './App.css';

export default function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/read/:id" element={<ReadBook />} />
          <Route path="/menu" element={<Menu />} />
        </Routes>
      </div>
    </Router>
  );
}


