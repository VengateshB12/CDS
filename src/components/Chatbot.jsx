import { useState, useRef, useEffect } from 'react';
import { HiChat, HiX } from 'react-icons/hi';
import { OPEN_LEAGUE, RISING_LEAGUE, WOMENS_LEAGUE } from '../data/teams';
import { FIXTURES } from '../data/fixtures';
import { MENS_RULES, WOMENS_RULES, GENERAL_GUIDELINES } from '../data/rules';
import { TEAM_AWARDS, INDIVIDUAL_AWARDS } from '../data/awards';
import { TOURNAMENT_INFO, TOURNAMENT_FORMAT } from '../data/tournament';
import './Chatbot.css';

function getAllTeams() {
  const teams = [];
  Object.entries(OPEN_LEAGUE.groups).forEach(([g, group]) => {
    group.teams.forEach((t) => teams.push({ ...t, group: g, league: 'Open' }));
  });
  Object.entries(RISING_LEAGUE.groups).forEach(([g, group]) => {
    group.teams.forEach((t) => teams.push({ ...t, group: g, league: 'Rising' }));
  });
  WOMENS_LEAGUE.teams.forEach((t) => teams.push({ ...t, group: 'W', league: "Women's" }));
  return teams;
}

const ALL_TEAMS = getAllTeams();

function findTeamByQuery(query) {
  const q = query.toLowerCase();
  let best = null;
  let bestLen = 0;
  for (const team of ALL_TEAMS) {
    if (team.name.toLowerCase() === q) return team;
    if (q.includes(team.name.toLowerCase()) || team.name.toLowerCase().includes(q)) return team;
  }
  for (const team of ALL_TEAMS) {
    const words = team.name.toLowerCase().split(/\s+/).filter((w) => w.length > 2);
    for (const word of words) {
      if (q.includes(word) && word.length > bestLen) {
        best = team;
        bestLen = word.length;
      }
    }
  }
  return best;
}

function getTeamFixturesByTeamObj(team) {
  const nameWords = team.name.toLowerCase().split(/\s+/).filter((w) => w.length > 3);
  return FIXTURES.filter((f) => {
    if (f.stage !== 'league') return false;
    const a = f.teamA.toLowerCase();
    const b = (f.teamB || '').toLowerCase();
    const tn = team.name.toLowerCase();
    if (a === tn || b === tn) return true;
    if (a.includes(tn) || b.includes(tn)) return true;
    if (tn.includes(a) || (f.teamB && tn.includes(b))) return true;
    return nameWords.some((w) => a.includes(w) || b.includes(w));
  });
}

function findPlayerTeam(query) {
  const q = query.toLowerCase();
  for (const team of ALL_TEAMS) {
    if (team.captain && team.captain.name.toLowerCase().includes(q)) {
      return { team, player: team.captain, role: 'Captain' };
    }
    for (const p of team.players) {
      if (p.name.toLowerCase().includes(q)) {
        return { team, player: p, role: 'Player' };
      }
    }
  }
  return null;
}

function formatFixture(f) {
  if (f.stage === 'ceremony') return `Match ${f.match} | ${f.time} — ${f.teamA}`;
  if (f.stage === 'women') return `Match ${f.match} | ${f.time} — ${f.teamA}`;
  return `Match ${f.match} | ${f.time} — ${f.teamA} vs ${f.teamB} (${f.group})`;
}

