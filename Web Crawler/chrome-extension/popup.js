let addSelectorButton = document.getElementById('addSelectorButton');

addSelectorButton.onclick = function(element) {
	
	  chrome.identity.getAuthToken({interactive: true}, function(token) {
	  
		  if (chrome.runtime.lastError) {
		        alert(chrome.runtime.lastError.message);
		        return;
		    }
		    var x = new XMLHttpRequest();
		    x.open('GET', 'https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=' + token);
		    x.onload = function() {
		    	
		        var response = JSON.parse(x.response);
		    	
		        var config = {"id": response.id};
		        
				chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	  				chrome.tabs.executeScript(
							tabs[0].id,
							{file: 'executeScript.js'}
						
					,function(){
						 chrome.tabs.sendMessage( tabs[0].id,{code: 'var config = '+JSON.stringify(config)+';'});
					});
				});
		  
		        
		    };
		    x.send();
	  	  

	  });
	  
  };
  
  