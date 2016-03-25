/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = [];
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	var city = document.getElementById("aqi-city-input").value.replace(/\s+/g, "");
	var aqi = document.getElementById("aqi-value-input").value.replace(/\s+/g, "");

	if (!isNaN(aqi) && parseInt(aqi) == parseFloat(aqi)) {
		if (city.match(/[\u4e00-\u9fa5|a-zA-Z]+/)) {
			aqiData.push({
				city, aqi
			});
		} else {
			alert("城市名称应为中英文字符");
		}
	} else {
		alert('AQI应为整数');
	}
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var table = document.getElementById("aqi-table");
	table.innerHTML = "<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
	for (var i = 0; i < aqiData.length; i++) {
		table.innerHTML += "<tr><td>" + aqiData[i].city + "</td><td>" + aqiData[i].aqi + "</td><td><button id='button" + i + "' >删除</button></td></tr>";
			
		(function (t){
			var btn = document.getElementById("button" + t);
			btn.addEventListener("click", function(){alert(t);}, false);

		})(i);
		
	}
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
	addAqiData();
	renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle() {
	// do sth.
	console.log(this);
}

function init() {

	// 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数

	// 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
	document.getElementById("add-btn").onclick = addBtnHandle;
}

window.onload = init;