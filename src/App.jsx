import { useState } from "react";
import { letterGrade } from "./grade.js";

export default function App() {
  const [score, setScore] = useState("85");
  let result;
  try {
    result = letterGrade(Number(score));
  } catch (error) {
    result = error.message;
  }
  return (
    <main>
      <h1>Grade Calculator</h1>
      <label>
        Score (0-100):{" "}
        <input value={score} onChange={(e) => setScore(e.target.value)} />
      </label>
      <p>
        Letter grade: <strong>{result}</strong>
      </p>
    </main>
  );
}
