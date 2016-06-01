function addEvent(element, event, handler){
	if(element.addEventListener) {
		element.addEventListener(event, handler, false);
	} else if(element.attachEvent) {
		element.attachEvent('on'+event, handler);
	} else {
		element['on'+event] = handler;
	}
}
var test1 = new GalleryColumn(".container");
test1.init();
addEvent(document.querySelector('#addBox'), "click", test1.addItem.bind(test1));