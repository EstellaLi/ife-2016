
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
Act.prototype.leftIn = function(str) {
	var arr = Act.prototype.splitData(str);

	for (var i = 0; i < arr.length; i++) {
		this.dataArr.unshift(arr[i]); 
	}
};
Act.prototype.rightIn = function(str) {
	var arr = Act.prototype.splitData(str);
	for (var i = 0; i < arr.length; i++) {
		this.dataArr.push(arr[i]); 
	}
};
Act.prototype.leftOut = function() {
	if(this.dataArr.length > 0) {
		alert(this.dataArr.shift());
	}
};
Act.prototype.rightOut = function() {
	if(this.dataArr.length > 0) {
		alert(this.dataArr.pop());
	}
};
Act.prototype.delCurrent = function(index) {
	if(index) {
		alert(this.dataArr.splice(index, 1));
	}
};
Act.prototype.render = function(str) {
	var arr = this.dataArr.map(function(e, index) {

		if(str && str.length > 0) {
			e = e.replace(new RegExp(str, "g"), "<span class = 'selected'>" + str + "</span>")
		}
		return "<div data-index = "+ index+">" + e + "</div>";
	})
	$("show").innerHTML= arr.join("");
};
Act.prototype.splitData = function(str) {
	var pattern = /[,|、|.|。|\s]+/;
	var strarr = str.split(pattern);
	return strarr;
};

window.onload = function() {
	var a = new Act();
	addListener($("btn-group"), "click", function(){
		var e = event.target.dataset.action || event.srcElement.dataset.action;
		var str = $("data").value.trim();
		if(e !== "search") {
			a[e](str);
			a.render();
		}
		else {
			var str1 = $("searchInput").value.trim();
			a.render(str1);
		}
	});
	addListener($("show"), "click", function(){
		var index = event.target.dataset.index || event.srcElement.dataset.index;
		a["delCurrent"](index);
		a.render();
	})
}








