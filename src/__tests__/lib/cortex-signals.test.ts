import { describe, it, expect, vi } from "vitest";
import { emitPrismSignal } from "@/lib/cbse-class-12-mathematics/cortex-signals";

describe("PRISM Signals", () => {
  it("dispatches custom event on window", () => {
    const spy = vi.fn();
    window.addEventListener("koydo:prism-signal", spy);
    emitPrismSignal({ eventType: "question_answered", activityType: "cbse-class-12-mathematics" });
    expect(spy).toHaveBeenCalled();
    window.removeEventListener("koydo:prism-signal", spy);
  });

  it("includes correct event detail", () => {
    let detail: unknown;
    const handler = (e: Event) => { detail = (e as CustomEvent).detail; };
    window.addEventListener("koydo:prism-signal", handler);
    emitPrismSignal({ eventType: "exam_started", value: 1, activityType: "cbse-class-12-mathematics" });
    expect(detail).toEqual({ eventType: "exam_started", value: 1, activityType: "cbse-class-12-mathematics" });
    window.removeEventListener("koydo:prism-signal", handler);
  });
});
