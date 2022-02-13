const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");
const claerbtn = document.getElementById("jsClear");

const INITTIAL_COLOR = "#2c2c2c";

canvas.width = 700;
canvas.height = 700;

ctx.fillStyle = "white";
ctx.strokeStyle = INITTIAL_COLOR;
ctx.lineWidth = 2.5;
ctx.fillStyle = INITTIAL_COLOR;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  // offsetX, offsetY : canvas 안에서의 마우스 위치 값
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function changeColor(event) {
  console.log(event.target.style);
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, 700, 700);
  }
}

//우클릭 저장 방지
function handleCM(event) {
  event.preventDefault();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleCM);
}

console.log(Array.from(colors)); //array.from 메소드는 object로 부터 array를 만듬

Array.from(colors).forEach((che) => che.addEventListener("click", changeColor));

function handleRangeChange(event) {
  console.log(event.target.value);
  ctx.lineWidth = event.target.value;
}

if (range) {
  range.addEventListener("input", handleRangeChange);
}

function handleModeClick() {
  if (filling === true) {
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "PAINT";
  }
}

function saveClick() {
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image; // hrek는 image()
  link.download = "paintJS[EXPORT]";
  link.click();
}

function clearImage() {
  ctx.clearRect(0, 0, 700, 700);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}

if (saveBtn) {
  saveBtn.addEventListener("click", saveClick);
}

if (claerbtn) {
  claerbtn.addEventListener("click", clearImage);
}
