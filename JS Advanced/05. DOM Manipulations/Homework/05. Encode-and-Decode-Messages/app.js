function encodeAndDecodeMessages() {
    let buttonSend = document.getElementsByTagName('button')[0];
    let buttonDecode = document.getElementsByTagName('button')[1];
    let textSend = document.getElementsByTagName('textarea')[0];
    let textDecode = document.getElementsByTagName('textarea')[1];

    buttonSend.addEventListener('click', encode);
    buttonDecode.addEventListener('click', decode);

    function encode(e) {
        if (textSend.value.length > 0) {
            let rawMessage = textSend.value;
            let encodedMessage = rawMessage.split('')
                .map(el => String.fromCharCode(el.charCodeAt() + 1))
                .join('');
            textSend.value = '';
            textDecode.value = encodedMessage;
        }
    }

    function decode(e) {
        if (textDecode.value.length > 0) {
            let decodedMessage = textDecode.value.split('')
                .map(el => String.fromCharCode(el.charCodeAt() - 1))
                .join('');
            textDecode.value = decodedMessage;
        }
    }
}