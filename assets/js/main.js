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