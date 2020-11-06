var firebaseConfig = {
    apiKey: "AIzaSyBZCDli9QNxyB_88NrbS1tv903tvjVl6Mg",
    authDomain: "my-movies-d01ac.firebaseapp.com",
    databaseURL: "https://my-movies-d01ac.firebaseio.com",
    projectId: "my-movies-d01ac",
    storageBucket: "my-movies-d01ac.appspot.com",
    messagingSenderId: "595515175119",
    appId: "1:595515175119:web:ecbb71563735cf9a5247ba"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();

        let buttonElement = document.getElementById('login-button');
        buttonElement.addEventListener('click', onUserLogin)

        function onUserLogin(e) {
            let userNameElement = document.getElementById('username');
            let passwordElement = document.getElementById('password');
            let subheaderElement = document.getElementById('sub-header');
            let loginFormElement = document.getElementById('login-form');

            auth.signInWithEmailAndPassword(userNameElement.value, passwordElement.value)
                .then(result => {
                    console.log('Successfully logged in!');
                    subheaderElement.innerText = `Hello, ${result.user.email}`;
                    loginFormElement.style.display = 'none';
                })
                .catch(err => {
                    console.log('Error:', err);
                })
        }