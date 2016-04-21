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
	
}
//深度优先
travelBTree.prototype.DFS = function(node) {
	this.travelList.push(node);
	for (var i = 0; i < node.children.length; i++) {
		if (node.children[i] !== null) {
			arguments.callee.call(this, node.children[i]);
		}
	}
};
//广度优先
travelBTree.prototype.BFS = function(node) {
	// body...
	var queue =[];
	queue.push(node);
	//this.travelList.push(node)
	// for (var i = 0; i < node.children.length; i++) {
	// 	queue.push(node.children[i]);
	// }
	while(queue.length !== 0) {
		var curNode = queue.shift();
		this.travelList.push(curNode);

		for (var i = 0; i < curNode.children.length; i++) {
			if (curNode.children[i] !== null) {
				queue.push(curNode.children[i]);
			}
		}
	}	
};
travelBTree.prototype.antimate = function(search) {
	// body...
	var i = 0;

	this.travelList.forEach(function(e){
		e.style["background-color"] = "white";
	});
	var timer = setInterval(function(){
		if(i > 0) {
			if(this.travelList[i - 1].firstChild.textContent.trim() !== search) {
				this.travelList[i - 1].style["background-color"] = "";
			} else {
				this.travelList[i - 1].style["background-color"] = '#d7f0f8';
			}
		}
		if(i < this.travelList.length) {
			this.travelList[i].style["background-color"] = '#d7f0f8';
		} else {
			clearInterval(timer);
		}
		i++;
	}.bind(this), 500);
	
};

var $ = function(element) {
	return document.querySelector(element);
}

var init = function() {
	
	addListener($(".btn-group"), "click", function(){
		var e = event.target || event.srcElement;
		if(e.dataset.order !== undefined) {
			var tree1 = new travelBTree($(".container"));
			var search = $("#searchInput").value.trim();

			tree1.travelList = [];
			tree1[e.dataset.order](tree1.node);
			tree1.antimate(search);
		}
	});

}

window.onload = init;













