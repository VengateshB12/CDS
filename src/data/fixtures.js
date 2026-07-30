export const FIXTURES = [
  { match: 1, time: "6:00 AM", group: "OA", teamA: "Irukra prechanaila ivanunga vera", teamB: "Raththa Kothippu", stage: "league" },
  { match: 2, time: "6:30 AM", group: "RA", teamA: "Kattavandi", teamB: "Ethukuda avana thotta", stage: "league" },
  { match: 3, time: "7:00 AM", group: "OB", teamA: "TVK", teamB: "Thambi Thappu", stage: "league" },
  { match: 4, time: "7:30 AM", group: "RB", teamA: "Adchu Thooku Saami", teamB: "Idiyappam", stage: "league" },
  { match: 5, time: "8:00 AM", group: "OA", teamA: "Irunga Bhai", teamB: "Ittunu vandhu ittunnu povom", stage: "league" },
  { match: 6, time: "8:30 AM", group: "OB", teamA: "The Seven", teamB: "Chandra Super Kings", stage: "league" },
  { match: 7, time: "9:00 AM", group: "RA", teamA: "#OM.Kaali Opponent Gaali", teamB: "Valicha Solla Pothu Gomathi", stage: "league" },
  { match: 8, time: "9:30 AM", group: "OA", teamA: "Irukra prechanaila ivanunga vera", teamB: "Irunga Bhai", stage: "league" },
  { match: 9, time: "10:00 AM", group: "OB", teamA: "TVK", teamB: "The Seven", stage: "league" },
  { match: 10, time: "10:30 AM", group: "RB", teamA: "Idiyappam", teamB: "404 - Team ah kanom", stage: "league" },
  { match: 11, time: "11:00 AM", group: "OA", teamA: "Raththa Kothippu", teamB: "Ittunu vandhu ittunnu povom", stage: "league" },
  { match: 12, time: "11:30 AM", group: "OB", teamA: "Thambi Thappu", teamB: "Chandra Super Kings", stage: "league" },
  { match: 13, time: "12:00 PM", group: "RA", teamA: "Kattavandi", teamB: "Valicha Solla Pothu Gomathi", stage: "league" },
  { match: 14, time: "12:30 PM", group: "OA", teamA: "Irukra prechanaila ivanunga vera", teamB: "Ittunu vandhu ittunnu povom", stage: "league" },
  { match: 15, time: "1:00 PM", group: "OB", teamA: "TVK", teamB: "Chandra Super Kings", stage: "league" },
  { match: 16, time: "1:30 PM", group: "RB", teamA: "Adchu Thooku Saami", teamB: "404 - Team ah kanom", stage: "league" },
  { match: 17, time: "2:00 PM", group: "OA", teamA: "Raththa Kothippu", teamB: "Irunga Bhai", stage: "league" },
  { match: 18, time: "2:30 PM", group: "RA", teamA: "Ethukuda avana thotta", teamB: "#OM.Kaali Opponent Gaali", stage: "league" },
  { match: 19, time: "3:00 PM", group: "OB", teamA: "Thambi Thappu", teamB: "The Seven", stage: "league" },
  { match: 20, time: "3:30 PM", group: "W", teamA: "Women's Match 1", teamB: "", stage: "women" },
  { match: 21, time: "4:00 PM", group: "SF-R", teamA: "RA #1", teamB: "RB #2", stage: "semi" },
  { match: 22, time: "4:30 PM", group: "W", teamA: "Women's Match 2", teamB: "", stage: "women" },
  { match: 23, time: "5:00 PM", group: "SF-O", teamA: "OA #1", teamB: "OB #2", stage: "semi" },
  { match: 24, time: "5:30 PM", group: "W", teamA: "Women's Match 3 (if needed)", teamB: "", stage: "women" },
  { match: 25, time: "6:00 PM", group: "SF-R", teamA: "RA #2", teamB: "RB #1", stage: "semi" },
  { match: 26, time: "6:30 PM", group: "SF-O", teamA: "OA #2", teamB: "OB #1", stage: "semi" },
  { match: 27, time: "7:00 PM", group: null, teamA: "Women's League Trophy Distribution", teamB: null, stage: "ceremony" },
  { match: 28, time: "7:30 PM", group: "RF", teamA: "Rising SF1 Winner", teamB: "Rising SF2 Winner", stage: "final" },
  { match: 29, time: "8:00 PM", group: "OF", teamA: "Open SF1 Winner", teamB: "Open SF2 Winner", stage: "final" },
  { match: 30, time: "8:30 PM", group: null, teamA: "Men's League Trophy Distribution", teamB: null, stage: "ceremony" },
];

export const STAGE_LABELS = {
  league: "Group Stage",
  semi: "Semi Finals",
  final: "Finals",
  women: "Women's League",
  ceremony: "Trophy Distribution",
};

export const STAGE_ORDER = ["league", "women", "semi", "final", "ceremony"];

export function isPlaceholder(name) {
  if (!name) return true;
  return /^[A-Z]{1,3}\s?#\d$/.test(name) || name.includes("Winner") || name.includes("Q1") || name.includes("Q2");
}
