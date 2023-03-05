document.getElementById("change-image-quality").addEventListener("change", (event) => {
   if (event.target.checked) {
      document.getElementById("image-quality").disabled = false;
      chrome.storage.sync.set({ changeImageQuality: true });
   }
   else {
      document.getElementById("image-quality").value = 100;
      document.getElementById("image-quality").disabled = true;
      chrome.storage.sync.set({ changeImageQuality: false });
   }
});
document.getElementById("image-quality").addEventListener("change", (event) => {
   chrome.storage.sync.set({ imageQuality: event.target.value });
});

document.getElementById("change-font").addEventListener("change", (event) => {
   if (event.target.checked) {
      document.getElementById("font").disabled = false;
      chrome.storage.sync.set({ changeFont: true });
   }
   else {
      document.getElementById("font").disabled = true;
      chrome.storage.sync.set({ changeFont: false });
   }
});

document.getElementById("font").addEventListener("change", (event) => {
   chrome.storage.sync.set({ font: event.target.value });
});

document.getElementById("change-youtube-video").addEventListener("change", (event) => {
   if (event.target.checked) {
      chrome.storage.sync.set({ changeYoutubeVideo: true });
   }
   else {
      chrome.storage.sync.set({ changeYoutubeVideo: false });
   }
});

document.getElementById("change-auto-play").addEventListener("change", (event) => {
   if (event.target.checked) {
      chrome.storage.sync.set({ changeAutoPlay: true });
   }
   else {
      chrome.storage.sync.set({ changeAutoPlay: false });
   }
});

document.getElementById("simplify-colors").addEventListener("change", (event) => {
   if (event.target.checked) {
      chrome.storage.sync.set({ changeColors: true });
   }
   else {
      chrome.storage.sync.set({ changeColors: false });
   }
});

document.getElementById("dark-mode").addEventListener("change", (event) => {
   if (event.target.checked) {
      chrome.storage.sync.set({ darkMode: true });
   }
   else {
      chrome.storage.sync.set({ darkMode: false });
   }
});



initialize();
function initialize() {
   chrome.storage.sync.get(["changeImageQuality", "imageQuality", "changeFont", "font", "changeYoutubeVideo", "changeAutoPlay", "changeColors", "darkMode"], (result) => {
      if (result.changeImageQuality) {
         document.getElementById("change-image-quality").checked = true;
         document.getElementById("image-quality").disabled = false;
         document.getElementById("image-quality").value = result.imageQuality;
      }
      else {
         document.getElementById("image-quality").value = 100;
         document.getElementById("image-quality").disabled = true;
      }
      if (result.changeFont) {
         document.getElementById("change-font").checked = true;
         document.getElementById("font").disabled = false;
         document.getElementById("font").value = result.font;
      }
      else {
         document.getElementById("font").disabled = true;
      }
      if (result.changeYoutubeVideo) {
         document.getElementById("change-youtube-video").checked = true;
      }
      if (result.changeAutoPlay) {
         document.getElementById("change-auto-play").checked = true;
      }
      if (result.changeColors) {
         document.getElementById("simplify-colors").checked = true;
      }
      if (result.darkMode) {
         document.getElementById("dark-mode").checked = true;
      }
   });
}