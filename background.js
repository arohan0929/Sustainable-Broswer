var imageQuality = 80 / 100;


function lowerImageQuality(url) {
   
   let urlParsed = new URL(url);
   let w = urlParsed.searchParams.get("w");
   let width = urlParsed.searchParams.get("width");
   let h = urlParsed.searchParams.get("h");
   let height = urlParsed.searchParams.get("height");
   let q = urlParsed.searchParams.get("q");

   if (w) {
      urlParsed.searchParams.set("w", Math.round(w * imageQuality));
   }
   if (width) {
      urlParsed.searchParams.set("width", Math.round(width * imageQuality));
   }
   if (h) {
      urlParsed.searchParams.set("h", Math.round(h * imageQuality));
   }
   if (height) {
      urlParsed.searchParams.set("height", Math.round(height * imageQuality));
   }
   if (q) {
      urlParsed.searchParams.set("q", Math.round(q * imageQuality));
   }

   urlParsed.searchParams.set("modified", url);
   return urlParsed.href;

}

function modifyFonts() {
   return true;
}

function modifyYoutubeVideo() {
   return true;
}


chrome.webRequest.onBeforeRequest.addListener(
   (details) => {
      if (details.type === "image") {

         let urlParsed = new URL(details.url);
         let modified = urlParsed.searchParams.get("modified");
         
         
         if (modified) {
            return;
         }

         return { redirectUrl: lowerImageQuality(details.url) };
      }
      if (details.type === "font") {
         return { cancel: modifyFonts() };
      }
      if (modifyYoutubeVideo() && details.url.includes("youtube.com/embed") && !details.url.includes("sustainableEnergyExtensionAllow=true")) {
         return { cancel: true };
      }
   },
   {
      urls: ["<all_urls>"],
   },
   ["blocking"]
);