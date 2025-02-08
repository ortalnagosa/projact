const bgColorInput = document.getElementById("bg-color");
const textInput = document.getElementById("text-input");
const addTextBtn = document.getElementById("add-text-btn");
const resetBtn = document.getElementById("reset-btn");
const previewArea = document.getElementById("preview-area");
const textColorInput = document.getElementById("text-color");
const textSizeInput = document.getElementById("text-size");
const fontFamilyInput = document.getElementById("font-family");


// Change background color
bgColorInput.addEventListener("input", (e) => {
  previewArea.style.backgroundColor = e.target.value;
});


addTextBtn.addEventListener("click", () => {
  const text = textInput.value.trim();
  const textColor = textColorInput.value || "black";
  const textSize = textSizeInput.value || "16"; // Default size is 16px
  
  if (text) {
    const placeholder = document.querySelector(".placeholder");
    if (placeholder) placeholder.remove();

    const textElement = document.createElement("div");
    textElement.textContent = text;
    textElement.style.color = textColor;
    textElement.style.fontSize = `${textSize}px`;
    textElement.className = "user-text";
    previewArea.appendChild(textElement);

    textInput.value = "";
    textSizeInput.value = ""; // Clear text size input
  } else {
    checkAndRestorePlaceholder();
  }
});

fontFamilyInput.addEventListener("change", () => {
  const fontFamily = fontFamilyInput.value;
  previewArea.querySelectorAll(".user-text").forEach((textElement) => {
    textElement.style.fontFamily = fontFamily;
  });
});




// כפתור איפוס
resetBtn.addEventListener("click", () => {
  previewArea.innerHTML = ""; // איפוס כל הטקסטים
  checkAndRestorePlaceholder(); // החזרת הודעת ברירת מחדל
});

// פונקציה לבדיקת קיום טקסט והחזרת ברירת מחדל
function checkAndRestorePlaceholder() {
  if (!previewArea.querySelector(".user-text")) {
    const placeholder = document.createElement("p");
    placeholder.textContent = "Your design will appear here...";
    placeholder.className = "placeholder";
    previewArea.appendChild(placeholder);
  }
}

