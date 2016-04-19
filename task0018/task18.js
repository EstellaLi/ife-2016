

var addListener = function (element, event, handler){
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
var $ = function(element){
	return document.getElementById(element);
}

var event = {
	leftIn: function(item){
		dataArr.unshift(item); //向数组开头加一个／多个元素，返回新长度
	},
	rightIn: function(item){
		dataArr.push(item);    //向数组末尾加一个／多个元素，返回新长度
	},
	leftOut: function(){
		if(dataArr.length > 0){
			dataArr.shift(); //删除并返回数组的第一个元素
		}
	},
	rightOut: function(){
		if(dataArr.length > 0){
			dataArr.pop();  //删除并返回数组的最后一个元素
		}
	},
	delCurrent: function(index){
		dataArr.splice(index, 1);
	}
}
var dataArr = [];

var render = function(){

	var arr = dataArr.map(function(e, index){
		return "<div data-index = "+ index+">" + e + "</div>";
	})
	$("show").innerHTML= arr.join("");
}

window.onload = function (){
	addListener($("btn-group"), "click", function(e){
		
		var act = e.target.dataset.action || e.srcElement.dataset.action;
		event[act](parseInt($("num").value));
		render();
	});
	addListener($("show"), "click", function(e){
		var index = e.target.dataset.index || e.srcElement.dataset.index;
		event["delCurrent"](index);
		render();
	})
};

