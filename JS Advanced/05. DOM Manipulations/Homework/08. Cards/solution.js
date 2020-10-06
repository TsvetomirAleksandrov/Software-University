function solve() {
   let playerOne = document.getElementById('player1Div');
   let playerTwo = document.getElementById('player2Div');

   let cards = [];

   playerOne.addEventListener('click', (e) => {
       e.target.src = 'images/whiteCard.jpg';
       document.getElementById('result').children[0].textContent = e.target.name;
       cards[0] = e;
       checkWinner();
   })

   playerTwo.addEventListener('click', (e) => {
       e.target.src = 'images/whiteCard.jpg';
       document.getElementById('result').children[2].textContent = e.target.name;
       cards[1] = e;
       checkWinner();
   })

   function checkWinner() {
       if (cards.length === 2) {
           if (Number(cards[0].target.name) > Number(cards[1].target.name)) {
               cards[0].target.style.border = '2px solid green';
               cards[1].target.style.border = '2px solid red';
           } else {
               cards[1].target.style.border = '2px solid green';
               cards[0].target.style.border = '2px solid red'
           }
           document.getElementById('history').textContent += `[${cards[0].target.name} vs ${cards[1].target.name}] `;
           cards = [];
       }
   }
}