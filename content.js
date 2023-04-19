//Listen to the double click event
window.addEventListener("dblclick", gotText);


function gotText(){
    
    // get selected text
    var selectedText = window.getSelection().toString().trim();
    
 
    //send selected text to background scripts
    if (selectedText.length > 0){
        let message = {
            txt:selectedText
        }
        chrome.runtime.sendMessage(message);

    }



    //receive meaning from background(via api call)
    chrome.runtime.onMessage.addListener(receive);
    

    function receive(request, sender, sendResponse){

        if (selectedText == request.words){

            //create popup elements  
            let container = document.createElement("div");
            container.classList.add("popup");
            
            
            let heading = document.createElement("h3");
            heading.textContent = request.words;
            heading.setAttribute("id","heading");
            container.appendChild(heading);
            container.appendChild(document.createElement("hr"))

            let button = document.createElement("button");
            button.textContent = "X";
            button.setAttribute("id","close");
            container.appendChild(button);

            

            let transcript = document.createElement("h4");
            transcript.textContent = request.phonetics;
            transcript.setAttribute("id","transcript");
            container.appendChild(transcript);


            
            let content = document.createElement("div");
            content.textContent = request.txt;
            content.classList.add("content");
            container.appendChild(content);

            if(request.txt == "COULDN'T FIND WORD!")
            {
                content.style.color = "red";
            }
            

            
            document.body.appendChild(container);


            
            //position the popup
            var position = window.getSelection().getRangeAt(0).getBoundingClientRect();
            var relative = document.body.parentNode.getBoundingClientRect();
            container.style.top =(position.bottom -relative.top)+'px';//this will place ele below the selection
            container.style.left=(position.left-relative.left)+'px';//this will align the left edges together
            


            //close popup
            document.addEventListener('click', function(e) {
                e.preventDefault();
                
                button.parentNode.style.display = 'none';
                }, false);


        }

    }
}