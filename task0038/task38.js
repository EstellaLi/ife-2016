var data = [];
var getData = function() {
	var tb = $("table"); //第一个表格
	var thead = tb.tHead.getElementsByTagName("th"); //获得表头元素
	var tbody = tb.tBodies[0].getElementsByTagName("tr"); //获得表主体内容

	for (var i = 0; i < tbody.length; i++) {
		var item = {};
		for (var j = 0; j < thead.length; j++) {
			item[thead[j].textContent] = tbody[i].children[j].textContent;
		}
		data.push(item);
	}
}
var sortData = function(colName) {
	return {
		asc: function() {
			data.sort(function(a, b) {
				return a[colName] - b[colName];
			});
		},
		desc: function() {
			data.sort(function(a, b) {
				return b[colName] - a[colName];
			});
		}
	}
}
var render = function() {
	var tb = $("table"); //第一个表格
	var tbody = tb.tBodies[0]; //获得表主体
	tbody.innerHTML = data.map(function(item) {
		var str = "<tr>";
		for (x in item) {
			str += "<td>" + item[x] + "</td>";
		}
		return str + "</tr>";
	}).join("");
}
window.onload = function() {
	getData();
	addListener($("#th"), "click", function() {
		var e = event.target;
		var colName = e.parentNode.textContent;
		if (e.className === "asc") {
			sortData(colName).asc();
			render();
		} else if (e.className === "desc") {
			sortData(colName).desc();
			render();
		}
	});

};