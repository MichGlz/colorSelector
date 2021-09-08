"user strict";
window.addEventListener("DOMContentLoaded", start);

function start() {
  const colorWheel = document.querySelector("#colorWheel");
  colorWheel.addEventListener("input", pickColor);
}

function pickColor() {
  const inputValue = this.value;
  showingColors(inputValue);
}

function showingColors(colorInput) {
  const hexObjt = splitHexCode(colorInput);
  const rgbObj = hexToRgb(hexObjt);
  const hslObj = rgbToHsl(rgbObj);

  const rgbCSS = rgbToCSS(rgbObj);
  const hexFromRgb = rgbToHex(rgbObj);
  const rgbFromHslObj = hslToRgb(hslObj);

  boxColor(`box`, rgbCSS);
  showData(`hex`, `HEX:  ${hexFromRgb.toUpperCase()}`);
  showData(`rgb`, `RGB:  ${rgbObj.r}, ${rgbObj.g}, ${rgbObj.b}`);
  showData(`hsl`, `HSL:  ${hslObj.h}, ${hslObj.s}%, ${hslObj.l}%`);
}

function splitHexCode(hexValue) {
  if (hexValue[0] === "#" && hexValue.length === 7) {
    let hexR = hexValue.substring(1, 3);
    let hexG = hexValue.substring(3, 5);
    let hexB = hexValue.substring(5);
    // console.log({ hexR, hexG, hexB });
    return { hexR, hexG, hexB };
  } else {
    alert("is not an hexcolor");
  }
}

function hexToRgb(hexObj) {
  r = parseInt(`0x${hexObj.hexR}`, 16);
  g = parseInt(`0x${hexObj.hexG}`, 16);
  b = parseInt(`0x${hexObj.hexB}`, 16);
  return { r, g, b };
}

function rgbToHsl(rgbObj) {
  r = rgbObj.r / 255;
  g = rgbObj.g / 255;
  b = rgbObj.b / 255;

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

  return { h, s, l };
}

function rgbToCSS(rgbObj) {
  const rgbcss = `rgb( ${rgbObj.r}, ${rgbObj.g}, ${rgbObj.b})`;
  return rgbcss;
}

function rgbToHex(rgbObj) {
  const rgbArray = [`${rgbObj.r}`, `${rgbObj.g}`, `${rgbObj.b}`];
  let hexCode = "#";
  rgbArray.forEach((element) => {
    n = Number(element).toString(16);
    if (n.length < 2) {
      n += "0";
    }
    hexCode += n;
  });

  return hexCode;
}

function hslToRgb(hslObj) {
  let h = hslObj.h;
  let s = hslObj.s;
  let l = hslObj.l;

  // Must be fractions of 1
  s /= 100;
  l /= 100;

  let c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2,
    r = 0,
    g = 0,
    b = 0;
  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return { r, g, b };
  // return "rgb(" + r + "," + g + "," + b + ")";
}

function showData(pClass, str) {
  document.querySelector(`.${pClass}`).textContent = str;
}

function boxColor(boxClass, newColor) {
  document.querySelector(`.${boxClass}`).style.backgroundColor = newColor;
}
