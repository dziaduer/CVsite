let xmlContent = '';
fetch('assets/content-en.xml').then((response)=>{
    response.text().then((xml)=>{
        xmlContent = xml;
        let parser = new DOMParser();
        let xmlDOM = parser.parseFromString(xmlContent, 'application/xml');

        let name = xmlDOM.getElementsByTagName("name")[0].childNodes[0].nodeValue;
        let surname = xmlDOM.getElementsByTagName('surname')[0].childNodes[0].nodeValue;
        document.getElementById("fullname").innerHTML = name + " " + surname;
        try{
            let dob = xmlDOM.getElementsByTagName("dob")[0].childNodes[0].nodeValue;
            if(dob.length > 0){
                document.getElementById("dob").innerHTML = 
                "<p class='h5 mb-1' style='font-weight: bold;'><i class='bi bi-power me-2'></i>Date of birth:</p><p class='h5'>" + dob + "</p>"
            } 
        }
        catch{
            console.log("Date of birth not found.");
        }
        
        try{
            let phone = xmlDOM.getElementsByTagName("phone")[0].childNodes[0].nodeValue;
            if(phone.length > 0){
                document.getElementById("phone").innerHTML = 
                "<p class='h5 mb-1' style='font-weight: bold;'><i class='bi bi-telephone me-2'></i>Phone number:</p><p class='h5'></i>" + phone + "</p>";
            }
        }
        catch{
            console.log("Phone number not found.");
        }
        

        try{
            let mail = xmlDOM.getElementsByTagName("mail")[0].childNodes[0].nodeValue;
            if(mail.length > 0){
                if(mail.length > 20){
                    mail = mail.split('@')[0] + "<br/>@" + mail.split('@')[1];
                }
                document.getElementById("mail").innerHTML = 
                "<p class='h5 mb-1' style='font-weight: bold;'><i class='bi bi-envelope me-2'></i>E-mail:</p><p class='h5 text-break'>" + mail + "</p>";
            }         
        }
        catch{
            console.log("E-mail adress not found.")
        }

        try{
            let website = xmlDOM.getElementsByTagName("website")[0].childNodes[0].nodeValue;
            if(website.length > 0){
                //if(mail.length > 20){
                //    mail = mail.split('@')[0] + "<br/>@" + mail.split('@')[1];
                //}
                document.getElementById("website").innerHTML = 
                "<p class='h5 mb-1' style='font-weight: bold;'><i class='bi bi-globe me-2'></i>Website:</p><p class='h5 text-break'>" + website + "</p>";
            }         
        }
        catch{
            console.log("E-mail adress not found.")
        }
        


        let panels = xmlDOM.getElementsByTagName("panel");

    });
});