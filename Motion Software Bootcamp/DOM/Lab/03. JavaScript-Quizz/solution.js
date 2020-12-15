function solve() {
  const rightAnswers = ['onclick', 'JSON.stringify()', 'A programming API for HTML and XML documents'];

  const possibleAnswers = document.getElementsByClassName('answer-wrap');

  Array.from(possibleAnswers).forEach((answer) => answer.addEventListener('click', selectedAnswer))

  let indexSection = 0;
  let validAnswers = 0;
  const allSections = document.getElementsByTagName('section');

  function selectedAnswer() {
    if (rightAnswers.includes(this.children[0].textContent)) {
      validAnswers++;
    }

    allSections[indexSection].style.display = 'none';
    if (indexSection < allSections.length - 1) {
      allSections[indexSection + 1].style.display = 'block';
    } else {
      document.getElementById('results').style.display = 'block';
      if (validAnswers == 3) {
        document.getElementById('results').children[0].children[0].textContent = 'You are recognized as top JavaScrript fan!';
      } else {
        document.getElementById('results').children[0].children[0].textContent = `You have ${validAnswers} right answers`;
      }
    }
    indexSection++;
  }

}
