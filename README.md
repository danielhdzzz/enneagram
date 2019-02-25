# enneagram

Library to generate a responsive [Enneagram of Personality](https://en.wikipedia.org/wiki/Enneagram_of_Personality).
Work in progress. Each of the 9 points, is asigned a value in order to display different configurations of personality.

![alt text](https://github.com/danielhdzzz/enneagram/images/preview.png "preview")

### Usage:

1. Include script.
2. Add canvas:

```html
<canvas id="myEnneagram"></canvas>
```

3. Initiate:

```html
<script type="text/javascript">
	enneagram({
		targetId: 'myEnneagram',
		data: [0,14,24,12,50,80,89,29,100],
		options: {
			//options go here
		}
	});
</script>
```

### Options:

```javascript
maxColor: [255, 10, 10], // Array (rgb values)
minColor: [230,230,230], // Array (rgb values)
lineWidth: 2, // Int
lineColor: 'black', // String
pointSize: 15, // Int
pointFontSize: 17, // Int
fontColor: 'black' // String
```