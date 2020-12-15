function solve() {
   const productsInCart = [];
   let totalPrice = 0;

   const addButtons = document.getElementsByClassName('add-product');
   const textArea = document.getElementsByTagName('textarea')[0];
   const checkoutBtn = document.querySelector('.checkout');

   Array.from(addButtons).forEach(product => product.addEventListener('click', productClickHandler));
   checkoutBtn.addEventListener('click', checkoutClickHandler);

   function productClickHandler(e) {
      const addButtonDiv = e.target.parentElement;

      const name = addButtonDiv.previousElementSibling.children[0].textContent;
      const price = addButtonDiv.nextElementSibling.textContent;

      textArea.value += `Added ${name} for ${price} to the cart.\n`;
      if (!productsInCart.includes(name)) {
         productsInCart.push(name);
      }

      totalPrice += Number(price);
   }

   function checkoutClickHandler() {
      textArea.value += `You bought ${productsInCart.join(', ')} for ${totalPrice.toFixed(2)}.`;
      Array.from(addButtons).forEach(button => button.disabled = true);
      checkoutBtn.disabled = true;
   }
}