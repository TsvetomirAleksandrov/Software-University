function solve() {
    let styleBtn = document.getElementById('dropdown');
    let dropdownMenu = document.getElementById('dropdown-ul');
    let box = document.getElementById('box');

    styleBtn.addEventListener('click', showDropdown);

    function showDropdown(e) {
        dropdownMenu.style.display = 'block';
        let listItems = dropdownMenu.getElementsByTagName('li');

        for (const li of listItems) {
            li.addEventListener('click', function () {
                let color = this.innerHTML;
                box.style.backgroundColor = color;
            })
        }
    }
}