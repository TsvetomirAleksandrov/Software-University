function solve() {
  let buttonGenerate = document.getElementsByTagName('button')[0];
  let textGenerate = document.getElementsByTagName('textarea')[0];

  let buttonBuy = document.getElementsByTagName('button')[1];
  let textBuy = document.getElementsByTagName('textarea')[1];

  buttonGenerate.addEventListener('click', generate);
  buttonBuy.addEventListener('click', buy);

  function generate() {
      let json = JSON.parse(textGenerate.value);
      if (json.length > 0) {
          for (const product of json) {
              let newTr = document.createElement('tr');
              let { name, img, price, decFactor } = product;
              newTr.innerHTML += `<td><img src ="${img}"></td>`;
              newTr.innerHTML += `<td><p>${name}</p></td>`;
              newTr.innerHTML += `<td><p>${price}</p></td>`;
              newTr.innerHTML += `<td><p>${decFactor}</p></td>`;
              newTr.innerHTML += `<td><input type="checkbox"/></td>`;
              document.getElementsByTagName('tbody')[0].appendChild(newTr);
          }
      }
  }

  function buy() {
      let allInputs = document.getElementsByTagName('input');
      let furniture = [];
      let totalPrice = 0;
      let decFac = 0;
      for (const input of allInputs) {
          if (input.checked === true) {
              furniture.push(input.parentNode.parentNode.children[1].textContent);
              totalPrice += Number(input.parentNode.parentNode.children[2].textContent);
              decFac += Number(input.parentNode.parentNode.children[3].textContent);
          }
      }
      if (furniture.length > 0) {
          textBuy.value = `Bought furniture: ${furniture.join(', ')}\nTotal price: ${totalPrice.toFixed(2)}\nAverage decoration factor: ${decFac / furniture.length}`;
      }
  }
}