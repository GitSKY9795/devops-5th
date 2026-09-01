import assert from "node:assert/strict";
import test from "node:test";

import { add, formatTotal } from "./calculator.js";

test("add returns the sum of two numbers", () => {
  assert.equal(add(2, 3), 5);
});

test("formatTotal returns a two-decimal currency string", () => {
  assert.equal(
    formatTotal([
      { price: 3.5 },
      { price: 2 }
    ]),
    "$5.50"
  );
});
