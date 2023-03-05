
function darkMode() {
   let style = document.createElement("style");
   style.innerHTML = `
      :root {
         color-scheme: dark;
      }  
      body {
         background-color: #000000;
         color: #ffffff;
      }
   `;
   document.body.appendChild(style);
}
darkMode();

function convertColorToHSL(color) {
   const isRGBA = color.startsWith("rgba");
   const isRGB = color.startsWith("rgb");

   if (!isRGBA && !isRGB) {
      return null;
   }

   const start = color.indexOf("(") + 1;
   const end = color.indexOf(")");
   const values = color.substring(start, end).split(",");
   const red = parseInt(values[0]);
   const green = parseInt(values[1]);
   const blue = parseInt(values[2]);
   const alpha = isRGBA ? parseFloat(values[3]) : 1;

   const r = red / 255;
   const g = green / 255;
   const b = blue / 255;
   const max = Math.max(r, g, b);
   const min = Math.min(r, g, b);
   let hue, saturation, lightness;

   if (max === min) {
      hue = 0;
   } else if (max === r) {
      hue = ((g - b) / (max - min)) % 6;
   } else if (max === g) {
      hue = (b - r) / (max - min) + 2;
   } else if (max === b) {
      hue = (r - g) / (max - min) + 4;
   }

   hue = Math.round(hue * 60);
   if (hue < 0) {
      hue += 360;
   }

   lightness = (max + min) / 2;

   if (max === min) {
      saturation = 0;
   } else if (lightness < 0.5) {
      saturation = (max - min) / (max + min);
   } else if (lightness >= 0.5) {
      saturation = (max - min) / (2 - (max + min));
   }

   saturation = Math.round(saturation * 100);
   lightness = Math.round(lightness * 100);

   if (isRGBA) {
      return `hsla(${hue}, ${saturation}%, ${lightness}%, ${alpha})`;
   } else {
      return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
   }
}

function disableAutoplay() {
   document.querySelectorAll("video").forEach((video) => {
      video.autoplay = false;
   });
}


disableAutoplay();

function slightlyChangeColors() {
   let body = document.querySelector("body");
   let bodyStyle = window.getComputedStyle(body);
   let bodyBackgroundColor = bodyStyle.getPropertyValue("background-color");
   let bodyTextColor = bodyStyle.getPropertyValue("color");


   let bodyBackgroundColorHSL = convertColorToHSL(bodyBackgroundColor);
   let bodyBackgroundColorHSLParsed = bodyBackgroundColorHSL.split("(")[1].split(")")[0].split(",");
   let bodyBackgroundColorHSLLightness = parseInt(bodyBackgroundColorHSLParsed[2]);
   if (bodyBackgroundColorHSLLightness > 97) {
      bodyBackgroundColorHSLParsed[2] = "97%";
      bodyBackgroundColorHSL = `hsl(${bodyBackgroundColorHSLParsed.join(",")})`;
   }
   else if (bodyBackgroundColorHSLLightness < 3) {
      bodyBackgroundColorHSLParsed[2] = "0%";
      bodyBackgroundColorHSL = `hsl(${bodyBackgroundColorHSLParsed.join(",")})`;
   }

   let bodyTextColorHSL = convertColorToHSL(bodyTextColor);
   let bodyTextColorHSLParsed = bodyTextColorHSL.split("(")[1].split(")")[0].split(",");
   let bodyTextColorHSLLightness = parseInt(bodyTextColorHSLParsed[2]);
   if (bodyTextColorHSLLightness > 97) {
      bodyTextColorHSLParsed[2] = "97%";
      bodyTextColorHSL = `hsl(${bodyTextColorHSLParsed.join(",")})`;
   }
   else if (bodyTextColorHSLLightness < 3) {
      bodyTextColorHSLParsed[2] = "0%";
      bodyTextColorHSL = `hsl(${bodyTextColorHSLParsed.join(",")})`;
   }

   body.style.backgroundColor = bodyBackgroundColorHSL;
   body.style.color = bodyTextColorHSL;
}

slightlyChangeColors();


function addWatchButtonYT() {
   document.querySelectorAll("iframe").forEach((iframe) => {
      if (iframe.src.includes("youtube.com/embed")) {
         let button = document.createElement("button");
         button.innerText = "Watch Youtube Video";
         button.classList.add("sustainableExtensionYTButton");
         button.addEventListener("click", () => {
            iframe.src += "?sustainableEnergyExtensionAllow=true";
            button.remove();
         });
         iframe.parentNode.insertBefore(button, iframe.nextSibling);
      }
   });
}

addWatchButtonYT();
