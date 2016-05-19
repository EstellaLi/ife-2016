var DateTool = (function() {
	function init(obj) {
		var t = new DatePick(obj);
		t.renderHeadWeek();
		t.renderDate();
		t.bindListener();
		return t;
	}

	function DatePick(obj) {
		this.id = obj.id;
		this.earlyDate = obj.earlyDate || new Date(1970);
		this.latestDate = obj.latestDate || new Date(2020);
		this.initDate = obj.initDate || new Date();
		this.isDatePeriod = obj.isDatePeriod || false;
		this.min = obj.min || 0;
		this.max = obj.max || 0;

		this.selCallFunction = null;
		this.selArr = [];
		this.pageDate = null;
	}
	DatePick.prototype = {
		week: ['日', '一', '二', '三', '四', '五', '六'],
		dateCount: 42,
		selCall: function(fn) {
			this.selCallFunction = fn;
		},
		//根据dom元素e，返回e对应的选择日期 e.dataset.ymd
		getSelDate: function(e) {
			var ymd = e.dataset.ymd.split("-"); //e为当前选中元素
			ymd = new Date(ymd[0], ymd[1] - 1, ymd[2]); //当前的选择日期
			return ymd;
		},
		//判断d1和d2是否满足最小与最大日期间隔,满足返回true
		validMinMax: function(d1, d2) {
			var sub = Math.abs(Math.floor((d1 - d2) / (1000 * 3600 * 24))); //相间隔的天数
			return sub >= this.min && sub <= this.max;
		},
		bindListener: function() {
			var self = this;
			$(self.id + " div").click(function(e) {
				var e = e.target || e.srcElement;

				if (e.nodeName === "SPAN") {
					var d = self.getSelDate(e); //e的date格式
					if (d < self.earlyDate || d > self.latestDate) {
						alert("expire earlyDate latestDate");
						return;
					}
					if (self.isDatePeriod) {
						var len = self.selArr.length;

						if (len === 0) {
							self.selArr.push(d);
						} else if (len < 3) {
							if (self.validMinMax(self.selArr[len - 1], d)) {
								if (self.selArr.push(d) > 2) {
									self.selArr.shift();
								}
							} else {
								alert("expire min max");
							}
						}
					} else {
						self.selArr[0] = d;
					}
					self.renderDate(d);
					self.selCallFunction();
				}
			});
			$(self.id + " div.left-arrow").click(function(e) {
				var ymd = new Date(self.pageDate);
				ymd.setMonth(ymd.getMonth() - 1);
				self.renderDate(ymd);
			});
			$(self.id + " div.right-arrow").click(function(e) {
				var ymd = new Date(self.pageDate);
				ymd.setMonth(ymd.getMonth() + 1);
				self.renderDate(ymd);
			});
			$(self.id).parent().find("input").on("click", function() {
				if ($(self.id).css("display") === "none") {
					$(self.id).css("display", "block"); //$().show()
				} else {
					$(self.id).css("display", "none");
				}
			});
		},
		renderHeadWeek: function() {
			var head = $("<p></p>").appendTo($(this.id));
			$("<div></div>").addClass("left-arrow").appendTo(head);
			$("<div></div>").addClass("right-arrow").appendTo(head);
			head.append(document.createTextNode(" "));
			$(this.week.map(function(ele) {
				if (ele === '日' || ele === '六')
					return "<span class='red'>" + ele + "</span>";
				else
					return "<span>" + ele + "</span>";
			}).join("")).appendTo($(this.id));
			$("<div></div>").appendTo($(this.id));
		},
		renderDate: function() {
			var dtSelect = arguments[0] || this.initDate;
			this.pageDate = new Date(dtSelect);

			var f = new Date(dtSelect.getFullYear(), dtSelect.getMonth(), 1); //本月第一天
			f.setDate(f.getDate() - f.getDay()); //日历上显示的第一天

			var str = "";
			for (var i = 0; i < this.dateCount; i++) {
				var ymd = f.getFullYear() + "-" + (f.getMonth() + 1) + "-" + f.getDate();
				if (f < this.earlyDate || f > this.latestDate) {
					str += "<span class='unreachable' data-ymd='" + ymd + "'>" + f.getDate() + "</span>";
				} else {
					if (this.selArr[0] && this.selArr[0].toDateString() === f.toDateString() || this.selArr[1] && this.selArr[1].toDateString() === f.toDateString()) {
						str += "<span class='select' data-ymd='" + ymd + "'>" + f.getDate() + "</span>";
					} else {
						if (this.selArr.length === 2 && (Math.abs(f - this.selArr[0]) + Math.abs(f - this.selArr[1])) === Math.abs(this.selArr[1] - this.selArr[0])) {
							str += "<span class='dateperiod' data-ymd='" + ymd + "'>" + f.getDate() + "</span>";
						} else {
							if (f.getMonth() !== dtSelect.getMonth()) {
								str += "<span class='ccc' data-ymd='" + ymd + "'>" + f.getDate() + "</span>";
							} else if (f.getDay() === 0 || f.getDay() === 6) {
								str += "<span class='red' data-ymd='" + ymd + "'>" + f.getDate() + "</span>";
							} else {
								str += "<span data-ymd='" + ymd + "'>" + f.getDate() + "</span>";
							}
						}
					}
				}
				f.setDate(f.getDate() + 1);
			}
			$(this.id + ">div").html(str);
			document.querySelector(this.id + " p").childNodes[2].textContent = dtSelect.getFullYear() + "年" + (dtSelect.getMonth() + 1) + "月";
		}
	}
	return init;
})();

var d1 = DateTool({
	id: "#calender1",
	initDate: new Date(),
	earlyDate: new Date(2016, 3),
	latestDate: new Date(2016, 9, 15),
	isDatePeriod: false,
});
d1.selCall(function() {
	if (this.selArr.length === 1) {
		str = this.selArr[0].toDateString();
		$(this.id).parent().find("input").val(str);
		alert(str);
	}
});
var d2 = DateTool({
	id: "#calender2",
	initDate: new Date(),
	earlyDate: new Date(2016, 3),
	latestDate: new Date(2016, 9, 15),
	isDatePeriod: true,
	min: 1,
	max: 70
});
d2.selCall(function() {
	if (this.selArr.length === 2) {
		var str = this.selArr[1] > this.selArr[0] ? this.selArr[0].toDateString() + "-" + this.selArr[1].toDateString() : this.selArr[1].toDateString() + "-" + this.selArr[0].toDateString();

		$(this.id).parent().find("input").val(str);
		alert(str);
	}
})