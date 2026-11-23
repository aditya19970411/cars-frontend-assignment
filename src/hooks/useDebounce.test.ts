import { renderHook, act } from "@testing-library/react";
import { useDebounce } from "./useDebounce";

describe("useDebounce hook", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("returns initial value immediately", () => {
    const { result } = renderHook(() => useDebounce("Audi", 300));
    expect(result.current).toBe("Audi");
  });

  it("updates value only after delay has elapsed", () => {
    const { result, rerender } = renderHook(
      ({ val, delay }) => useDebounce(val, delay),
      { initialProps: { val: "A", delay: 300 } }
    );

    rerender({ val: "A3", delay: 300 });
    expect(result.current).toBe("A");

    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(result.current).toBe("A");

    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(result.current).toBe("A3");
  });

  it("resets delay timer when value changes rapidly", () => {
    const { result, rerender } = renderHook(
      ({ val }) => useDebounce(val, 300),
      { initialProps: { val: "Q" } }
    );

    act(() => {
      jest.advanceTimersByTime(200);
    });
    rerender({ val: "Q5" });

    act(() => {
      jest.advanceTimersByTime(200);
    });
    expect(result.current).toBe("Q");

    act(() => {
      jest.advanceTimersByTime(100);
    });
    expect(result.current).toBe("Q5");
  });
});
