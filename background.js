//receive response from content script
chrome.runtime.onMessage.addListener(received);

function received(request, sender, sendResponse){
    window.word = request.txt;

    fetch(`https://api.dictionaryapi.dev/api/v2/entries/en_US/${word}`)
    .then(response => { 
        console.log(response.status);
        
        
        return response.json()
        })
        .then(data => 
            {
                    window.phonetic = data[0].phonetics[0].text;
                    window.sound = data[0].phonetics[0].audio;
                    window.definition = data[0].meanings[0].definitions[0].definition;
                    
                    let meaning = 
                    {
                        phonetics:phonetic,
                        sounds:sound,
                        txt: definition,
                        words: word
                    }

    
                    //send meaning to content-scripts
                    
                   chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                   chrome.tabs.sendMessage(tabs[0].id, meaning);
                   })
                
           
                })

        
        

    
    .catch(function() {
        let meaning = 
        {
            txt: "COULDN'T FIND WORD!",
            words:window.word 
        }
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, meaning);
    
        })
    });

}
     


                    

                
            

   
 


