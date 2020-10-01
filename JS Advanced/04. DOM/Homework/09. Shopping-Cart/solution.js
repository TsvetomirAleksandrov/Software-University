function solve() {
   const productsInCart = [];
   let totalPrice = 0;
   const addButtons = document.getElementsByClassName('add-product');
   const textArea = document.getElementsByTagName('textarea')[0];
   const checkoutButton = document.querySelector('.checkout');

   Array.from(addButtons).forEach(product => product.addEventListener('click', productClickHandler));
   checkoutButton.addEventListener('click', checkoutClickHandler);

   function productClickHandler(event) {
      const addButtonDiv = event.target.parentElement;

      const name = addButtonDiv.previousElementSibling.children[0].textContent;
      const money = addButtonDiv.nextElementSibling.textContent;

      textArea.value += `Added ${name} for ${money} to the cart.\n`;
      if (!productsInCart.includes(name)) {
         productsInCart.push(name);
      }
      totalPrice += Number(money);
   }

   function checkoutClickHandler() {
      textArea.value += `You bought ${productsInCart.join(', ')} for ${totalPrice.toFixed(2)}.`;
      Array.from(AddButtons).forEach(button => button.disabled = true);
      checkoutButton.disabled = true;
   }
}