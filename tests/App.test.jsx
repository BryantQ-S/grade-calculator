import { test, expect } from "vitest";
import { renderToString } from "react-dom/server";
import App from "../src/App.jsx";
import { letterGrade, average } from "../src/grade.js";

test("page renders the title", () => {
  expect(renderToString(<App />)).toContain("Grade Calculator");
});

test("85 is a B (valid input)", () => {
  expect(letterGrade(85)).toBe("B");
});

/* test("grade boundaries map to the right letters", () => {
  expect(letterGrade(90)).toBe("A");
  expect(letterGrade(80)).toBe("B");
  expect(letterGrade(70)).toBe("C");
  expect(letterGrade(60)).toBe("D");
  expect(letterGrade(59)).toBe("F");
}); */

/* Invalids
test("invalid scores are rejected", () => {
  expect(() => letterGrade(-1)).toThrow(RangeError);
  expect(() => letterGrade(101)).toThrow(RangeError);
  expect(() => letterGrade("abc")).toThrow(RangeError);
  expect(() => letterGrade(NaN)).toThrow(RangeError);
});

test("average of 80, 90, 100 is 90", () => {
  expect(average([80, 90, 100])).toBe(90);
});

test("average of 80, 90, 100 is 90", () => {
  expect(average([80, 90, 100])).toBe(90);
});

test("average of an empty list is rejected", () => {
  expect(() => average([])).toThrow();
}); */
