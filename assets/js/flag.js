let flags = document.getElementsByTagName('flag');
for (let flag of flags) {
    let text = flag.innerText;
    let str = "";
    for (var i = 0; i < text.length; i++) {
        switch (text[i]) {
            case 'a': str = str + "&#x1F1E6;";
                break;
            case 'b': str = str + "&#x1F1E7;";
                break;
            case 'c': str = str + "&#x1F1E8;";
                break;
            case 'd': str = str + "&#x1F1E9;";
                break;
            case 'e': str = str + "&#x1F1EA;";
                break;
            case 'f': str = str + "&#x1F1EB;";
                break;
            case 'g': str = str + "&#x1F1EC;";
                break;
            case 'h': str = str + "&#x1F1ED;";
                break;
            case 'i': str = str + "&#x1F1EE;";
                break;
            case 'j': str = str + "&#x1F1EF;";
                break;
            case 'k': str = str + "&#x1F1F0;";
                break;
            case 'l': str = str + "&#x1F1F1;";
                break;
            case 'm': str = str + "&#x1F1F2;";
                break;
            case 'n': str = str + "&#x1F1F3;";
                break;
            case 'o': str = str + "&#x1F1F4;";
                break;
            case 'p': str = str + "&#x1F1F5;";
                break;
            case 'q': str = str + "&#x1F1F6;";
                break;
            case 'r': str = str + "&#x1F1F7;";
                break;
            case 's': str = str + "&#x1F1F8;";
                break;
            case 't': str = str + "&#x1F1F9;";
                break;
            case 'u': str = str + "&#x1F1FA;";
                break;
            case 'v': str = str + "&#x1F1FB;";
                break;
            case 'w': str = str + "&#x1F1FC;";
                break;
            case 'x': str = str + "&#x1F1FD;";
                break;
            case 'y': str = str + "&#x1F1FE;";
                break;
            case 'z': str = str + "&#x1F1FF;";
                break;
        }
    }
    console.log('INFO Changed "' + text + '" to ' + str);
    flag.innerHTML = str;
}

