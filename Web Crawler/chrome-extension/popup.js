 let selectorEventButton = document.getElementById('selectorEventButton');

  
  selectorEventButton.onclick = function(element) {
	    //let color = element.target.value;
	  
//	  var overlayClickableDiv = document.createElement('div')
//	  overlayClickableDiv.setAttribute("style", "pointer-events: none; width : 100% ; z-index: 5000; top: 0 ; left: 0; opacity : 0.4 ;position: absolute; background-color: black");  
//	  document.getElementsByTagName("body")[0].appendChild(overlayClickableDiv);
	  
  		let uniqueSelector = chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  			chrome.tabs.executeScript(
  				tabs[0].id,
  				{file: '/executeScript.js'}
  			);
  		});
		
//		console.log(uniqueSelector);
  };
  
  