# enneagram

Library to easily generate a responsive [Enneagram of Personality](https://en.wikipedia.org/wiki/Enneagram_of_Personality).
Work in progress.

### Usage:

Include script and initiate:

```html
<script type="text/javascript">
	enneagram({
		targetId: 'myEnneagram',
		data: [0,14,24,12,50,80,89,29,100],
		options: {
		}
	});
</script>
```

### Options:

```javascript
let opt = {
	maxColor: [255, 10, 10], // Array (rgb values)
	minColor: [230,230,230], // Array (rgb values)
	lineWidth: 2, // Int
	lineColor: 'black', // String
	pointSize: 15, // Int
	pointFontSize: 17, // Int
	fontColor: 'black' // String
}
```