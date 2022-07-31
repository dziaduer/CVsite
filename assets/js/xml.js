let xmlContent = '';
if(darkMode == false){
fetch('assets/content-en.xml').then((response) => {
    response.text().then((xml) => {
        xmlContent = xml;
        let parser = new DOMParser();
        let xmlDOM = parser.parseFromString(xmlContent, 'application/xml');
        let details = ['dob', 'phone', 'mail', 'website', 'residence', 'marital', 'languages'];
        let name = "", surname = "";
        let profilesrc;
        let content = document.getElementById("content");
        try {
            profilesrc = xmlDOM.getElementsByTagName("profile")[0].childNodes[0].nodeValue;
        }
        catch {
            console.log("ERROR Profile picture not found.");
            profilesrc = "assets/images/template.svg"
            //<img class="img-fluid rounded-circle my-3" src="assets/images/template.svg"/>
        }
        finally {
            let img = document.createElement('img');
            img.src = profilesrc;
            img.className = "img-fluid rounded-circle my-3";
            img.style.maxHeight = "250px";
            document.getElementById("profile").appendChild(img);
            console.log(profilesrc);
        }

        try {
            name = xmlDOM.getElementsByTagName("name")[0].childNodes[0].nodeValue;
            try { surname = xmlDOM.getElementsByTagName('surname')[0].childNodes[0].nodeValue; }
            catch { console.log("WARNING Surname not found"); }
        }
        catch { console.log("ERROR Name not found!"); }
        finally {
            let fullname = document.createElement('p');
            fullname.className = 'h2';
            fullname.style = 'font-weight: bold;';
            fullname.innerText = name + " " + surname;
            document.title = name + " " + surname;
            document.getElementById("profile").appendChild(fullname);
        }



        details.forEach(element => {
            try {
                let node = xmlDOM.getElementsByTagName(element)[0].innerHTML;
                if (node.length > 0) {
                    let detail = document.createElement('div');
                    let icon;
                    let header;
                    let link = document.createElement('a');
                    switch (element) {
                        case 'dob':
                            icon = 'power';
                            header = "Date of birth:";
                            break;
                        case 'phone':
                            icon = 'telephone';
                            header = "Phone number:";
                            break;
                        case 'mail':
                            icon = 'envelope';
                            header = "E-mail:";
                            if (node.length > 20) {
                                node = node.split('@')[0] + "<br/>@" + node.split('@')[1];
                            }
                            break;
                        case 'website':
                            header = "Website:";
                            icon = 'globe';
                            link.href = node;
                            break;
                        case 'residence':
                            icon = 'geo-alt';
                            header = "Place of residence:";
                            break;
                        case 'marital':
                            icon = 'heart';
                            header = "Marital status:";
                            break;
                        case 'languages':
                            icon = 'translate';
                            header = "Languages:";
                            break;
                    }
                    link.href = '#';
                    link.onclick = ShowText('📋 Copied');
                    detail.className = "p-0 my-4";
                    link.innerHTML = "<p class='h5 mb-1' style='font-weight: bold;'><i class='bi bi-" + icon + " me-2'></i>" + header + "</p><p class='h5 text-break'>" + node + "</p>";
                    detail.appendChild(link);
                    document.getElementById("person").appendChild(detail);
                }
            }
            catch { console.log(element + " not found."); }
        });


        let sectionsXML = xmlDOM.getElementsByTagName("section");
        let i = 0;
        for (let sectionXML of sectionsXML) {
            let j = 0;
            let sectionBox = document.createElement('div');
            sectionBox.className = "my-3 p-0 mx-xxl-5 rounded content-box";
            let children = sectionXML.childNodes;

            let sectionButton = document.createElement('div');
            let sectionContent = document.createElement('div');

            sectionContent.id = "section" + i;
            sectionContent.className = "px-2";
            sectionBox.appendChild(sectionButton);
            sectionBox.appendChild(sectionContent);

            for (let child of children) {
                switch (child.tagName) {
                    case 'html':
                        let htmlContent = document.createElement('div')
                        htmlContent.innerHTML = child.innerHTML;
                        htmlContent.className = "py-1";
                        sectionContent.appendChild(htmlContent);
                        break;
                    case 'title':
                        sectionContent.className = "collapse px-4";
                        sectionButton.innerHTML = "\
                        <button type='button' class='btn btn-light w-100 color-theme btn-lg'  data-bs-toggle='collapse' data-bs-target='#section" + i + "'>\
                        <p class='h5 m-1 float-lg-start'><b>" + child.innerHTML + "</b></p>"
                        console.log("INTO Changed section title");
                        break;
                    case 'subsection':

                        let subBox = document.createElement('div');
                        subBox.className = ''
                        let subChildren = child.childNodes;

                        let subButton = document.createElement('div');
                        let subContent = document.createElement('div');

                        subContent.id = "subsection" + i + "-" + j;
                        subContent.className = "collapse";
                        subBox.appendChild(subButton);
                        subBox.appendChild(subContent);
                        for (let subChild of subChildren) {
                            switch (subChild.tagName) {
                                case 'html':
                                    let htmlContent = document.createElement('div')
                                    htmlContent.innerHTML = subChild.innerHTML;
                                    htmlContent.className = "pb-1 mx-2";
                                    subContent.appendChild(htmlContent);
                                    break;
                                case 'title':
                                    subButton.innerHTML = "\
                                    <button type='button' class='btn btn-light btn-sm w-100 mb-2 color-theme' data-bs-toggle='collapse' data-bs-target='#subsection" + i + "-" + j + "'>\
                                    <p class='h6 m-1 float-lg-start'>" + subChild.innerHTML + "</p>"
                                    console.log("INFO Changed subsection title");
                                    break;
                            }
                        }

                        j++;
                        sectionContent.appendChild(subBox);
                        break;
                    
                };
            }
            content.appendChild(sectionBox);
            i++;
        }

        let footersXML = xmlDOM.getElementsByTagName("footer");
        for (let footerXML of footersXML){

        }
    });
});
}