function getResponse(input) {
  const q = input.toLowerCase().trim();

  if (/^(hi+|hello|hey|hai|hii|yo|sup)$/i.test(q)) {
    return "Hey! Welcome to CDS Turf Cricket Tournament 2026! Ask me about teams, fixtures, rules, awards, or timings.";
  }

  if (q.includes('venue') || q.includes('location') || q.includes('where') || q.includes('ground') || q.includes('arena')) {
    return `The tournament is at **${TOURNAMENT_INFO.venue}**, ${TOURNAMENT_INFO.venueDetail}. Date: **${TOURNAMENT_INFO.date}** (${TOURNAMENT_INFO.day}), ${TOURNAMENT_INFO.startTime} to ${TOURNAMENT_INFO.endTime}.`;
  }

  if ((q.includes('first match') || q.includes('match is first') || q.includes('match first')) && !q.includes('fixture')) {
    const first = FIXTURES.find((f) => f.stage === 'league');
    if (first) {
      return `The first match is **Match ${first.match}** at **${first.time}** — **${first.teamA}** vs **${first.teamB}** (${first.group}).`;
    }
  }

  if (q.includes('next match') || q.includes('match is next') || q.includes('match next') || q.includes('upcoming match')) {
    const leagueMatches = FIXTURES.filter((f) => f.stage === 'league');
    const first = leagueMatches[0];
    const second = leagueMatches[1];
    return `**Next up:**\n**Match ${first.match}** at **${first.time}** — ${first.teamA} vs ${first.teamB} (${first.group})\n\n**After that:**\n**Match ${second.match}** at **${second.time}** — ${second.teamA} vs ${second.teamB} (${second.group})\n\nThe tournament hasn't started yet — all matches are upcoming! Check the fixtures section for the full schedule.`;
  }

  if (q.includes('last match') || (q.includes('final match') && !q.includes('semi'))) {
    const last = FIXTURES[FIXTURES.length - 1];
    return `Last event: **Match ${last.match}** at **${last.time}** — ${last.teamA}`;
  }

  if (q.includes('fixture') || q.includes('match')) {
    const team = findTeamByQuery(q);
    if (team && !q.includes('how many') && !q.includes('total') && !q.includes('all') && !q.includes('list')) {
      const teamFixtures = getTeamFixturesByTeamObj(team);
      if (teamFixtures.length > 0) {
        return `**Fixtures for ${team.name}** (${team.group} — ${team.league} League):\n\n${teamFixtures.map(formatFixture).join('\n')}`;
      }
      return `No group stage fixtures found for **${team.name}**. They may play in knockouts if they qualify!`;
    }
  }

  if (q.includes('when') || q.includes('date') || q.includes('time') || q.includes('day')) {
    if (q.includes('start')) {
      return `The tournament starts at **${TOURNAMENT_INFO.startTime}** on **${TOURNAMENT_INFO.date}** (${TOURNAMENT_INFO.day}).`;
    }
    if (q.includes('end') || q.includes('finish')) {
      return `The tournament ends around **${TOURNAMENT_INFO.endTime}** with the Men's Trophy Distribution.`;
    }
    if (q.includes('final')) {
      const finals = FIXTURES.filter((f) => f.stage === 'final');
      return `Finals schedule:\n${finals.map(formatFixture).join('\n')}`;
    }
    if (q.includes('semi')) {
      const semis = FIXTURES.filter((f) => f.stage === 'semi');
      return `Semi-Finals schedule:\n${semis.map(formatFixture).join('\n')}`;
    }
    return `**${TOURNAMENT_INFO.date}** (${TOURNAMENT_INFO.day})\nStarts: ${TOURNAMENT_INFO.startTime} | Ends: ${TOURNAMENT_INFO.endTime}\nVenue: ${TOURNAMENT_INFO.venue}`;
  }

  if (q.includes('how many team') || q.includes('total team') || q.includes('all team') || q.includes('list team') || (q.includes('team') && q.includes('name'))) {
    const teamNames = ALL_TEAMS.map((t) => `• ${t.name} (${t.group})`).join('\n');
    return `There are **${ALL_TEAMS.length} teams** across 5 groups:\n\n${teamNames}`;
  }

  if (q.includes('how many match') || q.includes('total match') || q.includes('how many fixture')) {
    const leagueCount = FIXTURES.filter((f) => f.stage === 'league').length;
    const semiCount = FIXTURES.filter((f) => f.stage === 'semi').length;
    const finalCount = FIXTURES.filter((f) => f.stage === 'final').length;
    const womenCount = FIXTURES.filter((f) => f.stage === 'women').length;
    return `There are **${FIXTURES.length} scheduled slots**:\n• ${leagueCount} group stage matches\n• ${semiCount} semi-finals\n• ${finalCount} finals\n• ${womenCount} women's matches\n• 2 trophy ceremonies`;
  }

  if (q.includes('open league') || q.includes('open a') || q.includes('open b') || q.includes('group oa') || q.includes('group ob')) {
    const groups = Object.entries(OPEN_LEAGUE.groups);
    let resp = `**Men's Open League** — ${TOURNAMENT_FORMAT.open.teams} teams, ${TOURNAMENT_FORMAT.open.format} format:\n\n`;
    groups.forEach(([key, group]) => {
      resp += `**${key} (${group.label}):**\n`;
      group.teams.forEach((t) => { resp += `• ${t.name} (C: ${t.captain?.name || 'TBD'})\n`; });
      resp += '\n';
    });
    return resp.trim();
  }

  if (q.includes('rising league') || q.includes('rising a') || q.includes('rising b') || q.includes('group ra') || q.includes('group rb')) {
    const groups = Object.entries(RISING_LEAGUE.groups);
    let resp = `**Men's Rising League** — ${TOURNAMENT_FORMAT.rising.teams} teams, ${TOURNAMENT_FORMAT.rising.format} format:\n\n`;
    groups.forEach(([key, group]) => {
      resp += `**${key} (${group.label}):**\n`;
      group.teams.forEach((t) => { resp += `• ${t.name} (C: ${t.captain?.name || 'TBD'})\n`; });
      resp += '\n';
    });
    return resp.trim();
  }

  if (q.includes('women') && (q.includes('team') || q.includes('league') || q.includes('match'))) {
    const womenFixtures = FIXTURES.filter((f) => f.stage === 'women');
    let resp = `**Women's League** — ${TOURNAMENT_FORMAT.womens.format} format, Best of 3:\n\n`;
    WOMENS_LEAGUE.teams.forEach((t) => {
      const players = t.players.map((p) => p.name).join(', ');
      resp += `**${t.name}**\nCaptain: ${t.captain?.name || 'TBD'} | Players: ${players}\n\n`;
    });
    resp += `Schedule:\n${womenFixtures.map(formatFixture).join('\n')}`;
    return resp;
  }

  if (q.includes('fixture') || q.includes('schedule') || q.includes('match list')) {
    if (q.includes('group stage') || q.includes('league stage')) {
      const league = FIXTURES.filter((f) => f.stage === 'league');
      return `**Group Stage** — ${league.length} matches:\n${league.map(formatFixture).join('\n')}`;
    }
    return `The tournament has **${FIXTURES.length} slots**. Ask me about:\n• "fixtures for [team name]"\n• "group stage fixtures"\n• "semi final timings"\n• "final schedule"\n• "women's matches"\n• "who's match is first?"`;
  }

  if (q.includes('semi') || q.includes('semifinal') || q.includes('semi-final') || q.includes('knockout')) {
    const semis = FIXTURES.filter((f) => f.stage === 'semi');
    return `**Semi-Finals** — ${semis.length} matches:\n${semis.map(formatFixture).join('\n')}`;
  }

  if (q.includes('final') && !q.includes('semi')) {
    const finals = FIXTURES.filter((f) => f.stage === 'final');
    return `**Finals:**\n${finals.map(formatFixture).join('\n')}`;
  }

  if (q.includes('award') || q.includes('prize') || q.includes('trophy')) {
    let resp = '**Team Awards:**\n';
    TEAM_AWARDS.forEach((a) => { resp += `• ${a.name} — ${a.description}\n`; });
    resp += '\n**Individual Awards:**\n';
    INDIVIDUAL_AWARDS.forEach((a) => { resp += `• ${a.name} — ${a.description}\n`; });
    return resp.trim();
  }

  if (q.includes('rule') || q.includes('regulation') || q.includes('guideline')) {
    if (q.includes('women')) {
      let resp = "**Women's Tournament Rules:**\n\n";
      WOMENS_RULES.forEach((cat) => {
        resp += `**${cat.heading}:**\n`;
        cat.items.forEach((item) => { resp += `• ${item}\n`; });
        resp += '\n';
      });
      return resp.trim();
    }
    if (q.includes('general')) {
      return `**General Guidelines:**\n${GENERAL_GUIDELINES.map((g) => `• ${g}`).join('\n')}`;
    }
    if (q.includes('bowling') || q.includes('fielding')) {
      const cat = MENS_RULES.find((c) => c.heading.toLowerCase().includes('fielding'));
      if (cat) return `**${cat.heading}:**\n${cat.items.map((i) => `• ${i}`).join('\n')}`;
    }
    if (q.includes('scoring') || q.includes('run') || q.includes('boundary')) {
      const cat = MENS_RULES.find((c) => c.heading.toLowerCase().includes('scoring'));
      if (cat) return `**${cat.heading}:**\n${cat.items.map((i) => `• ${i}`).join('\n')}`;
    }
    let resp = "**Men's Tournament Rules** (key points):\n\n";
    MENS_RULES.forEach((cat) => {
      resp += `**${cat.heading}:** ${cat.items[0]}\n`;
    });
    resp += '\nAsk "women\'s rules", "scoring rules", or "fielding rules" for details.';
    return resp;
  }

  if (q.includes('format') || q.includes('structure') || q.includes('how does') || q.includes('how the tournament')) {
    return `**Tournament Format:**\n\n**Open League** — ${TOURNAMENT_FORMAT.open.teams} teams, ${TOURNAMENT_FORMAT.open.format}: Group Stage > Semis > Final\n**Rising League** — ${TOURNAMENT_FORMAT.rising.teams} teams, ${TOURNAMENT_FORMAT.rising.format}: Group Stage > Semis > Final\n**Women's League** — ${TOURNAMENT_FORMAT.womens.teams} teams, ${TOURNAMENT_FORMAT.womens.format}: Best of 3`;
  }

  if (q.includes('captain')) {
    const captains = ALL_TEAMS
      .filter((t) => t.captain)
      .map((t) => `• ${t.captain.name} — ${t.name} (${t.group})`)
      .join('\n');
    return `**All Captains:**\n${captains}`;
  }

  const playerResult = findPlayerTeam(q);
  if (playerResult) {
    const { team, player, role } = playerResult;
    const teamFixtures = getTeamFixturesByTeamObj(team);
    let resp = `**${player.name}** is the ${role} of **${team.name}** (${team.group} — ${team.league} League).`;
    if (teamFixtures.length > 0) {
      resp += `\n\nTheir matches:\n${teamFixtures.map(formatFixture).join('\n')}`;
    }
    return resp;
  }

  const matchedTeam = findTeamByQuery(q);
  if (matchedTeam) {
    const players = matchedTeam.players.map((p) => p.name).join(', ');
    const teamFixtures = getTeamFixturesByTeamObj(matchedTeam);
    let resp = `**${matchedTeam.name}** (${matchedTeam.group} — ${matchedTeam.league} League)\nCaptain: ${matchedTeam.captain?.name || 'TBD'}\nPlayers: ${players || 'TBD'}`;
    if (matchedTeam.tagline) resp += `\nTagline: "${matchedTeam.tagline}"`;
    if (teamFixtures.length > 0) {
      resp += `\n\n**Fixtures:**\n${teamFixtures.map(formatFixture).join('\n')}`;
    }
    return resp;
  }

  const timeMatch = q.match(/(\d{1,2}[:\s]?\d{0,2}\s*(?:am|pm))/i);
  if (timeMatch) {
    const matches = FIXTURES.filter((f) => f.time.toLowerCase().includes(timeMatch[1].replace(/\s+/g, ' ').toLowerCase()));
    if (matches.length > 0) {
      return `Matches at ${timeMatch[1]}:\n${matches.map(formatFixture).join('\n')}`;
    }
    return `No matches found at ${timeMatch[1]}.`;
  }

  const groupMatch = q.match(/\b(oa|ob|ra|rb)\b/i);
  if (groupMatch) {
    const gKey = groupMatch[1].toUpperCase();
    const gFixtures = FIXTURES.filter((f) => f.group === gKey);
    const gTeams = ALL_TEAMS.filter((t) => t.group === gKey);
    let resp = `**Group ${gKey}** — ${gTeams.length} teams:\n`;
    gTeams.forEach((t) => { resp += `• ${t.name} (C: ${t.captain?.name || 'TBD'})\n`; });
    if (gFixtures.length > 0) {
      resp += `\n**${gFixtures.length} matches:**\n${gFixtures.map(formatFixture).join('\n')}`;
    }
    return resp;
  }

  return "I'm your CDS Cricket Tournament assistant! I can help with:\n\n• **Teams** — \"tell me about Thambi Thappu\"\n• **Fixtures** — \"fixtures for TVK\", \"who's match is first?\"\n• **Rules** — \"what are the rules?\"\n• **Awards** — \"what awards are there?\"\n• **Format** — \"how does the tournament work?\"\n• **Players** — \"which team is Vengatesh in?\"\n• **Venue** — \"where is the tournament?\"";
}

