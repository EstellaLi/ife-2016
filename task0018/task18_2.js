
var addListener = function (element, event, handler) {
	if(element.addEventListener){
		element.addEventListener(event, handler, false);
	}
	else if(element.attachEvent){
		element.attachEvent('on'+event, handler);
	}
	else{
		element["on"+event] = handler;
	}
}
var $ = function(element) {
	return document.getElementById(element);
}
var Act = function() {
	this.dataArr = [];
}
Act.prototype.leftIn = function(item) {
	// body...
	this.dataArr.unshift(item); //head insert
};
Act.prototype.rightIn = function(item) {
	// body...
	this.dataArr.push(item); //title insert
};
Act.prototype.leftOut = function() {
	// body...
	if(this.dataArr.length > 0) {
		alert(this.dataArr.shift());
	}
};
Act.prototype.rightOut = function() {
	// body...
	if(this.dataArr.length > 0) {
		alert(this.dataArr.pop());
	}
};
Act.prototype.delCurrent = function(index) {
	// body...
	if(index) {
		alert(this.dataArr.splice(index, 1));
	}
};
Act.prototype.render = function() {
	// body...
	var arr = this.dataArr.map(function(e, index) {
		return "<div data-index = "+ index+">" + e + "</div>";
	})
	$("show").innerHTML= arr.join("");
};

window.onload = function() {
	var a = new Act();
	addListener($("btn-group"), "click", function(){
		var e = event.target.dataset.action || event.srcElement.dataset.action;
		var item = parseInt($("num").value);
		if(item) {
			a[e](item);
			a.render();
		}
		else {
			alert("请输入数字");
			$("num").value = ""; 
		}
	});
	addListener($("show"), "click", function(){
		var index = event.target.dataset.index || event.srcElement.dataset.index;
		a["delCurrent"](index);
		a.render();
	})
}








