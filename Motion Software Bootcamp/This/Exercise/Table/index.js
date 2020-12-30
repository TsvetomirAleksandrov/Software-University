function solve() {
    let table = document.querySelectorAll('table tbody tr');
    let clicked;

    for (const row of table) {
        row.addEventListener('click', function (e) {
            if (e.currentTarget !== clicked) {
                e.currentTarget.style.backgroundColor = '#413f5e';

                if (clicked) {
                    clicked.removeAttribute('style');
                    clicked = undefined;
                }
                clicked = e.currentTarget;
            } 
            else {
                e.currentTarget.removeAttribute('style');
                clicked = undefined;
            }
        });
    }
}
