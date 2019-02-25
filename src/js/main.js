const enneagram = (settings) => {
	console.log(settings.targetId)
	const canvas = document.getElementById(settings.targetId);
	var ctx = canvas.getContext('2d');

	canvas.style.width='100%';
  canvas.width  = canvas.offsetWidth;
  console.log(canvas.width)
  canvas.style.height= `${canvas.width}px`;
  canvas.height = canvas.offsetHeight;

  let opt = {
  	radius: canvas.width / 3,
	  maxColor: [255, 10, 10],
	  minColor: [230,230,230],
	  lineWidth: 2,
	  lineColor: 'black',
	  pointSize: 15,
	  pointFontSize: 17,
	  fontColor: 'black'
  }
	const center_x = canvas.width / 2;
	const center_y = canvas.height / 2;
	const angleIncr = 360 / 9;

	// override if options are set
	for (var key in settings.options) {
    if (settings.options.hasOwnProperty(key)) {
    	opt[key] = settings.options[key]
    }
	}

	// draw
	function drawCircle(){
		ctx.lineWidth = opt.lineWidth;
    ctx.beginPath();
    ctx.arc(center_x, center_y, opt.radius, 0, 2 * Math.PI);
    ctx.stroke();
	}

	function drawPoint(angle,label,percentage){
    var x = center_x + opt.radius * Math.cos(-angle*Math.PI/180);
    var y = center_y + opt.radius * Math.sin(-angle*Math.PI/180);

    ctx.fillStyle = interpolateColor(percentage);
    ctx.beginPath();
    ctx.arc(x, y, opt.pointSize, 0, 2 * Math.PI);
    ctx.fill();
		ctx.fillStyle = opt.fontColor;
		ctx.font = `${opt.pointFontSize}px Arial`;
    ctx.fillText(label,x - opt.pointFontSize / 4,y + opt.pointFontSize / 3);
	}

	function drawLine(angle1, angle2) {
		var x1 = center_x + opt.radius * Math.cos(-angle1*Math.PI/180);
    var y1 = center_y + opt.radius * Math.sin(-angle1*Math.PI/180);
    var x2 = center_x + opt.radius * Math.cos(-angle2*Math.PI/180);
    var y2 = center_y + opt.radius * Math.sin(-angle2*Math.PI/180);
    ctx.strokeStyle = opt.lineColor;
		ctx.lineWidth = opt.lineWidth;
    ctx.beginPath();
		ctx.moveTo(x1, y1);
		ctx.lineTo(x2, y2);
		ctx.stroke();
	}

	function interpolateColor (percentage){
		let rgbVals = []
		for (var i = 0; i < 3; i++) {
			var perc = percentage;
			var top = opt.maxColor[i];
			var bottom = opt.minColor[i];
			var distance = top - bottom;
			var position = bottom + ((perc / 100) * distance);
			rgbVals.push(position)
		}
		let result = `rgb(${rgbVals[0]},${rgbVals[1]},${rgbVals[2]})`;
		return result
	}

	//Execution
	drawCircle();
	drawLine(90 - angleIncr * 1, 90 - angleIncr * 4)
	drawLine(90 - angleIncr * 1, 90 - angleIncr * 7)
	drawLine(90 - angleIncr * 2, 90 - angleIncr * 4)
	drawLine(90 - angleIncr * 2, 90 - angleIncr * 8)
	drawLine(90 - angleIncr * 3, 90 - angleIncr * 6)
	drawLine(90 - angleIncr * 3, 90 - angleIncr * 9)
	drawLine(90 - angleIncr * 5, 90 - angleIncr * 7)
	drawLine(90 - angleIncr * 5, 90 - angleIncr * 8)
	drawLine(90 - angleIncr * 6, 90 - angleIncr * 9)
	for (var i = 0; i < 9; i++) {
		drawPoint(0 - (i * (angleIncr)) + 50, i + 1, settings.data[i]);
	}
}