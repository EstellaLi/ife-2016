function GalleryColumn(selector, col) {
	this.element = document.querySelector(selector);
	this.col = col || 4;
	this.itemCount = 0;
}

GalleryColumn.prototype = {
	constructor: GalleryColumn,
	init: function() {
		var str = "";
		var perWidth = this.element.clientWidth / this.col;
		for (var i = 0; i < this.col; i++) {
			str += "<div class = 'gallery-col' style='width:" + perWidth + "px;'></div>";
		}
		this.element.innerHTML = str;
 		this.colList = this.element.querySelectorAll(".gallery-col");
		for (var i = 0; i < this.col; i++) {
			this.addItem();
		}
	},
	addItem: function() {
		var image = this.getImageUrl();
		var node = document.createElement("div");
		node.className = "gallery-item";
		node.innerHTML = "<img class='gallery-item-photo' src= '" + image["src"] + "' alt='img'>" + "<div class='gallery-item-info'>Something</div>"

		//获取列高最小的gallery-col
		var min = this.colList[0].clientHeight;
		var minIndex = 0;
		for (var i = 0; i < this.colList.length; i++) {
			if (this.colList[i].clientHeight < min) {
				minIndex = i;
				min = this.colList[i].clientHeight;
			}
		}
		this.colList[minIndex].appendChild(node);
		this.itemCount++;
	},
	getImageUrl: function() {
		//随机生成颜色
		//var randomColor = ('00000' + (Math.random() * 0x1000000 << 0).toString(16)).slice(-6);
		var size = ['660x250', '300x400', '350x500', '200x320', '300x300'];
		var color = ['E97452', '4C6EB4', '449F93', 'D25064', 'E59649'];
		var i = parseInt(Math.random() * 5);
		var image = {};
		image["src"] = "http://placehold.it/" + size[i] + '/' + color[i] + '/fff';
		image["info"] = color[i];
		return image;
	}
};

