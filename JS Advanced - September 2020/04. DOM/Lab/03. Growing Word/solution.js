function growingWord() {
  const word = document.querySelector("#exercise > p");
  let px = 2;
  let colorChanges = {
    "blue": "green",
    "green": "red",
    "red": "blue"
  };
  
  if (!word.hasAttribute("style")) {
    word.setAttribute("style", `color:blue; font-size: ${px}px`);
  } else {
    let currentPx = word.style["font-size"];
    px = currentPx.substr(0, currentPx.length - 2) * 2;
    let currentColor = word.style.color;
    word.setAttribute("style", 
    `color:${colorChanges[currentColor]}; font-size: ${px}px`);
  }
} 