function solve() {
  const links = document.querySelectorAll('a');
  const visits = document.querySelectorAll('p');
 
 
  const updateVisitors = (link, visit) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
 
      let count = parseInt(visit.innerHTML.replace(/^\D+/g, ''));
      visit.innerHTML = `visited ${++count} times`;
    });
  };
 
 
  for (let i = 0; i < links.length; i++) {
    updateVisitors(links[i], visits[i]);
  }
}