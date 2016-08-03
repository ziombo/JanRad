(function(){
	$(document).ready(function () {
		if ($(document).scrollTop() >= $("#header").outerHeight(true) - navbarHeight) {
			$("#navbar").addClass("shown");
		};
		RenderJS({ pixelsX: 4, pixelsY: 18 });
		showBtns(1, 4);
	});

	var navbarHeight = 60;
	$(window).scroll(function () {
		if ($(document).scrollTop() >= $("#header").outerHeight(true) - navbarHeight) {
			$("#navbar").addClass("shown");
		} else {
			$("#navbar").removeClass("shown");
		}
		if ($(document).scrollTop() >= $("#header").outerHeight(true) + $("#about-me").outerHeight(true) + $("#projects").outerHeight(true) - navbarHeight) {
			$("#navbar").removeClass("reversed-nav");
		}
		else if ($(document).scrollTop() >= $("#header").outerHeight(true) + $("#about-me").outerHeight(true) - navbarHeight) {
			$("#navbar").addClass("reversed-nav")
		} else if ($(document).scrollTop() > $("#header").outerHeight(true)) {
			$("#navbar").removeClass("reversed-nav");
		}
	});

	$(function () {
		$('a[href*="#"]:not([href="#"])').click(function () {
			if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
				var target = $(this.hash);
				target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
				if (target.length) {
					$('html, body').animate({
						scrollTop: target.offset().top
					}, 1000);
					return false;
				}
			}
		});
	});

	function showBtns(counter, btnsNumber) {
		if (counter < btnsNumber + 1) {
			var child = "(" + counter + ")";
			$("#section-btns li:nth-child" + child + " a").addClass("show-btn");
			setTimeout(function () {
				showBtns(++counter, btnsNumber);
			}, 400);
		}
	};

	var myData = {
		"Name": "Jan Radłowski",
		"Skills": {
			"Languages": ["Polish - native", "English - advanced", "French - basic"],
			"Computer Languages": ["C#", "JavaScript", "SQL", "HTML", "CSS"],
			"Frameworks": [".NET", "ASP.NET", "Entity Framework", "SignalR", "jQuery", "AngularJS"],
			"Databases": ["MSQL", "SQLite"],
			"Version Control": ["Git"]
		},
		"Hobbies": ["Military related books", "Football", "Chess"],
		"Education": {
			"School": "Rzeszow University of Technology",
			"Course of Study": "Aeronautics and Space Technology (2013-2014)"
		}
	};
	var myDataString = JSON.stringify(myData, null, 6);
	$("#description-json").html(myDataString);
})();