function formatMessageText(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>;
    }
    return part;
  });
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: 'bot',
      text: "Hey! I'm the CDS Cricket Bot. Ask me about teams, fixtures, rules, or timings!",
    },
  ]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSend = () => {
    const trimmed = input.trim();
    if (!trimmed) return;

    const userMsg = { from: 'user', text: trimmed };
    const botMsg = { from: 'bot', text: getResponse(trimmed) };
    setMessages((prev) => [...prev, userMsg, botMsg]);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      <button
        className="chatbot-fab"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        {isOpen ? <HiX size={24} /> : <HiChat size={24} />}
        {!isOpen && <span className="chatbot-fab-pulse" />}
      </button>

      {isOpen && (
        <div className="chatbot-panel chatbot-panel--open">
          <div className="chatbot-header">
            <div className="chatbot-header-info">
              <span className="chatbot-header-dot" />
              <span className="chatbot-header-title">CDS Cricket Bot</span>
            </div>
            <span className="chatbot-header-sub">Ask about teams, fixtures, rules</span>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chatbot-msg chatbot-msg--${msg.from}`}>
                <div className={`chatbot-bubble chatbot-bubble--${msg.from}`}>
                  {msg.text.split('\n').map((line, j) => (
                    <span key={j}>
                      {formatMessageText(line)}
                      {j < msg.text.split('\n').length - 1 && <br />}
                    </span>
                  ))}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input-row">
            <input
              ref={inputRef}
              className="chatbot-input"
              type="text"
              placeholder="Ask about teams, fixtures, rules..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button className="chatbot-send" onClick={handleSend} disabled={!input.trim()}>
              ➤
            </button>
          </div>
        </div>
      )}
    </>
  );
}
