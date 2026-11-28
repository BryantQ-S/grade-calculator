export function letterGrade(score) {
  if (
    typeof score !== "number" ||
    Number.isNaN(score) ||
    score < 0 ||
    score > 100
  ) {
    throw new RangeError("Score must be a number from 0 to 100");
  }
  /*if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
}

export function average(scores) {
  if (!Array.isArray(scores) || scores.length === 0) {
    throw new Error("Provide at least one score");
  }
  const total = scores.reduce((sum, s) => sum + s, 0);
  return total / scores.length;
} 
