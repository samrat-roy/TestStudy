function parseNumbers(text) {
	if (!isNaN(text)) {
		if (text % 1 == 0) {
			let number = parseInt(text, 10);
			text = Number.isSafeInteger(number) ? number : text;
		}
		else
			text = parseFloat(text);
	}
	return text;
}

exports.parseNumbers = parseNumbers;