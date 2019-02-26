const enneagram = (settings) => {
    const canvas = document.getElementById(settings.targetId);
    const ctx = canvas.getContext('2d');
    let canvasW = getCanvasW()
    let opt = {
        radius: canvas.width / 3,
        maxColor: [255, 10, 10],
        minColor: [230, 230, 230],
        lineWidth: 2,
        lineColor: 'black',
        pointSize: 15,
        pointFontSize: 17,
        fontColor: 'black'
    }
    let center_x = canvas.width / 2;
    let center_y = canvas.height / 2;
    const angleIncr = 360 / 9;

    // override if options are set
    for (let key in settings.options) {
        if (settings.options.hasOwnProperty(key)) {
            opt[key] = settings.options[key]
        }
    }

    function getCanvasW() {
        canvas.style.width = '100%';
        canvas.width = canvas.offsetWidth;
        canvas.style.height = `${canvas.width}px`;
        canvas.height = canvas.offsetHeight;
        return canvas.width
    }

    const resize = () => {
        canvasW = getCanvasW();
        opt.radius = canvasW / 3;
        center_x = canvasW / 2;
        center_y = canvasW / 2;
    }

    // draw
    const draw = () => {
        const drawCircle = () => {
            ctx.lineWidth = opt.lineWidth;
            ctx.beginPath();
            ctx.arc(center_x, center_y, opt.radius, 0, 2 * Math.PI);
            ctx.stroke();
        }

        const drawPoint = (angle, label, percentage) => {
            const x = center_x + opt.radius * Math.cos(-angle * Math.PI / 180);
            const y = center_y + opt.radius * Math.sin(-angle * Math.PI / 180);

            ctx.fillStyle = interpolateColor(percentage);
            ctx.beginPath();
            ctx.arc(x, y, opt.pointSize, 0, 2 * Math.PI);
            ctx.fill();
            ctx.fillStyle = opt.fontColor;
            ctx.font = `${opt.pointFontSize}px Arial`;
            ctx.fillText(label, x - opt.pointFontSize / 4, y + opt.pointFontSize / 3);
        }

        const drawLine = (angle1, angle2) => {
            const x1 = center_x + opt.radius * Math.cos(-angle1 * Math.PI / 180);
            const y1 = center_y + opt.radius * Math.sin(-angle1 * Math.PI / 180);
            const x2 = center_x + opt.radius * Math.cos(-angle2 * Math.PI / 180);
            const y2 = center_y + opt.radius * Math.sin(-angle2 * Math.PI / 180);
            ctx.strokeStyle = opt.lineColor;
            ctx.lineWidth = opt.lineWidth;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
        }

        const interpolateColor = (percentage) => {
            let rgbVals = []
            for (let i = 0; i < 3; i++) {
                const perc = percentage;
                const top = opt.maxColor[i];
                const bottom = opt.minColor[i];
                const distance = top - bottom;
                const position = bottom + ((perc / 100) * distance);
                rgbVals.push(position)
            }
            const result = `rgb(${rgbVals[0]},${rgbVals[1]},${rgbVals[2]})`;
            return result
        }

        const pairs = [
            [1, 4],
            [1, 7],
            [2, 4],
            [2, 8],
            [3, 6],
            [3, 9],
            [5, 7],
            [5, 8],
            [6, 9]
        ]

        //Execution
        drawCircle();

        pairs.forEach(pair => {
            drawLine(90 - angleIncr * pair[0], 90 - angleIncr * pair[1])
        });

        for (let i = 0; i < 9; i++) {
            drawPoint(0 - (i * (angleIncr)) + 50, i + 1, settings.data[i]);
        }
    }

    window.onresize = (event) => {
        resize();
        draw();
    };
    draw();
}