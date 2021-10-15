import "./style.css";
import { createDOMNode } from "./utils";
import { onDrag } from "./dnd";

const dragme = createDOMNode(
  "div",
  {
    onmousedown: onDrag,
    className: "p-2 bg-indigo-500 text-white rounded-md cursor-pointer",
  },
  "Drag me"
);

const dragAreaA = document.querySelector("#drop-area-a");
const dragAreaB = document.querySelector("#drop-area-b");

dragAreaA.appendChild(dragme);

dragAreaA.addEventListener('mouseup', onDrag);
dragAreaB.addEventListener('mouseenter', onDrag);
dragAreaB.addEventListener('mouseleave', onDrag);
