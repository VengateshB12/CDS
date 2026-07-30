import { FaChevronUp } from 'react-icons/fa';
import { TOURNAMENT_INFO } from '../data/tournament';
import './Footer.css';

export default function Footer() {
  const handleBackToTop = () => {
    const hero = document.getElementById('hero');
    if (hero) {
      hero.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer">
      <div className="footer-inner">
        <h3 className="footer-title">
          {TOURNAMENT_INFO.name} {TOURNAMENT_INFO.year}
        </h3>
        <p className="footer-info">
          {TOURNAMENT_INFO.venue} &middot; {TOURNAMENT_INFO.date}
        </p>

        <button className="footer-back-to-top" onClick={handleBackToTop}>
          <FaChevronUp />
          <span>Back to Top</span>
        </button>

        <p className="footer-credit">Made with love for CDS</p>
      </div>
    </footer>
  );
}
