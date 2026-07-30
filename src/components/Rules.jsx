import { useState } from 'react';
import ScrollReveal from './ScrollReveal';
import { MENS_RULES, WOMENS_RULES, GENERAL_GUIDELINES } from '../data/rules';
import './Rules.css';

const TABS = [
  { key: 'mens', label: "Men's Tournament" },
  { key: 'womens', label: "Women's Tournament" },
];

export default function Rules() {
  const [activeTab, setActiveTab] = useState('mens');
  const rules = activeTab === 'mens' ? MENS_RULES : WOMENS_RULES;

  return (
    <section id="rules" className="section">
      <ScrollReveal>
        <div className="section-header">
          <h2>Tournament Rules</h2>
          <p>Fair play, clear rules, great cricket</p>
          <span className="section-header-bar" />
        </div>
      </ScrollReveal>

      <div className="rules-guidelines">
        <h3 className="rules-category-heading">General Guidelines</h3>
        <ul className="rules-list">
          {GENERAL_GUIDELINES.map((item, i) => (
            <li key={i} className="rules-item">
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="rules-toggle">
        {TABS.map((tab) => (
          <button
            key={tab.key}
            className={`rules-toggle-tab${activeTab === tab.key ? ' active' : ''}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {activeTab === tab.key && (
              <span className="rules-toggle-indicator" />
            )}
            <span className="rules-toggle-label">{tab.label}</span>
          </button>
        ))}
      </div>

      <div key={activeTab} className="rules-content rules-content--animated">
        {rules.map((category) => (
          <div className="rules-category" key={category.heading}>
            <h3 className="rules-category-heading">{category.heading}</h3>
            <ul className="rules-list">
              {category.items.map((item, i) => (
                <li key={i} className="rules-item rules-item--animated" style={{ animationDelay: `${i * 0.04}s` }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
