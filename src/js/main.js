const enneagram = (ctx, settings) => {
 	const radius = 130;
  const maxColor = [255, 10, 10];
  const minColor = [230,230,230];
  const lineWidth = 2;
  const lineColor = 'black';
  const pointSize = 15;
  const pointFontSize = 17;
  const fontColor = 'black';
	const center_x = 250;
	const center_y = 250;
	const angleIncr = 360 / 9;

	for (var key in settings.options) {
    if (settings.options.hasOwnProperty(key)) {
    	console.log(key + " -> " + settings.options[key]);
    }
	}

	function drawCircle(){
		ctx.lineWidth = lineWidth;
    ctx.beginPath();
    ctx.arc(center_x, center_y, radius, 0, 2 * Math.PI);
    ctx.stroke();
	}

	function drawPoint(angle,label,percentage){
    var x = center_x + radius * Math.cos(-angle*Math.PI/180);
    var y = center_y + radius * Math.sin(-angle*Math.PI/180);

    ctx.fillStyle = interpolateColor(percentage);
    ctx.beginPath();
    ctx.arc(x, y, pointSize, 0, 2 * Math.PI);
    ctx.fill();
		ctx.fillStyle = fontColor;
		ctx.font = `${pointFontSize}px Arial`;
    ctx.fillText(label,x - pointFontSize / 4,y + pointFontSize / 3);
	}

	function drawLine(angle1, angle2) {
		var x1 = center_x + radius * Math.cos(-angle1*Math.PI/180);
    var y1 = center_y + radius * Math.sin(-angle1*Math.PI/180);
    var x2 = center_x + radius * Math.cos(-angle2*Math.PI/180);
    var y2 = center_y + radius * Math.sin(-angle2*Math.PI/180);
    ctx.strokeStyle = lineColor;
		ctx.lineWidth = lineWidth;
    ctx.beginPath();
		ctx.moveTo(x1, y1);
		ctx.lineTo(x2, y2);
		ctx.stroke();
	}

	function interpolateColor (percentage){
		let rgbVals = []
		for (var i = 0; i < 3; i++) {
			var perc = percentage;
			var top = maxColor[i];
			var bottom = minColor[i];
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