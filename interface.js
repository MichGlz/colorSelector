"user strict";

window.addEventListener("DOMContentLoaded", start);

let colorWheel;
let selectOption;

//seting the program, selecting the inputs
function start() {
  colorWheel = document.querySelector("#colorWheel");
  colorWheel.addEventListener("input", pickColor);
  selectOption = document.querySelector("#combinationOptions");
  selectOption.addEventListener("change", pickOption);
  const randomColor = randomColorGenerator();
  colorWheel.value = randomColor;
  pickColor();
}

//setting random color to the <input> type=color at the begain
function randomColorGenerator() {
  const rgbObject = randomNumber();

  const randomColorHex = rgbToHex(rgbObject);

  return randomColorHex;
}

//random number for randomColor
function randomNumber() {
  let r = Math.floor(Math.random() * 255);
  let g = Math.floor(Math.random() * 255);
  let b = Math.floor(Math.random() * 255);

  return { r, g, b };
}
//-------------------------------------------------------

//transfer the color to my delegating function
function pickColor() {
  let pickedColor;
  if (this.value) {
    pickedColor = this.value;
  } else {
    pickedColor = colorWheel.value;
  }
  showingColors(pickedColor);
}

//detonates my pickColor function from my option selector withOut a target.value
function pickOption() {
  pickColor();
}

//----my delegating function, control most of the process
function showingColors(colorInput) {
  //colecting and converting data from HEX value to hsl
  const hexObjt = splitHexCode(colorInput);
  const rgbObj = hexToRgb(hexObjt);
  const hslObj = rgbToHsl(rgbObj);
  const rgbCSS = rgbToCSS(rgbObj);

  //creating a hsl objects array
  const hslObjArray = selectHarmony(hslObj);

  //creating a color object array
  const colorObjArray = doColorObjArray(hslObjArray);

  //diplay color in the centered circle
  changeBackgroundColor(`color`, rgbCSS);

  //display color and values from the color objects array in the DOM
  displayColorObject(colorObjArray);
}

//split the initial hex# input in colors and back and object
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

//convert an object with 3 HEX numbers {r:ff,g:ff,b:ff} in to a rgb object {r:255,g:255,b:255}
function hexToRgb(hexObj) {
  r = parseInt(`0x${hexObj.hexR}`, 16);
  g = parseInt(`0x${hexObj.hexG}`, 16);
  b = parseInt(`0x${hexObj.hexB}`, 16);
  return { r, g, b };
}

//convert a rgb object {r:255,g:255,b:255} to a hsl object {h:0,s:0,l:100}
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

//convert a rgb object {r:255,g:255,b:255} to a CSS readable string 'rgb(255,255,255)'
function rgbToCSS(rgbObj) {
  const rgbcss = `rgb( ${rgbObj.r}, ${rgbObj.g}, ${rgbObj.b})`;
  return rgbcss;
}

//convert a rgb object {r:255,g:255,b:255} to a HEX# '#ffffff'
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

//convert a hsl object {h:0,s:0,l:100} to a rgb object {r:255,g:255,b:255}
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

//select a element by class and changes its background-color
function changeBackgroundColor(boxClass, newColor) {
  document.querySelector(`.${boxClass}`).style.backgroundColor = newColor;
}

//select the harmony and call the function of the harmony
function selectHarmony(hslObj) {
  switch (selectOption.value) {
    case "analogous":
      return analogous(hslObj);

    case "monochromatic":
      return monochromatic(hslObj);

    case "triad":
      return triad(hslObj);

    case "complementary":
      return complementary(hslObj);

    case "compound":
      return compound(hslObj);

    case "shades":
      return shades(hslObj);
  }
}

//change the value of h in a hslObj 4 times and return an [hslObj]
function analogous(hslObj) {
  const orgH = hslObj.h;
  const s = hslObj.s;
  const l = hslObj.l;
  let hslObjArray = [hslObj];
  let hArray = [orgH - 30, orgH - 15, orgH + 15, orgH + 30];
  hArray.forEach((h) => {
    if (h > 360) {
      h -= 360;
    }
    if (h < 0) {
      h += 360;
    }
    const newObj = { h, s, l };
    hslObjArray.push(newObj);
  });

  return hslObjArray;
}

