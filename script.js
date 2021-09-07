"user strict";
window.addEventListener("DOMContentLoaded", start);
// const color = "#9f1e1e";

let box;

function start() {
  const colorWheel = document.querySelector("#colorWheel");
  colorWheel.addEventListener("input", pickColor);
  box = document.querySelector(".box");
}
// hexSeoaretColors(color);

function pickColor() {
  const colorValue = this.value;
  boxColor(colorValue);
  showData(`hex`, `HEX:  ${colorValue.toUpperCase()}`);
  hexSeparedColors(colorValue);
}

function hexSeparedColors(hex) {
  if (hex[0] === "#" && hex.length === 7) {
    let hexR = hex.substring(1, 3);
    let hexG = hex.substring(3, 5);
    let hexB = hex.substring(5);
    // console.log({ hexR, hexG, hexB });
    transformHexToRgb(hexR, hexG, hexB);
  } else {
    alert("is not an hexcolor");
  }
}

function transformHexToRgb(hr, hg, hb) {
  r = parseInt(`0x${hr}`, 16);
  g = parseInt(`0x${hg}`, 16);
  b = parseInt(`0x${hb}`, 16);

  showData(`rgb`, `RGB:  ${r}, ${g}, ${b}`);
  transfomRgbToHsl(r, g, b);
}

function transfomRgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  let h, s, l;

  const min = Math.min(r, g, b);
  const max = Math.max(r, g, b);

  if (max === min) {
    h = 0;
  } else if (max === r) {
    h = 60 * (0 + (g - b) / (max - min));
  } else if (max === g) {
    h = 60 * (2 + (b - r) / (max - min));
  } else if (max === b) {
    h = 60 * (4 + (r - g) / (max - min));
  }

  if (h < 0) {
    h = h + 360;
  }

  l = (min + max) / 2;

  if (max === 0 || min === 1) {
    s = 0;
  } else {
    s = (max - l) / Math.min(l, 1 - l);
  }
  // multiply s and l by 100 to get the value in percent, rather than [0,1]
  s *= 100;
  l *= 100;
  //round values
  h = Math.round(h);
  s = Math.round(s);
  l = Math.round(l);

  showData(`hsl`, `HSL:  ${h}, ${s}%, ${l}%`);
}

function showData(pClass, str) {
  document.querySelector(`.${pClass}`).textContent = str;
}

function boxColor(newColor) {
  box.style.backgroundColor = newColor;
}

// function randomColor() {
//   // console.log("randomColor");
//   let colorHex = "#";

//   for (let i = 0; i < 3; i += 1) {
//     let noColor = Math.floor(Math.random() * 255);
//     hexC = noColor.toString(16);
//     if (hexC.length < 2) {
//       hexC += "0";
//     }
//     colorHex += hexC.toString(16);
//     // console.log(colorHex);
//   }
//   colorWheel.value = colorHex;
//   box.style.backgroundColor = colorHex;
// }
// randomBackground();

// function randomBackground() {
//   const rgbObject = randomNumber();

//   const rgbCSS = rgbToCSS(rgbObject);

//   document.querySelector("body").style.backgroundColor = rgbCSS;
// }

// function randomNumber() {
//   let r = Math.floor(Math.random() * 255);
//   let g = Math.floor(Math.random() * 255);
//   let b = Math.floor(Math.random() * 255);

//   return { r, g, b };
// }

// function rgbToCSS(rgb) {
//   console.log("rgbToCSS");
//   const rgbcss = `rgb( ${rgb.r}, ${rgb.g}, ${rgb.b})`;
//   return rgbcss;
// }
