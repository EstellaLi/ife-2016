var TableTool = (function() {
	function init(obj) {
		var table = new Table(obj);
		table.render();
		table.bindListener();
		return table;
	}
	function Table(data) {
		if (data instanceof Object) {
			this.id = data.tableId;
			this.thead = data.thead;
			this.sortSwitch = data.sortSwitch;
			this.tbody = data.tbody;
			this.frozen = data.frozen;
		}
	}
	Table.prototype = {
		frozenThead: function(){
			var rect = $(this.id).getBoundingClientRect();
			var nowHead = $(this.id+" thead");
			if(rect.top <= 0){
				nowHead.style.position = "fixed";
				nowHead.style.top = 0;
				nowHead.style.left = rect.left;
			}
			else {
				$(this.id+" thead").style.position = "static";
			}
			if(rect.bottom <= 0) {
				$(this.id+" thead").style.position = "static";
			}
		},
		sortDesc: function(theadColName) {
			this.tbody.sort(function(a, b) {
				return b[theadColName] - a[theadColName];
			})
		},
		sortAsc: function(theadColName) {
			this.tbody.sort(function(a, b) {
				return a[theadColName] - b[theadColName];
			})
		},
		render: function() {
			var str = "<thead><tr>";
			var self = this;
			str += self.thead.map(function(ele, index) {
				if (self.sortSwitch[index]) {
					return '<th>' + ele + '<span class="asc"></span><span class="desc"></span></th>';
				} else {
					return '<th>' + ele + '</th>';
				}
			}).join('') + "</tr></thead><tbody>";
			str += self.tbody.map(function(objele) {
				var inner = '<tr>';
				for (var i = 0; i < self.thead.length; i++) {
					inner += '<td>' + objele[self.thead[i]] + '</td>';
				}
				return inner + '</tr>';
			}).join('') + "</tbody>";
			$(self.id).innerHTML = str;
		},
		bindListener: function() {
			var self = this;
			var table = $(self.id);
			//表头添加点击事件－排序
			addListener(table.tHead, 'click', function() {
				var e = event.target;
				var colName = e.parentNode.textContent;
				if (e.className === "asc") {
					self.sortAsc(colName);
					self.render();
					self.bindListener();
				} else if (e.className === "desc") {
					self.sortDesc(colName);
					self.render();
					self.bindListener();
				}
			});
			if(self.frozen){
				addListener(window, 'scroll', function(){
					self.frozenThead();
				})
			}
		}
	}
	return init;
})();

var tableOne = TableTool({
	tableId: "#table-one",
	thead: ['name', 'chinese', 'math', 'english'],
	tbody: [{
		name: 'one',
		chinese: 60,
		math: 90,
		english: 80
	}, {
		name: 'two',
		chinese: 90,
		math: 60,
		english: 80
	}, {
		name: 'three',
		chinese: 80,
		math: 70,
		english: 80
	}, {
		name: 'four',
		chinese: 85,
		math: 75,
		english: 85
	}],
	sortSwitch: [false, false, true, true],
	frozen: true
});
var tableTwo = TableTool({
	tableId: "#table-two",
	thead: ['name', 'chinese', 'math', 'english', 'music'],
	tbody: [{
		name: 'zhangsan',
		chinese: 60,
		math: 90,
		english: 80,
		music: 100
	}, {
		name: 'lisi',
		chinese: 90,
		math: 60,
		english: 68,
		music: 90
	}, {
		name: 'wanger',
		chinese: 80,
		math: 70,
		english: 95,
		music: 85
	}],
	sortSwitch: [false, true, true, true, true],
	frozen:false
});
