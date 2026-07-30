import './TeamCard.css';

const GROUP_BADGE_MAP = {
  OA: { label: 'Open A', cls: 'badge-oa' },
  OB: { label: 'Open B', cls: 'badge-ob' },
  RA: { label: 'Rising A', cls: 'badge-ra' },
  RB: { label: 'Rising B', cls: 'badge-rb' },
  W:  { label: "Women's", cls: 'badge-w' },
};

export default function TeamCard({ team, group, index = 0 }) {
  const badge = GROUP_BADGE_MAP[group] || { label: group, cls: 'badge-oa' };
  const totalPlayers = (team.captain ? 1 : 0) + team.players.length;

  return (
    <div
      className="team-card team-card--animated"
      style={{ animationDelay: `${index * 0.04}s` }}
    >
      <div className="team-card-header">
        <span className={`badge ${badge.cls}`}>{badge.label}</span>
        <span className="team-card-player-count">
          {totalPlayers} player{totalPlayers !== 1 ? 's' : ''}
        </span>
      </div>

      <h3 className="team-card-name">{team.name}</h3>

      {team.tagline && (
        <p className="team-card-tagline">{team.tagline}</p>
      )}

      {team.captain && (
        <div className="team-card-captain">
          <span className="captain-badge">C</span>
          <span>{team.captain.name}</span>
        </div>
      )}

      {team.players.length > 0 && (
        <div className="team-card-players">
          <span className="team-card-players-title">Squad</span>
          {team.players.map((p, i) => (
            <span key={i} className="team-card-player">{p.name}</span>
          ))}
        </div>
      )}
    </div>
  );
}
