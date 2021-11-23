function copyToClipboard(id) {
    /* Get the text field */
    var copyText = document.getElementById(id);
    

    copyText.select();
    
    
    copyText.setSelectionRange(0, 99999); /* For mobile devices */
  
     /* Copy the text inside the text field */
    navigator.clipboard.writeText(copyText.value);
  
    /* Alert the copied text */
    alert("Copied the text: " + copyText.value);
  } 
  function myFunction(id) {
    document.getElementById(id).innerHTML = "Paragraph changed.";
  }
  function ShowText(text){
      let alertbox = document.getElementById('alert');
      if(alertbox.style.opacity == 0)
      {
        document.getElementById('alerttext').innerText = text;
        alertbox.style.opacity = "75";
        fade(alertbox);
      }
      
  }

  function fade(element) {
    var op = 1;  // initial opacity
    element.style.display = 'block';
    var timer = setInterval(function () {
        element.style.opacity = op;
        element.style.filter = 'alpha(opacity=' + op * 100 + ")";
        op -= op * 0.1;
        if (op <= 0.1){
            clearInterval(timer);
            element.style.opacity = 0;
            element.style.display = 'none';
        }
    }, 100);
}