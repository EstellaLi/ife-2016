var addListener = function (element, event, handler) {
	// body...
	if(element.addEventListener) {
		element.addEventListener(event, handler, false);
	} else if (element.attachEvent) {
		element.attachEvent("on"+event, handler);
	} else {
		element["on" + event] = handler;
	}
}
var travelBTree = function(node){
	this.travelList = [];
	this.node = node; // 树的根节点
	this.color = colors[Math.floor(Math.random() * 6)];
}
travelBTree.prototype.preOrder = function(node) {
	// body...
	if(node !== null) {
		this.travelList.push(node);
		if(node.firstElementChild !== null) {
			arguments.callee.call(this, node.firstElementChild);
		}
		if(node.lastElementChild !== null) {
			arguments.callee.call(this, node.lastElementChild);
		}
	}
};
travelBTree.prototype.inOrder = function(node) {
	// body...
	if(node !== null) {
		
		if(node.firstElementChild !== null) {
			arguments.callee.call(this, node.firstElementChild);
		}
		this.travelList.push(node);
		if(node.lastElementChild !== null) {
			arguments.callee.call(this, node.lastElementChild);
		}
	}
};
travelBTree.prototype.postOrder = function(node) {
	// body...
	if(node !== null) {
		if(node.firstElementChild !== null) {
			arguments.callee.call(this, node.firstElementChild);
		}
		if(node.lastElementChild !== null) {
			arguments.callee.call(this, node.lastElementChild);
		}
		this.travelList.push(node);
	}
};
travelBTree.prototype.antimate = function() {
	// body...
	var i = 0;

	var timer = setInterval(function(){
		if(i > 0) {
			this.travelList[i - 1].style["background-color"] = "";
		}
		if(i < this.travelList.length) {
			this.travelList[i].style["background-color"] = this.color;
		} else {
			clearInterval(timer);
		}
		i++;
	}.bind(this), 500);
	
};

var $ = function(element) {
	return document.querySelector(element);
}
var colors = ['#16324a', '#24385e', '#393f65', '#edae9e', '#9ea7bb', '#d7f0f8'];

var init = function() {
	
	addListener($(".btn-group"), "click", function(){
		var e = event.target || event.srcElement;
		if(e.dataset.order !== undefined) {
			var tree1 = new travelBTree($(".container"));
			tree1.travelList = [];
			tree1[e.dataset.order](tree1.node);
			tree1.antimate();
		}
	});
}

window.onload = init;













