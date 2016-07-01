(function(){
	var pattern = Trianglify({
		height: 1200, //so that there is no need to run the function whenever the screen is resided (unless heigh>1200)
		width: 350,
		x_colors: ['#222222', '#234873', '#191919', '#262656'],
		y_colors: "match_x",
		cell_size: 34
	});
	document.getElementById("trianglify").appendChild(pattern.canvas());
})();
