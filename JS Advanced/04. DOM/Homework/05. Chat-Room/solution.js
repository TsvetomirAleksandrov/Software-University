function solve() {
   document.getElementById('send').addEventListener('click', clickHandler);

   function clickHandler(e) {
      const message = document.getElementById('chat_input');

      if (message) {
         showMessage(message.value);
      }

      message.value = null;
   }

   function showMessage(message) {
      const messageBox = document.getElementById('chat_messages');

      let currentMessage = document.createElement('div');
      currentMessage.classList.add('message', 'my-message');
      currentMessage.textContent = message;
      messageBox.appendChild(currentMessage);
   }
}


