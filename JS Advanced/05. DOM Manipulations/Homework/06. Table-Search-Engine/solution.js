function solve() {
   let button = document.getElementById('searchBtn');
   button.addEventListener('click', search)

   function search() {

      let searchedWord = document.getElementsByTagName('input')[0].value;
      
      if (searchedWord.length > 0) {
         let tBody = document.getElementsByTagName('tbody')[0].getElementsByTagName('td');
         for (const element of Array.from(tBody)) {
            element.parentNode.classList.remove('select');
         }

         for (const element of Array.from(tBody)) {
            if (element.textContent.includes(searchedWord)) {
               element.parentNode.classList.add('select');
            }
         }

         document.getElementsByTagName('input')[0].value = '';
      }
   }
}