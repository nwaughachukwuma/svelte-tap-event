const touchSpot: { x?: number; y?: number } = {};
const TOUCH_POINT_BUFFER = 10;
let tapTouch = false;

export default function touchEvents(node: HTMLElement) {
  node.style.touchAction = "none";
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
        Math.abs(touchSpot.x - e.x) < TOUCH_POINT_BUFFER &&
        Math.abs(touchSpot.y - e.y) < TOUCH_POINT_BUFFER
      ) {
        clickHandler(e);
      }
    }
  }
}

function clickHandler(e: Event, node?: HTMLElement) {
  e.preventDefault();

  if (!tapTouch) {
    const target = node ?? e.target;
    target?.dispatchEvent(
      new CustomEvent("tap", {
        detail: { type: e.type === "pointerleave" ? "touch" : "click" },
      })
    );

    if (e.type !== "click") {
      tapTouch = true;
    }
  }
}
