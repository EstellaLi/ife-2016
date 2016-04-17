

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
	leftout: function(arr){
		if(arr.length > 0){
			arr.shift(); //删除并返回数组的第一个元素
		}
	},
	rightout: function(arr){
		if(arr.length > 0){
			arr.pop();  //删除并返回数组的最后一个元素
		}
	},

	leftin: function(arr, item){
		if(arr.length >= arr["maxLength"]){
			event["rightout"](arr);
		}
		arr.unshift(item); //向数组开头加一个／多个元素，返回新长度
	},
	rightin: function(arr, item){
		if(arr.length >= arr["maxLength"]){
			event["leftout"](arr);
		}
		arr.push(item);    //向数组末尾加一个／多个元素，返回新长度
	},
	
	delCurrent: function(arr, index){
		arr.splice(index, 1);
	},
	//冒泡排序
	list: function(arr){
		for (var i = 0; i < arr.length; i++) {
			for (var j = i; j < arr.length; j++) {
				if(arr[i] > arr[j]){
					var temp = arr[j];
					arr[j] = arr[i];
					arr[i] = temp;
				}
			}
		}
	}

}
var dataArr = [];
dataArr["maxLength"] = 60; //最大数量属性值

var render = function(arr){
	var perWidth = $("show").clientWidth / (arr["maxLength"] * 2);

	var str = arr.map(function(e, index){

		return "<div data-index = "+ index + " style='left:" + (perWidth*(2 * index + 1)) + "px; width:" + perWidth + "px; height:" + (e*2) + "px'></div>";
	})
	$("show").innerHTML= str.join("");
}

window.onload = function (){
	addListener($("btn-group"), "click", function(e){
		var num = parseInt($("num").value);
		if(num <= 100 && num>=10){
			var act = e.target.dataset.action || e.srcElement.dataset.action;
			event[act](dataArr ,num);
			render(dataArr);
		}
		else{
			alert("请输入10至100之间的整数");
		}
	});
	addListener($("show"), "click", function(e){
		var index = e.target.dataset.index || e.srcElement.dataset.index;
		event["delCurrent"](index);
		render();
	})
};

