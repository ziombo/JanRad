(function () {

	$("#areaStretch").flexible();

	$("#navbar a").click(function () {
		
		var target = $(this.hash);
		target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
		var distance = $(target).offset().top;
		$('html, body').animate({
			scrollTop: distance
		}, distance / 2);
		return false;
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