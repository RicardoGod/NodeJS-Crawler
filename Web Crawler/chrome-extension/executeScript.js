(function() {
	disableScroll();
	var overlayClickableDiv = document.createElement('div');
	overlayClickableDiv.setAttribute("style", "pointer-events: none; width: 100vw ; height: 100vh; top:0; left: 0; position: fixed;  z-index: 100000; opacity: 0.2 ; background-color: black");  
	overlayClickableDiv.setAttribute("id", "webcrawler-overlaydiv");
	if(!document.querySelector("body > #webcrawler-overlaydiv"))
		document.getElementsByTagName("body")[0].appendChild(overlayClickableDiv);
	
	var iframes = document.getElementsByTagName("iframe");
	for (var i=0; i<iframes.length; i++){
		iframes[i].style.pointerEvents = "none";
	}
	
	document.onclick = function (e) { 
		e.preventDefault();
		e.stopPropagation();
		console.log(getPath(e.target));
		document.onclick = null;
		enableScroll();
		document.getElementsByTagName("body")[0].removeChild(document.querySelector("body > #webcrawler-overlaydiv"));
		return getPath(e.target);
	}
	
	document.onmouseover = function (e) {
		e.target.style.border = "1px solid #FFA500";
		e.target.style.outline = "1px solid #FF8C00";
	}
	
	document.onmouseout = function (e) {
		e.target.style.border = "none";
		e.target.style.outline = "none";
	}

})();	  
  
	  




function getPath( path ) {
	// The first time this function is called, path won't be defined.
	if ( typeof path == 'undefined' ) path = '';

	// If this element is <html> we've reached the end of the path.
	if ( path.nodeName.toLowerCase() == 'html' )
		return 'html' ;

	// Add the element name.
	var cur = path.nodeName.toLowerCase();

	// Determine the IDs and path.
	var id    = path.attributes['id'],
		classe = path.attributes['class'];


	// Add the #id if there is one.
	if ( typeof id != 'undefined' ){
		id = id.value;
		cur += '#' + id;
	}
	// Add any classes.
	if ( typeof classe != 'undefined' ){
		classe = classe.value;
		var classes = classe.split(/[\s\n]+/);
		//cur += '.' + classe.split(/[\s\n]+/).join('.');
		for(var index in classes){
			if(!classes[index].trim() == '')
				cur += '.'+classes[index];
		}
	}
	
	// Recurse up the DOM.
	return getPath(path.parentNode) + ' > ' + cur;
}

/* DISABLE SCROLL */

//left: 37, up: 38, right: 39, down: 40,
//spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
var keys = {37: 1, 38: 1, 39: 1, 40: 1};

function preventDefault(e) {
e = e || window.event;
if (e.preventDefault)
   e.preventDefault();
e.returnValue = false;  
}

function preventDefaultForScrollKeys(e) {
 if (keys[e.keyCode]) {
     preventDefault(e);
     return false;
 }
}

function disableScroll() {
if (window.addEventListener) // older FF
   window.addEventListener('DOMMouseScroll', preventDefault, false);
window.onwheel = preventDefault; // modern standard
window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
window.ontouchmove  = preventDefault; // mobile
document.onkeydown  = preventDefaultForScrollKeys;
}

function enableScroll() {
 if (window.removeEventListener)
     window.removeEventListener('DOMMouseScroll', preventDefault, false);
 window.onmousewheel = document.onmousewheel = null; 
 window.onwheel = null; 
 window.ontouchmove = null;  
 document.onkeydown = null;  
}