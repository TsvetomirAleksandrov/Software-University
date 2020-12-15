function solve() {
  let [generateBtn, buyBtn] = document.querySelectorAll('button');
  generateBtn.addEventListener('click', generate);
  buyBtn.addEventListener('click', buy);
 
 
  let inputTextBox = document.getElementsByTagName('textarea')[0];
  let resultTextBox = document.getElementsByTagName('textarea')[1];
 
  let furnatureList = document.getElementsByTagName('tbody')[0];
 
  function generate() {
    let furnetureArrayInput = JSON.parse(inputTextBox.value);
    furnetureArrayInput.forEach(obj => {
      let {img, name, price, decFactor} = obj;
      let newRow = furnatureList.insertRow(-1);
      let imgCell = newRow.insertCell(0);
      let nameCell = newRow.insertCell(1);
      let priceCell = newRow.insertCell(2);
      let decFactorCell = newRow.insertCell(3);
      let checkBoxCell = newRow.insertCell(4);
 
      let imgElement = document.createElement('img');
      imgElement.src = img;
      imgCell.appendChild(imgElement);
 
      let nameElement = document.createElement('p');
      nameElement.textContent = name;
      nameCell.appendChild(nameElement);
 
      let priceElement = document.createElement('p');
      priceElement.textContent = price;
      priceCell.appendChild(priceElement);
 
      let decFactorElement = document.createElement('p');
      decFactorElement.textContent = decFactor;
      decFactorCell.appendChild(decFactorElement);
 
      let checkBoxElement = document.createElement('input');
      checkBoxElement.type = 'checkbox';
      checkBoxCell.appendChild(checkBoxElement);
    });
    inputTextBox.value = "";
  }
 
  function buy() {
    let boughtFurniture = [];
    let totalPrice = 0;
    let sumDecFactor = 0;
    let counter = 0;
 
          for (row of furnatureList.querySelectorAll("tr")) {
            if (row.querySelectorAll("input")[0].checked) {
              const productInfo = row.querySelectorAll("p");
              boughtFurniture.push(productInfo[0].textContent);
              totalPrice += Number(productInfo[1].textContent);
              sumDecFactor += Number(productInfo[2].textContent);
              counter++;
            }
          }
    
    let avgDecFactor = sumDecFactor / counter || 1;
    let output = `Bought furniture: ${boughtFurniture.join(', ')}\n`;
    output += `Total price: ${totalPrice.toFixed(2)}\n`;
    output += `Average decoration factor: ${avgDecFactor}`;
    resultTextBox.value = output;
 
  }
}