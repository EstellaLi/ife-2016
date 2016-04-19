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

var action = {
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
		if(arr.length >= maxLength){
			action["rightout"](arr);
		}
		arr.unshift(item); //向数组开头加一个／多个元素，返回新长度
	},
	rightin: function(arr, item){
		if(arr.length >= maxLength){
			action["leftout"](arr);
		}
		arr.push(item);    //向数组末尾加一个／多个元素，返回新长度
	},
	
	delCurrent: function(arr, index){
		if(index)
			arr.splice(index, 1);
	},
	//冒泡排序
	poplist: function(arr, arrset){
		for (var i = 0; i < arr.length; i++) {
			for (var j = i; j < arr.length; j++) {
				if(arr[i] > arr[j]){
					var temp = arr[j];
					arr[j] = arr[i];
					arr[i] = temp;
					arrset.push(arr.slice());
				}
			}
		}
	},
	list: function(arr, arrset){
		action["poplist"](arr, arrset);
		var timer = setInterval(paint, 500);
		function paint(){
			var current = arrset.shift();
			if(arrset.length >= 0){
				render(current);
			}
			else{
				clearInterval(timer);
			}
		}
	}

}
var dataArr = [];
var maxLength = 60; //最大数量属性值
var dataArrSet = [];
var colors = ['#16324a', '#24385e', '#393f65', '#4e4a67', '#5a4563', '#b38e95', '#9ea7bb', '#99b4ce'];

var render = function(arr){
	var perWidth = $("show").clientWidth / (maxLength * 2);

	var str = arr.map(function(e, index){
		return "<div data-index = "+ index + " style='left:" + (perWidth*(2 * index + 1)) + "px; width:" + perWidth + "px; height:" + (e*2) + "px; background-color:"+ getColor(e) +"'></div>";
	})
	$("show").innerHTML= str.join("");
}
var getColor = function(value){
	if (value < 30) {
         return colors[0];
     } else if (value >= 30 && value < 40) {
         return colors[1];
     } else if (value >= 40 && value < 50) {
         return colors[2];
     } else if (value >= 50 && value < 60) {
         return colors[3];
     } else if (value >= 60 && value < 70) {
         return colors[4];
     } else if (value >= 70 && value < 80) {
         return colors[5];
	 }else if (value >= 80 && value < 90) {
         return colors[6];
	 }else if (value >= 90 && value < 100) {
         return colors[7];
	 }
}

window.onload = function (){
	addListener($("btn-group"), "click", function(e){
		var num = parseInt($("num").value);
		if(num <= 100 && num>=10){
			var act = e.target.dataset.action || e.srcElement.dataset.action;
			if(act !== "list"){
				action[act](dataArr ,num);
				render(dataArr);
			}
			else
				action[act](dataArr ,dataArrSet);
			
		}
		else{
			alert("请输入10至100之间的整数");
		}
	});
	addListener($("show"), "click", function(e){
		var index = e.target.dataset.index || e.srcElement.dataset.index;
		action["delCurrent"](dataArr, index);
		render(dataArr);
	})
};