//change the value of s and l in a hslObj 4 times and return an [hslObj]
function monochromatic(hslObj) {
  const h = hslObj.h;
  const orgS = hslObj.s;
  const orgL = hslObj.l;
  let hslObjArray = [hslObj];
  let sArray = [orgS - 15, orgS + 15, orgS, orgS];
  let lArray = [orgL, orgL, orgL - 15, orgL + 15];

  sArray.forEach((s, i) => {
    s = sArray[i];
    if (s > 100) {
      s = 100;
    }
    if (s < 0) {
      s = 0;
    }
    l = lArray[i];
    if (l > 100) {
      l = 100;
    }
    if (l < 0) {
      l = 0;
    }
    const newObj = { h, s, l };
    hslObjArray.push(newObj);
  });
  return hslObjArray;
}

//change the value of h+-60 and some s in a hslObj 4 times and return an [hslObj]
function triad(hslObj) {
  const orgH = hslObj.h;
  const orgS = hslObj.s;
  const l = hslObj.l;
  let hslObjArray = [hslObj];

  let hArray = [orgH - 60, orgH - 60, orgH + 60, orgH + 60];
  hArray.forEach((h, i) => {
    i = Number(i);
    if (h > 360) {
      h -= 360;
    }
    if (h < 0) {
      h += 360;
    }
    let s = orgS;
    if (i === 1 || i === 3) {
      s += 40;
      if (s > 100) {
        s -= 80;
      }
    }
    const newObj = { h, s, l };
    hslObjArray.push(newObj);
  });

  return hslObjArray;
}

//change the value of h +180 and some s in a hslObj 4 times and return an [hslObj]
function complementary(hslObj) {
  const orgH = hslObj.h;
  const orgS = hslObj.s;
  const l = hslObj.l;
  let hslObjArray = [hslObj];
  let hArray = [orgH + 180, orgH + 10, orgH + 180, orgH];

  hArray.forEach((h, i) => {
    i = Number(i);
    let s = orgS;
    if (h > 360) {
      h -= 360;
    }
    if (h < 0) {
      h += 360;
    }
    if (i > 0) {
      s -= i * 15;
    }
    if (s < 0) {
      s += 80;
    }

    const newObj = { h, s, l };
    hslObjArray.push(newObj);
  });

  return hslObjArray;
}

//change the value of h in a hslObj 4 times and return an [hslObj]
function compound(hslObj) {
  const orgH = hslObj.h;
  const s = hslObj.s;
  const l = hslObj.l;
  let hslObjArray = [hslObj];
  let hArray = [orgH + 180, orgH + 20, orgH + 200, orgH - 20];
  hArray.forEach((h) => {
    if (h > 360) {
      h -= 360;
    }
    if (h < 0) {
      h += 360;
    }
    const newObj = { h, s, l };
    hslObjArray.push(newObj);
  });

  return hslObjArray;
}

//change the value of l in a hslObj 4 times and return an [hslObj]
function shades(hslObj) {
  const h = hslObj.h;
  const s = hslObj.s;
  const orgL = hslObj.l;
  let hslObjArray = [hslObj];
  let lArray = [orgL - 30, orgL - 15, orgL + 15, orgL + 30];
  lArray.forEach((l) => {
    if (l > 100) {
      l = 100;
    }
    if (l < 0) {
      l = 0;
    }
    const newObj = { h, s, l };
    hslObjArray.push(newObj);
  });

  return hslObjArray;
}

//creates the diferent color values using hsl object and calling some convert functions
function doColorObjArray(hslObjArray) {
  let colorObjArray = [];
  hslObjArray.forEach((hslObj) => {
    const rgbObj = hslToRgb(hslObj);
    const hex = rgbToHex(rgbObj);
    const rgbCSS = rgbToCSS(rgbObj);
    const hexStr = `HEX:  ${hex.toUpperCase()}`;
    const rgbStr = `RGB:  ${rgbObj.r}, ${rgbObj.g}, ${rgbObj.b}`;
    const hslStr = `HSL:  ${hslObj.h}, ${hslObj.s}%, ${hslObj.l}%`;
    const colorObj = { hslStr, rgbStr, rgbCSS, hexStr };
    colorObjArray.push(colorObj);
  });
  return colorObjArray;
}

//displays the diferents values of a color object in tu the DOM
function displayColorObject(colorObjArray) {
  colorObjArray.forEach((Obj, i) => {
    const n = i + 1;
    document.querySelector(`.color${n}`).style.backgroundColor = Obj.rgbCSS;
    document.querySelector(`.color${n} .hex`).textContent = Obj.hexStr;
    document.querySelector(`.color${n} .rgb`).textContent = Obj.rgbStr;
    document.querySelector(`.color${n} .hsl`).textContent = Obj.hslStr;
  });
}
