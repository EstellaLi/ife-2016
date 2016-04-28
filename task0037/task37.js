function addListener(element, event, handler) {
	if (element.addEventListener) {
		element.addEventListener(event, handler, false);
	} else if (element.attachEvent) {
		element.attachEvent("on" + event, handler);
	} else {
		element["on" + event] = handler;
	}
}
//ctrl+alt+f
function $(selector) {
	return document.querySelector(selector);
}
var autoCenter = function() {
	var element = arguments[0] ? arguments[0] : $(".show");
	var eleW = element.offsetWidth;
	var eleH = element.offsetHeight;

	var docW = document.documentElement.clientWidth;
	var docH = document.documentElement.clientHeight;

	element.style.left = (docW - eleW) / 2 + "px";
	element.style.top = (docH - eleH) / 2 + "px";
}
var fullMask = function(){
	var element = arguments[0] ? arguments[0] : $(".mask");
	element.style.width = 
}
window.onload = function() {
	autoCenter($(".show"));
}
window.onresize = function() {
	autoCenter($(".show"));
}