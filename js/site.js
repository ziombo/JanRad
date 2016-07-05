(function () {

	var pattern = Trianglify({
		height: 1200, //so that there is no need to run the function whenever the screen is resided (unless heigh>1200)
		width: 350,
		x_colors: ['#222832', '#234873', '#192939', '#262656'],
		y_colors: "match_x",
		cell_size: 34
	});
	document.getElementById("trianglify").appendChild(pattern.canvas());

	$("#areaStretch").flexible();

	var mobileViewportWidth = window.matchMedia("screen and (min-width: 1024px)");
	var mobileViewportHeight = window.matchMedia("screen and (min-height: 660px)");
	var scrollEnabled = false;

	if (!mobileViewportWidth.matches || !mobileViewportHeight.matches) {
		scrollEnabled = true;
	}

	// on screen size change check if both conditions are met
	mobileViewportWidth.addListener(function (mq) {
		if (mq.matches && window.matchMedia("screen and (min-height: 660px)").matches) {
			// width >= 1024px
			scrollEnabled = false;
		} else {
			scrollEnabled = true;
		}
	});
	mobileViewportHeight.addListener(function (mq) {
		if (mq.matches && window.matchMedia("screen and (min-width: 1024px)").matches) {
			// height >= 660
			scrollEnabled = false;
		} else {
			scrollEnabled = true;
		}
	})



	var scrollCounter = 0;
	var running = false;
	var pageLocations = ["#aboutPage", "#projectsPage", "#contactPage"];

	$('#navbar ul li a').click(function () {
		var id = $(this).attr("id");
		var inFront = $(".current");


		// check if clicked anchor is the one currently shown
		if (id.toUpperCase() !== inFront[0].id.toUpperCase()) {
			if (running == false) {
				running = true;

				$(".last-clicked").removeClass("last-clicked");
				$("#" + id).parent().addClass("last-clicked");
				// determine id of the page that will be "revealed"
				var toShowId = "";
				if (id == "aboutpage") { toShowId = "#aboutPage"; }
				else if (id == "projectspage") { toShowId = "#projectsPage"; }
				else if (id == "contactpage") { toShowId = "#contactPage"; }
				if (toShowId) { var toShow = $(toShowId); }

				// determine which page shouldnt take "action" in the animation
				var nonRelevant = $("#aboutPage"); //initialized to about because idk what kind of object this is. truth has been spoken.
				$.each(pageLocations, function (id, current) {
					if (current != toShowId && current != "#" + inFront[0].id) {
						nonRelevant = $(current);
					}
				});
				nonRelevant.css("z-index", 0);

				// manipulate css for the animation
				inFront.toggleClass("box-rotate");
				setTimeout(function () {
					toShow.css("z-index", 25);
					inFront.css("z-index", 5);
					toShow.css("z-index", 15);
					nonRelevant.css("z-index", 5);
					inFront.toggleClass("box-rotate");
					inFront.removeClass("current").addClass("behind");
					toShow.addClass("current").removeClass("behind");
					running = false;
					scrollCounter = 0;
				}, 1000);
			}
		}
	});


	//page changing with scroll
	var anchors = ["#aboutpage", "#projectspage", "#contactpage"];
	$(document).on('mousewheel', function (event) {
		if (running == false && scrollEnabled == false) {
			var pageHeight = $(".current > .page-contents").outerHeight(true) + $(".current > h1").outerHeight(true);
			//dla mniejszych ekranow, sprawdzanie czy jest na samym dole/gorze strony. na potem
			if (event.deltaY < 0 && $(".current").scrollTop() + $(".current").height() >= pageHeight) {
				//bottom of page and scrolling down
				scrollCounter--;
			}
			else if (event.deltaY > 0 && $(".current").scrollTop() == 0) {
				//top of page and scrolling up
				scrollCounter++;
			}
			if (scrollCounter == -5) {
				scrollCounter = 0;
				var inFront = document.getElementsByClassName("current")[0].className[0];
				$(anchors[inFront % 3]).click();
			}
			else if (scrollCounter == 5) {
				scrollCounter = 0;
				var inFront = document.getElementsByClassName("current")[0].className[0];
				$(anchors[(inFront + 1) % 3]).click();
			}
		}
	});

	//formspree ajax send method.
	var $contactForm = $('#contact-form');
	$contactForm.submit(function (e) {
		e.preventDefault();
		$.ajax({
			url: '//formspree.io/jasiu@360.st',
			method: 'POST',
			data: $(this).serialize(),
			dataType: 'json',
			beforeSend: function () {
				$contactForm.find("#send-outcome").text("Sending...");
			},
			success: function (data) {
				$contactForm.find("#areaStretch").val("");
				$contactForm.find("#send-outcome").text("Message sent succesfully");
			},
			error: function (err) {
				$contactForm.find("#send-outcome").text("An uknown error occured.");

			}
		});
	});

})();