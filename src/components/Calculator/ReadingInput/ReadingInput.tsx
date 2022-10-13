import React, { useState } from "react";
import { TextInput, StyleSheet } from "react-native";
import numeral from "numeral";

function ReadingInput() {
	const [reading, setReading] = useState("");

	return (
		<TextInput
			keyboardType="number-pad"
			style={styles.input}
			value={reading}
			maxLength={10}
			onChangeText={inputText => {
				inputText = inputText.replace(/[^0-9,]/g, "");
				if ((inputText.match(new RegExp(",", "g")) || []).length > 1) return;
				if (inputText.length > 9) return;
				if (inputText.length > 5 && !inputText.includes(",")) {
					inputText = inputText.slice(0, 5) + "," + inputText.slice(5);
				}
				if (inputText.includes(",")) {
					console.log("here"); //logs 4

					const [int, decimals] = inputText.split(",");
					if (decimals.length > 3) {
						return;
					}
				}
				setReading(inputText);
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
