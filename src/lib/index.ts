const touchSpot: { x?: number; y?: number } = {};
const TOUCH_POINT_BUFFER = 10;

export default function touchEvents(node: HTMLElement) {
  node.addEventListener("pointerenter", pointerEnterHandler);
  node.addEventListener("pointerleave", pointerLeaveHandler);
  node.addEventListener("click", clickHandler);

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

  e.target?.dispatchEvent(new CustomEvent("touchenter"));
}

function pointerLeaveHandler(e: PointerEvent) {
  e.preventDefault();
  if (e.pointerType === "touch") {
    if (touchSpot.x && touchSpot.y) {
      if (
        Math.abs(touchSpot.x - e.x) < TOUCH_POINT_BUFFER &&
        Math.abs(touchSpot.y - e.y) < TOUCH_POINT_BUFFER
      ) {
        return clickHandler(e);
      }
    }
  }

  e.target?.dispatchEvent(new CustomEvent("touchleave"));
}

function clickHandler(e: Event) {
  e.preventDefault();
  e.target?.dispatchEvent(new CustomEvent("tap"));
}
