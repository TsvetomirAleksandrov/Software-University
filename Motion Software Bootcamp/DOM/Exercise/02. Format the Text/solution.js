function solve() {
  const allText = document.getElementById('input').textContent;
  const outputElement = document.getElementById('output');

  allText
    .split('. ')
    .map(sentence => sentence.trim())
    .reduce((acc, sentence, index) => {
      if (index % 3 === 0) {
        acc.push([sentence]);
      } else {
        acc[acc.length - 1].push(sentence);
      }

      return acc;
    }, [])
    .forEach(paragraph => {
      let pElement = document.createElement('p');
      pElement.textContent = paragraph;
      outputElement.appendChild(pElement);
    });
}