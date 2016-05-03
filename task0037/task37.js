function addListener(element, event, handler) {
	if (element.addEventListener) {
		element.addEventListener(event, handler, false);
	} else if (element.attachEvent) {
		element.attachEvent("on" + event, handler);
	} else {
		element["on" + event] = handler;
	}
}
function $(selector) {
	return document.querySelector(selector);
}
/*
实现相对于浏览器视口自动居中
*/
var autoCenter = function() {
	var element = arguments[0] ? arguments[0] : $(".show");
	var eleW = element.offsetWidth;
	var eleH = element.offsetHeight;

	var docW = document.documentElement.clientWidth;
	var docH = document.documentElement.clientHeight;

	element.style.left = (docW - eleW) / 2 + "px";
	element.style.top = (docH - eleH) / 2 + "px";
}
/*
实现遮光罩全屏
*/
var fullMask = function(){
	var element = arguments[0] ? arguments[0] : $(".mask");
	element.style.width = document.documentElement.clientWidth + "px";
	element.style.height = document.documentElement.clientHeight + "px";
}

var isDrag = false;
var mouseRelativeX =0;
var mouseRelativeY =0;



window.onload = function() {
	autoCenter($(".show"));
	fullMask();
	addListener($(".mask"), "click", function(){
		$(".mask").style.display = "none";
		$(".show").style.display = "none";
	});
	addListener($("#btn-show"), "click", function(){
		$(".mask").style.display = "block";
		$(".show").style.display = "block";
		autoCenter($(".show"));
	});
	addListener($(".show"),"mousedown", function(){
		isDrag = true;
		mouseRelativeX = event.clientX - $(".show").offsetLeft;
		mouseRelativeY = event.clientY - $(".show").offsetTop;		
	});
	addListener($(".mask"), "mousemove", function(){
		var e = event;
		if(isDrag){
			$(".show").style.left = (e.clientX - mouseRelativeX) + "px";
			$(".show").style.top = (e.clientY - mouseRelativeY) + "px";
		}
	});
	addListener($(".show"), "mouseup", function(){
		isDrag = false;
	})
}
window.onresize = function() {
	autoCenter($(".show"));
	fullMask();
}