var addListener = function(element, event, handler) {
	// body...
	if(element.addEventListener) {
		element.addEventListener(event, handler, false);
	}
	else if(element.attachEvent) {
		element.attachEvent("on"+event, handler);
	}
	else {
		element["on" + event] = handler;
	}
}
var $ = function(element) {
	return document.querySelector(element);
}
var Act = function(domShowId){
	this.queue = [];
	this.maxLen = 10;
	this.domShowId = domShowId; 
}
Array.prototype.includes = function(searchElement){
	var obj = Object(this);
	var len = obj.length || 0;
	if(len === 0) 
		return false;
	var n = parseInt(arguments[1]) || 0; 
	var k = 0;
	if(n>=0) {
		k = n;
	} else {
		k = len + n;
		if(k < 0) {
			k = 0;
		}
	}
	while(k < len) {
		if(obj[k] === searchElement) {
			return true;
		}
		k++;
	}
	return false;
}
Act.prototype.inQueue = function(item) {
	// body...
	item = Array.prototype.concat(item); //new array
	for (var i = 0; i < item.length; i++) {
		if(!this.queue.includes(item[i])) {
			if(this.queue.length >= this.maxLen){
				this.queue.shift();
			}
			this.queue.push(item[i]);
		}	
	}
};
Act.prototype.delCurent = function(index) {
	// body...
	if(index) {
		this.queue.splice(index, 1);
		Act.prototype.render.call(this);
	}

};
Act.prototype.render = function() {
	// body...
	$(this.domShowId).innerHTML = this.queue.map(function(e, index){
		return "<div data-index = '" + index + "'>" + e + "</div>";
	}).join(" ");
};
Act.prototype.splitData = function(pattern, str) {
	// body...
	var arr = str.split(pattern);
	if(arr[arr.length - 1] === "") {
		arr.pop();
	}
	return arr;
};

var init = function(){
	var tag = new Act("#tagShow");
	var hobby = new Act("#hobbyShow");

	addListener($("#hobbyBtn"), "click", function(){
		var a = hobby.splitData(/[,|.|，| |。|\s|\r]+/g, $("#hobbyInpt").value);
		hobby.inQueue(a);
		hobby.render();
	});
	addListener($("#tagInpt"), "keyup", function(){
		var t = $("#tagInpt");
		if(new RegExp("[,|\s|\r| ]+", "g").test(t.value) || event.keyCode === 13) {
			tag.inQueue(tag.splitData(/[,|.|，| |。|\s|\r]+/g, t.value));
			tag.render();
			t.value = "";
		}
	});

	addListener($(tag.domShowId), "mouseover", function(){
		var e = event.target || event.srcElement;
		if(e.dataset.index !== undefined) {
			
			e.classname += " select";//e.style["background-color"] = "red";
			e.innerHTML = "点击删除" + e.innerHTML;
		}
	});

	addListener($(tag.domShowId), "mouseout", function(){
		var e = event.target || event.srcElement;
		if(e.dataset.index !== undefined) {
			e.className -=" select";
			e.innerHTML = e.innerHTML.toString().substring(4);
		}
	});

	addListener($(tag.domShowId), "click", function(){
		var e = event.target || event.srcElement;
		if(e.dataset.index !== undefined) {
			tag.delCurent(e.dataset.index);
		}
	});
}
window.onload = init;