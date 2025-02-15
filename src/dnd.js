import { Mediator } from "./mediator";
import { px, setNodeStyle, translate3d, createDOMNode } from "./utils";

function reset(mediator) {
  document.removeEventListener("mousemove", mediator.receive);
  document.removeEventListener("mouseup", mediator.receive);
  mediator.setState("idle");
  document.body.removeChild(cachedDragImage);
}

function defaultDragImage(node) {
  const clone = node.cloneNode(true);
  setNodeStyle(clone, {
    willChange: "transform",
    position: "fixed",
    pointerEvents: "none",
    top: 0,
    left: 0,
    opacity: 0.5,
  });
  return clone;
}

let cachedCurrentTarget;
let cachedOffsetCoords;
let cachedDragImage;
let cachedCurrentTargetWidth;
let cachedCurrentTargetHeight;
let imageDropShadow;

const dndMediator = new Mediator("idle", {
  idle: {
    async mousedown(evt) {
      evt.preventDefault();
      evt.stopPropagation();

      cachedCurrentTarget = evt.currentTarget;
      const rect = cachedCurrentTarget.getBoundingClientRect();
      const offsetX = evt.clientX - rect.left;
      const offsetY = evt.clientY - rect.top;
      cachedOffsetCoords = [offsetX, offsetY];
      cachedDragImage = defaultDragImage(cachedCurrentTarget);
      cachedCurrentTargetWidth = rect.width;
      cachedCurrentTargetHeight = rect.height;

      setNodeStyle(cachedDragImage, {
        transform: translate3d(rect.left, rect.top),
        width: px(cachedCurrentTargetWidth),
        height: px(cachedCurrentTargetHeight),
      });

      document.addEventListener("mousemove", dndMediator.receive);
      document.addEventListener("mouseup", dndMediator.receive);

      dndMediator.setState("dragging");

      await Promise.resolve();
      document.body.appendChild(cachedDragImage);
    },
  },
  dragging: {
    mousemove(evt) {
      setNodeStyle(cachedDragImage, {
        transform: translate3d(
          evt.clientX - cachedOffsetCoords[0],
          evt.clientY - cachedOffsetCoords[1]
        ),
      });
    },
    mouseup(evt) {
      reset(dndMediator);

      const currentDragArea = evt.currentTarget;

      if (currentDragArea !== cachedCurrentTarget.parentNode && currentDragArea !== document) {
        currentDragArea.removeChild(imageDropShadow);
        cachedCurrentTarget.parentNode.removeChild(cachedCurrentTarget);
        currentDragArea.appendChild(cachedCurrentTarget);
      }
    },
    mouseenter(evt) {
      const currentDragArea = evt.target;
      if (currentDragArea !== cachedCurrentTarget.parentNode && currentDragArea !== document) {
        imageDropShadow = createDOMNode("div", {
          style: {
            backgroundColor: "#c3bdbd",
            boxShadow: '0px 1px 4px rgba(0, 0, 0, 0.05)',
            width: px(cachedCurrentTargetWidth),
            height: px(cachedCurrentTargetHeight),
            opacity: 0.5,
          },
          className: "p-2 rounded-md text-center text-white",
        },"Drop image here");
        currentDragArea.appendChild(imageDropShadow);
      }
    },
    mouseleave(evt) {
      const currentDragArea = evt.target;
      if (currentDragArea !== cachedCurrentTarget.parentNode && currentDragArea !== document) {
        currentDragArea.removeChild(imageDropShadow);
      }
    },
  },
});

export function onDrag(evt) {
  dndMediator.receive(evt);
}
