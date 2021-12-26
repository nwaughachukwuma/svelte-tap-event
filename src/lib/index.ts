export default function touchEvents(node: HTMLElement) {
  node.style.touchAction = "none";

  const touchSpot: { x?: number; y?: number } = {};
  const TOUCH_POINT_BUFFER = 10;
  let tapTouch = false;

  function pointerEnterHandler(e: PointerEvent) {
    e.preventDefault();
    touchSpot.x = e.x;
    touchSpot.y = e.y;
    tapTouch = false;
  }

  function pointerLeaveHandler(e: PointerEvent) {
    e.preventDefault();

    if (e.pointerType === "touch") {
      if (touchSpot.x && touchSpot.y) {
        if (
          touchWithinRange(touchSpot.x, e.x) &&
          touchWithinRange(touchSpot.y, e.y)
        ) {
          clickHandler(e);
        }
      }
    }
  }

  function touchWithinRange(p1: number, p2: number) {
    return Math.abs(p1 - p2) < TOUCH_POINT_BUFFER;
  }

  function clickHandler(e: Event, node?: HTMLElement) {
    e.preventDefault();

    if (!tapTouch) {
      const target = node ?? e.target;
      dispatchTap(e, target);

      if (e.type === "pointerleave") {
        tapTouch = true;
      }
    }
  }

  function dispatchTap(e: Event, target: EventTarget | null) {
    const detail = { type: e.type === "pointerleave" ? "touch" : "click" };
    target?.dispatchEvent(new CustomEvent("tap", { detail }));
  }

  node.addEventListener("pointerenter", pointerEnterHandler);
  node.addEventListener("pointerleave", pointerLeaveHandler);
  node.addEventListener("click", (e) => clickHandler(e, node));

  return {
    destroy() {
      node.removeEventListener("pointerenter", pointerEnterHandler);
      node.removeEventListener("pointerleave", pointerLeaveHandler);
      node.removeEventListener("click", clickHandler);
    },
  };
}
