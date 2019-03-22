Module.register("qmReport", {
	// Default module config.
	defaults: {
		width: 400,
		height: 400,
		text: "Hello World!",
		slideIndex: -1,
		rotateInterval: 30 * 1000,
		animationSpeed: 3000, // fade in and out speed
		initialLoadDelay: 4250,
		retryDelay: 2500,
		updateInterval: 60 * 60 * 1000,
	},
	total_info: "Hello World!",
	getScripts: function () {
		return [
			'jsforce.js',
			'moment.js',
			"modules/qmReport/node_modules/chart.js/dist/Chart.bundle.min.js"
		]
	},

	getStyles: function () {
		return [
			'qmReportStyles.css'
		]
	},

	getRandomColor: function () {
		var letters = '0123456789ABCDEF';
		var color = '#';
		for (var i = 0; i < 6; i++) {
			color += letters[Math.floor(Math.random() * 16)];
		}
		return color;
	},

	getDom: function () {
		console.log('get dom');
		var wrapperEl = document.createElement("div");
		var container = document.createElement("div");
		container.className = "slideshow-container";
		container.id = "slideshow-container";
		wrapperEl.appendChild(container);

		var div1 = document.createElement("div");
		div1.className = "mySlides fade";

		var img1 = document.createElement("img");
		img1.src = "https://www.w3schools.com/howto/img_nature_wide.jpg";
		div1.appendChild(img1);
		container.appendChild(div1);


		var div2 = document.createElement("div");
		div2.className = "mySlides fade";
		var img2 = document.createElement("img");
		img2.src = "https://www.w3schools.com/howto/img_mountains_wide.jpg";
		div2.appendChild(img2);
		container.appendChild(div2);


		var div3 = document.createElement("div");
		div3.className = "mySlides fade";

		var img3 = document.createElement("img");
		img3.src = "https://www.w3schools.com/howto/img_snow_wide.jpg";
		div3.appendChild(img3);
		container.appendChild(div3);
		Log.log("slide payload >> ");
		return wrapperEl;
	},


	showSlides: function () {
		if (!this.slideIndex) {
			this.slideIndex = 0;
		}
		var i;
		var slides = document.getElementsByClassName("mySlides");
		for (i = 0; i < slides.length; i++) {
			console.log(slides[i]);
			slides[i].style.display = "none";
		}
		console.log("slideIndex " + this.slideIndex + "\t sise is " + (slides.length - 1));
		console.log(slides[0]);
		this.slideIndex++;

		slides[this.slideIndex - 1].style.display = "block";
		if (this.slideIndex > (slides.length - 1)) { this.slideIndex = 0 }

		setInterval(this.showSlides, 2000);
	},

	start: function () {
		this.slideIndex = -1;
		this.showSlides;
		this.sendSocketNotification('qmReport_initConnection');
	},






	socketNotificationReceived: function (notification, payload) {
		if (notification === "qmReport_updateNumbers") {
			Log.log("payload >> " + payload);
			setInterval(this.showSlides, 2000);
		}
	}
});