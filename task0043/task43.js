var GalleryTool = (function() {
	function init(id, photos) {
		var t = new Gallery(id, photos);
		t.setUp();
	}

	function Gallery(id, photos) {
		this.photos = photos;
		this.ele = document.getElementById(id);
	}
	Gallery.prototype = {
		constructor: Gallery,
		setUp: function() {
			var b = this["size" + this.photos.length]();
			this.ele.innerHTML = this.photos.map(function(item, index) {
				var tempB = "<div class='gallery-item' style='"
				for (key in b[index]) {
					tempB += key + ":" + b[index][key] + "px;"
				}
				tempB += "'><div class='box'></div><img src='" + item + "'></div>";
				return tempB;
			}).join('');
		},
		size1: function() {
			return [{
				width: this.ele.clientWidth,
				height: this.ele.clientHeight
			}]
		},
		size2: function() {
			return [{
				width: this.ele.clientWidth * 2 / 3,
				height: this.ele.clientHeight
			}, {
				width: this.ele.clientWidth * 2 / 3,
				height: this.ele.clientHeight,
				right: 0
			}]
		},
		size3: function() {
			var s = this.ele.clientHeight / 2;
			return [{
				width: this.ele.clientWidth - s,
				height: this.ele.clientHeight
			}, {
				width: s,
				height: s,
				right: 0
			}, {
				width: s,
				height: s,
				right: 0,
				bottom: 0
			}]
		},
		size4: function() {
			var perW = this.ele.clientWidth / 2;
			var perH = this.ele.clientHeight / 2;
			return [{
				width: perW,
				height: perH
			}, {
				width: perW,
				height: perH,
				right: 0
			}, {
				width: perW,
				height: perH,
				bottom: 0
			}, {
				width: perW,
				height: perH,
				right: 0,
				bottom: 0
			}]
		},
		size5: function() {
			var perW = this.ele.clientWidth / 3;
			var perH = this.ele.clientHeight / 3;
			return [{
				width: perW*2,
				height: perH*2
			}, {
				width: perW,
				height: perW,
				right: 0
			}, {
				width: perW,
				height: perH,
				bottom: 0
			}, {
				width: perW,
				height: perH,
				left: perW,
				bottom: 0
			}, {
				width: perW,
				height: this.ele.clientHeight - perW,
				right: 0,
				bottom: 0
			}]
		},
		size6: function() {
			var perW = this.ele.clientWidth / 3;
			var perH = this.ele.clientHeight / 3;
			return [{
				width: perW*2,
				height: perH*2
			}, {
				width: perW,
				height: perH,
				right: 0
			}, {
				width: perW,
				height: perH,
				right: 0,
				top: perH
			}, {
				width: perW,
				height: perH,
				bottom: 0
			}, {
				width: perW,
				height: perH,
				left: perW,
				bottom: 0
			}, {
				width: perW,
				height: perH,
				right: 0,
				bottom: 0
			}]
		}
	}
	return init;
})();


var gOne = new GalleryTool("gallery-one", ["image/1.jpg"]);
var gTwo = new GalleryTool("gallery-two", ["image/1.jpg", "image/2.jpg"]);
var gThree = new GalleryTool("gallery-three", ["image/1.jpg", "image/2.jpg", "image/3.jpg"]);
var gFour = new GalleryTool("gallery-four", ["image/1.jpg", "image/2.jpg", "image/3.jpg", "image/4.jpg"]);
var gFive = new GalleryTool("gallery-five", ["image/1.jpg", "image/2.jpg", "image/3.jpg", "image/4.jpg", "image/5.jpg"]);
var gSix = new GalleryTool("gallery-six", ["image/1.jpg", "image/2.jpg", "image/3.jpg", "image/4.jpg", "image/5.jpg", "image/6.jpg"]);



