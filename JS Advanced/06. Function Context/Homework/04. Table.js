function solve() {
    let tableBody = document.getElementsByTagName('tbody')[0];
    let clicked;
    Array.from(tableBody.children).forEach(element => {
       element.addEventListener('click', (e) => {
          if (e.currentTarget !== clicked) {
             e.currentTarget.style.backgroundColor = '#413f5e';
             if (clicked) {
                clicked.removeAttribute('style');
                clicked = undefined;
             }
             clicked = e.currentTarget;
          } else {
             e.currentTarget.removeAttribute('style');
             clicked = undefined;
          }
       })
    });
 }