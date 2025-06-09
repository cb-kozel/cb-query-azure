import { expect, afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// Extend expect with custom matchers
expect.extend({
  // Add custom matchers here if needed
});

// Cleanup after each test case (e.g. clearing jsdom)
afterEach(() => {
  cleanup();
});
