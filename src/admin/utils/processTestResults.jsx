// Convert your raw array into a structured object.
export function processTestResults(rawArr) {
  // assume last two entries are:
  // ["Completed Date YYYY-MM-DD", "Completed Time HH:MM:SS"]
  const len = rawArr.length;
  const dateStr = rawArr[len - 2].replace("Completed Date ", "");
  const timeStr = rawArr[len - 1].replace("Completed Time ", "");
  const date = `${dateStr} ${timeStr}`;

  // the rest are scores or NULL
  const scores = rawArr
    .slice(0, len - 2)
    .filter((v) => v !== "Page Refreshed") // drop any non-score markers
    .map((v) => (v === "NULL" ? 0 : parseInt(v, 10)));

  const totalScore = scores.reduce((a, b) => a + b, 0);

  return {
    date,
    totalScore,
    details: scores,
  };
}
