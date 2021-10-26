let hovering = false;
let tap = false;
const touchSpot: { x?: number; y?: number } = {};
const TOUCH_POINT_BUFFER = 10;

type Param = {
  hovering: boolean;
  tap: boolean;
};

export default function touchEvents(node: HTMLElement) {
  node.addEventListener("pointerenter", pointerEnterHandler);
  node.addEventListener("pointerleave", pointerLeaveHandler);
  node.addEventListener("click", clickHandler);

  return {
    update(fn: (param: Param) => void) {
      fn({ hovering, tap });
    },

    destroy() {
      node.removeEventListener("pointerenter", pointerEnterHandler);
      node.removeEventListener("pointerleave", pointerLeaveHandler);
      node.removeEventListener("click", clickHandler);
    },
  };
}

function pointerEnterHandler(e: PointerEvent) {
  e.preventDefault();
  hovering = true;
  tap = false;

  touchSpot.x = e.x;
  touchSpot.y = e.y;
}

function pointerLeaveHandler(e: PointerEvent) {
  e.preventDefault();
  hovering = false;
  tap = false;

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

function clickHandler(e: Event) {
  e.preventDefault();
  hovering = false;
  tap = true;
}
