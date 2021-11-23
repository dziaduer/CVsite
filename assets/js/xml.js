let xmlContent = '';
fetch('assets/content-en.xml').then((response) => {
    response.text().then((xml) => {
        xmlContent = xml;
        let parser = new DOMParser();
        let xmlDOM = parser.parseFromString(xmlContent, 'application/xml');
        let details = ['dob', 'phone', 'mail', 'website'];
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
                let node = xmlDOM.getElementsByTagName(element)[0].childNodes[0].nodeValue;
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
            sectionBox.className = "flex-column my-3 mx-xxl-5 p-0 rounded content-box";
            let children = sectionXML.childNodes;

            let sectionButton = document.createElement('div');
            let sectionContent = document.createElement('div');

            sectionContent.id = "section" + i;
            sectionContent.className = "collapse p-2";
            sectionBox.appendChild(sectionButton);
            sectionBox.appendChild(sectionContent);

            for (let child of children) {
                switch (child.tagName) {
                    case 'html':
                        let htmlContent = document.createElement('div')
                        htmlContent.innerHTML = child.innerHTML;
                        sectionContent.appendChild(htmlContent);
                        break;
                    case 'title':
                        sectionButton.innerHTML = "<button type='button' class='btn btn-light w-100 m-0 color-theme' data-bs-toggle='collapse' data-bs-target='#section" + i + "'><p class='h5 m-1 float-start'>" + child.innerHTML + "</p>"
                        console.log("INTO Changed section title");
                        break;
                    case 'subsection':

                        let subBox = document.createElement('div');
                        subBox.className = ''
                        let subChildren = child.childNodes;

                        let subButton = document.createElement('div');
                        let subContent = document.createElement('div');

                        subContent.id = "subsection" + i + "-" + j;
                        subContent.className = "collapse p-2";
                        subBox.appendChild(subButton);
                        subBox.appendChild(subContent);
                        for (let subChild of subChildren) {
                            switch (subChild.tagName) {
                                case 'html':
                                    let htmlContent = document.createElement('div')
                                    htmlContent.innerHTML = subChild.innerHTML;
                                    subContent.appendChild(htmlContent);
                                    break;
                                case 'title':
                                    subButton.innerHTML = "<button type='button' class='btn btn-light btn-sm w-100 my-1 color-theme' data-bs-toggle='collapse' data-bs-target='#subsection" + i + "-" + j + "'><p class='m-1 float-start'>" + subChild.innerHTML + "</p>"
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
    });
});


