import { test, expect } from "vitest";
import { renderToString } from "react-dom/server";
import App from "../src/App.jsx";
import { letterGrade } from "../src/grade.js";

test("page renders the title", () => {
  expect(renderToString(<App />)).toContain("Grade Calculator");
});

test("85 is a B", () => {
  expect(letterGrade(85)).toBe("B");
});
