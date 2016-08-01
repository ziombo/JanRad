var RenderJS = function (parameters) {
	// pixelsX - how many pixels horizontaly per "jump"
	// pixelsY - how many pixels vertically per new line
	// counterX and counterY - used to determine the next pixel set
	// delay - delay between new "jump"
	// nextLine - used to determine whether new vertical line should start
	var pixelsX = parameters && parameters.pixelsX ? parameters.pixelsX : 1,
		pixelsY = parameters && parameters.pixelsY ? parameters.pixelsY : 10,
		delay = parameters && parameters.delay ? parameters.delay : 1,
		counterX = 1,
		counterY = 1,
		nextLine = true;

	var renderId = window.setInterval(function () {
		if (counterX * pixelsX <= $(".toRender").outerWidth(true)) {
			if (nextLine) {
				$("#renderY").css("top", counterY * pixelsY);
				nextLine = !nextLine;
			}
			$("#renderX").css("left", counterX * pixelsX);
			counterX++;
		}
		else if (counterY * pixelsY <= $(".toRender").outerHeight(true)) {
			$("#renderX").css("top", counterY * pixelsY);
			counterX = 1;
			counterY++;
			nextLine = !nextLine;
		}
		else {
			$("#renderY").css("display", "none");
			$("#renderX").css("display", "none");
			clearInterval(renderId);
		}
	}, delay);
};