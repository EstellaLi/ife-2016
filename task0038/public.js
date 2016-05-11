var addListener = function(element, event, handler) {
	if (element.addEventListener) {
		element.addEventListener(event, handler, false);
	} else if (element.attachEvent) {
		element.attachEvent('on' + event, handler);
	} else {
		element['on' + event] = handler;
	}
}
var $ = function(element) {
	return document.querySelector(element);
}