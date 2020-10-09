function notify(message) {
    let notificationDiv = document.getElementById('notification');
    notificationDiv.textContent = message;
    notificationDiv.style.display = 'block';
    setTimeout(() => { notificationDiv.style.display = 'none' }, 2000);
}