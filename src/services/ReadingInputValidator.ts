export function removeNonNumericAndNonCommaFromString(text: string) {
	return text.replace(/[^0-9,]/g, "");
}

export function validReadingInput(text: string) {
	if ((text.match(new RegExp(",", "g")) || []).length > 1) return false;
	if (text.length > 9) return false;
	if (text.includes(",")) {
		const [_, decimals] = text.split(",");
		if (decimals.length > 3) return false;
	}

	return true;
}

export function addCommaIfNeeded(text: string) {
	if (text.length > 5 && !text.includes(",")) {
		return text.slice(0, 5) + "," + text.slice(5);
	}

	return text;
}
