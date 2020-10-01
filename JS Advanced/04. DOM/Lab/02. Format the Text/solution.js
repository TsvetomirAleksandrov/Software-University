function solve() {
  const allText = document.getElementById('input').textContent;

  let paragraphArr = allText.split('. ');
  
  paragraphArr[paragraphArr.length - 1] = paragraphArr[paragraphArr.length - 1].slice(0, -1);
  paragraphArr = paragraphArr.map((x) => `${x}.`);

  for (let i = 0; i < Math.ceil(paragraphArr.length / 3); i++) {
    const p = document.createElement('p');
    p.textContent = paragraphArr.slice(i * 3, i * 3 + 3).join(' ');
    if(p.textContent.length > 0) {
      document.getElementById('output').appendChild(p);
    }
  }
}