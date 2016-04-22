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
travelBTree.prototype.deepFS = function(node) {
	this.travelList.push(node);
	for (var i = 0; i < node.children.length; i++) {
		if (node.children[i] !== null) {
			arguments.callee.call(this, node.children[i]);
		}
	}
};
//广度优先
travelBTree.prototype.breadthFS = function(node) {
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
travelBTree.prototype.insertNode = function(parnode,content) {
	// body...
	var div = document.createElement("div");
	div.appendChild(document.createTextNode(content));
	parnode.appendChild(div);
};
travelBTree.prototype.removeNode = function(node) {
	// body...
	node.parentNode.removeChild(node);
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
	var tree1 = new travelBTree($(".container"));
	var search = $("#searchInput").value.trim();


	addListener($(".btn-fs"), "click", function(){
		var e = event.target || event.srcElement;
		if(e.dataset.order !== undefined) {
			tree1.travelList = [];
			tree1[e.dataset.order](tree1.node);
			tree1.antimate(search);
		}
	});

	var choosen = null;
	addListener($(".container"), "click", function(){
		var e = event.target || event.srcElement;
		if(choosen !== null) {
			choosen.style["background-color"] = "white";
		}
		if(e.style["background-color"] !== "orange") {
			e.style["background-color"] = "orange";
			choosen = e;
		}
	});
	addListener($(".btn-dm"), "click", function(){
		var e = event.target || event.srcElement;
		if (e.dataset.dm !== undefined) {
			if(choosen !== null){
				var content = $("#insertInput").value.trim();
				switch(e.dataset.dm){
					case "insert":
						tree1.insertNode(choosen, content);
						break;
					case "delete":
						tree1.removeNode(choosen);
						break;
				}
			}
			
		}

	});


}

window.onload = init;













