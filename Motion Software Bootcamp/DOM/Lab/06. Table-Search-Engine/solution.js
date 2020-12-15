function solve() {
   const users = Array.from(document.querySelectorAll('tbody > tr'));
   const searchField = document.querySelector('#searchField');

   document.querySelector('#searchBtn').addEventListener('click', function () {
      let regex = new RegExp(searchField.value, 'gim');

      if (searchField.value !== '') {
         users.map(u => {
            u.classList.remove('select');
            if (u.innerHTML.match(regex)) {
               u.className = 'select';
            }
         })
      }

      searchField.value = '';
   })
}