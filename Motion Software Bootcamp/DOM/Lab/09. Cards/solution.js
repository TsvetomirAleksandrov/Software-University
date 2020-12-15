function solve() {
   let cards = document.getElementsByTagName('img');

   let upperCard = 0;
   let upperCardNode;
   let bottomCard = 0;
   let bottomCardNode;

   for (const card of cards) {
      card.addEventListener('click', function (e) {
         card.setAttribute('src', 'images/whiteCard.jpg');

         let parentID = this.parentNode.getAttribute('id');

         if (parentID === 'player1Div') {
            let span = document.querySelectorAll('#result span')[0];
            let name = this.getAttribute('name');
            upperCard = Number(name);
            upperCardNode = this;

            span.textContent = name;
         } else if (parentID === 'player2Div') {
            let span = document.querySelectorAll('#result span')[2];
            let name = this.getAttribute('name');
            bottomCard = Number(name);
            bottomCardNode = this;

            span.textContent = name;
         }
         if (upperCard > bottomCard && upperCard !== 0 && bottomCard !== 0) {
            upperCardNode.style = 'border: 2px solid green';
            bottomCardNode.style = 'border: 2px solid red';

            document.getElementById('history').textContent += `[${upperCard} vs ${bottomCard}] `;
            let spanUpRes = document.querySelectorAll('#result span')[0];
            let spanDownRes = document.querySelectorAll('#result span')[2];
            spanUpRes.innerHTML = '';
            spanDownRes.innerHTML = '';
            upperCard = 0;
            bottomCard = 0;
         } else if (
            upperCard < bottomCard &&
            upperCard !== 0 &&
            bottomCard !== 0
         ) {
            bottomCardNode.style = 'border: 2px solid green';
            upperCardNode.style = 'border: 2px solid red';

            document.getElementById('history').textContent += `[${upperCard} vs ${bottomCard}] `;
            let spanUpRes = document.querySelectorAll('#result span')[0];
            let spanDownRes = document.querySelectorAll('#result span')[2];
            spanUpRes.innerHTML = '';
            spanDownRes.innerHTML = '';
            upperCard = 0;
            bottomCard = 0;
         } else if (upperCard === bottomCard) {

            let spanUpRes = document.querySelectorAll('#result span')[0];
            document.getElementById('history').textContent += `[${upperCard} vs ${bottomCard}] `;
            let spanDownRes = document.querySelectorAll('#result span')[2];
            spanUpRes.innerHTML = '';
            spanDownRes.innerHTML = '';
            upperCard = 0;
            bottomCard = 0;
         }
      });
   }
}