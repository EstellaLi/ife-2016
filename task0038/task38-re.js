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
		}
	}
	Table.prototype = {
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
					return '<td>' + ele + '<span class="asc"></span><span class="desc"></span></td>';
				} else {
					return '<td>' + ele + '</td>';
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
			var htmlThead = $(self.id).tHead;
			addListener(htmlThead, 'click', function() {
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
	sortSwitch: [false, false, true, true]
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
	sortSwitch: [false, true, true, true, true]
});