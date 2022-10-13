import React, { useState } from "react";
import { TextInput, StyleSheet } from "react-native";
import numeral from "numeral";
import {
	addCommaIfNeeded,
	removeNonNumericAndNonCommaFromString,
	validReadingInput,
} from "../../../services/ReadingInputValidator";

function ReadingInput() {
	const [reading, setReading] = useState("");

	return (
		<TextInput
			keyboardType="number-pad"
			style={styles.input}
			value={reading}
			maxLength={10}
			placeholder="00000,000"
			onChangeText={inputText => {
				if (!validReadingInput(inputText)) return;
				setReading(
					addCommaIfNeeded(removeNonNumericAndNonCommaFromString(inputText))
				);
			}}
		/>
	);
}

const styles = StyleSheet.create({
	input: {
		height: 40,
		margin: 12,
		borderWidth: 1,
		padding: 10,
	},
});

export default ReadingInput;
