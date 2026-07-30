import { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TournamentFormat from './components/TournamentFormat';
import Rules from './components/Rules';
import Teams from './components/Teams';
import Fixtures from './components/Fixtures';
import Awards from './components/Awards';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import './App.css';

const SECTIONS = ['hero', 'format', 'fixtures', 'teams', 'awards', 'rules'];

function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const observerRef = useRef(null);

  useEffect(() => {
    const handleIntersect = (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (visible.length > 0) {
        setActiveSection(visible[0].target.id);
      }
    };

    observerRef.current = new IntersectionObserver(handleIntersect, {
      rootMargin: '-20% 0px -60% 0px',
      threshold: [0, 0.25, 0.5],
    });

    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        observerRef.current.observe(el);
      }
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  return (
    <>
      <Navbar activeSection={activeSection} />
      <div className="bg-aurora" aria-hidden="true" />
      <div className="bg-dot-grid" aria-hidden="true" />
      <Hero />
      <TournamentFormat />
      <Fixtures />
      <Teams />
      <Awards />
      <Rules />
      <Footer />
      <Chatbot />
    </>
  );
}

export default App;
