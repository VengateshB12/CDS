export const TOURNAMENT_INFO = {
  name: "CDS Turf Cricket Tournament",
  year: 2026,
  date: "August 1, 2026",
  day: "Friday",
  venue: "New OMR Sports Arena",
  venueDetail: "Near Lancor Lumina, Nellikuppam Road",
  startTime: "6:00 AM",
  endTime: "8:30 PM",
};

export const TOURNAMENT_FORMAT = {
  open: {
    label: "Men's Open League",
    emoji: "🏆",
    teams: 8,
    groups: 2,
    teamsPerGroup: 4,
    matchesPerTeam: 3,
    format: "6-over",
    phases: [
      { name: "Group Stage", description: "2 Groups (A & B) — 4 teams each, 3 matches per team" },
      { name: "Semi-Finals", description: "Group A #1 vs Group B #2, Group B #1 vs Group A #2" },
      { name: "Final", description: "Winners of Semi-Finals face off for the Championship" },
    ],
  },
  rising: {
    label: "Men's Rising League",
    emoji: "🤝",
    teams: 7,
    groups: 2,
    teamsPerGroup: "4 & 3",
    matchesPerTeam: 2,
    format: "6-over",
    phases: [
      { name: "Group Stage", description: "2 Groups — 4 teams in A, 3 teams in B, 2 matches per team" },
      { name: "Semi-Finals", description: "Group A #1 vs Group B #2, Group B #1 vs Group A #2" },
      { name: "Final", description: "Winners of Semi-Finals face off for the Championship" },
    ],
  },
  womens: {
    label: "Women's League",
    emoji: "👑",
    teams: 2,
    format: "4-over",
    phases: [
      { name: "Best of 3", description: "First team to win 2 matches becomes Champion" },
    ],
  },
};
