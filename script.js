"user strict";

// const color = "#9f1e1e";

const colorWheel = document.querySelector("#colorWheel");
const box = document.querySelector(".box");
colorWheel.addEventListener("input", pickColor);
// hexSeoaretColors(color);

function pickColor() {
  const colorValue = this.value;
  //   console.log(e);
  // console.log(colorValue);
  box.style.backgroundColor = colorValue;
  document.querySelector(".hexcode").textContent = `HEX: ${colorValue.toUpperCase()}`;
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
  document.querySelector(".rgbcode").textContent = `RGB: ${r}, ${g}, ${b}`;
  // console.log({ r, g, b });
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
  document.querySelector(".hslcode").textContent = `HSL: ${Math.round(h)}, ${Math.round(s)}%, ${Math.round(l)}%`;
  // console.log("hsl(%f,%f%,%f%)", Math.round(h), Math.round(s), Math.round(l)); // just for testing
}
