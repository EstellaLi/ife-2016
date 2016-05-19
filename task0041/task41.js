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
		this.sEle = null;
		this.selCallFunction = null;
	}
	DatePick.prototype = {
		week: ['日', '一', '二', '三', '四', '五', '六'],
		dateCount: 42,
		selCall: function(fn){
			this.selCall = fn;
		},
		//根据dom元素e，返回e对应的选择日期
		getSelDate: function(e) {
			var ymd = e.dataset.ymd.split("-"); //e为当前选中元素
			ymd = new Date(ymd[0], ymd[1] - 1, ymd[2]); //当前的选择日期
			return ymd;
		},
		setSelDate: function(e) {
			var ymd = this.getSelDate(e); //当前的选择日期
			if (ymd < this.earlyDate || ymd > this.latestDate) {
				alert("expire");
				return;
			}
			$(this.sEle).removeClass("select");
			var ymdOld = this.getSelDate(this.sEle); //上次被选择的日期
			if (ymd.getMonth() === ymdOld.getMonth()) {
				$(e).toggleClass("select");
				this.sEle = e;
			} else {
				this.renderDate(ymd);
			}
		},
		bindListener: function() {
			var self = this;
			$(self.id + " div").click(function(e) {
				var e = e.target || e.srcElement;
				if (e.nodeName === "SPAN") {
					self.setSelDate(e);
					self.selCall(); //回调函数执行
					$("#dateText").val(self.sEle.dataset.ymd);
				}
			});
			$(self.id + " div.left-arrow").click(function(e) {
				var ymd = self.getSelDate(self.sEle);
				ymd.setMonth(ymd.getMonth() - 1);
				self.renderDate(ymd);
			});
			$(self.id + " div.right-arrow").click(function(e) {
				var ymd = self.getSelDate(self.sEle);
				ymd.setMonth(ymd.getMonth() + 1);
				self.renderDate(ymd);
			});
			$("#dateText").on("click", function() {
				if ($(d1.id).css("display") === "none") {
					$(d1.id).css("display", "block"); //$().show()
				} else {
					$(d1.id).css("display", "none");
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
			var f = new Date(dtSelect.getFullYear(), dtSelect.getMonth()); //本月第一天
			f.setDate(f.getDate() - f.getDay()); //日历上显示的第一天

			var str = "";
			for (var i = 0; i < this.dateCount; i++) {
				var ymd = this.getDateString(f);
				if (f < this.earlyDate || f > this.latestDate) {
					str += "<span class='unreachable' data-ymd='" + ymd + "'>" + f.getDate() + "</span>";
				} else {
					if (f.getMonth() !== dtSelect.getMonth()) {
						str += "<span class='ccc' data-ymd='" + ymd + "'>" + f.getDate() + "</span>";
					} else {
						if (f.toDateString() === dtSelect.toDateString()) {
							str += "<span class='select' data-ymd='" + ymd + "'>" + f.getDate() + "</span>";
						} else {
							if (f.getDay() === 0 || f.getDay() === 6) {
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
			ymd = this.getDateString(dtSelect);
			document.querySelector(this.id + " p").childNodes[2].textContent = dtSelect.getFullYear() + "年" + (dtSelect.getMonth() + 1) + "月";
			this.sEle = $(this.id + " .select")[0] || $(this.id + " span[data-ymd='" + ymd + "']")[0];
		},
		getDateString: function(date) {
			return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
		}
	}
	return init;
})();

var d1 = DateTool({
	id: "#calender1",
	initDate: new Date(),
	earlyDate: new Date(2016, 4),
	latestDate: new Date(2016, 8, 15),
});
d1.selCall(function(){
	alert(this.sEle.dataset.ymd);
})