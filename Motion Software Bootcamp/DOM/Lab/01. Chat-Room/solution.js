function solve() {
   let sendBtn = document.getElementById('send');

   sendBtn.addEventListener('click', (e) => {
      e.preventDefault();

      let inputText = document.getElementById('chat_input');
      let messageBox = document.getElementById('chat_messages');

      if (inputText.value !== '') {
         let currentMessage = document.createElement('div');
         currentMessage.classList.add('message', 'my-message');
         currentMessage.textContent = inputText.value;
   
         messageBox.appendChild(currentMessage);
   
         inputText.value = '';
      }
   })
}


