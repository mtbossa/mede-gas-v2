import React, { useState } from "react";
import { TextInput, StyleSheet, TextInputProps } from "react-native";
import numeral from "numeral";
import {
	addCommaIfNeeded,
	removeNonNumericAndNonCommaFromString,
	validReadingInput,
} from "../../../services/ReadingInputValidator";

// interface ReadingInputProps {
// 	setValue: (value: string) => void;
// 	value: string;
// }

type ReadingInputProps = {} & TextInputProps;

function ReadingInput({
	onChangeText,
	...inputPropsTextInputProps
}: ReadingInputProps) {
	return (
		<TextInput
			keyboardType="number-pad"
			style={styles.input}
			maxLength={10}
			placeholder="00000,000"
			onChangeText={inputText => {
				if (!validReadingInput(inputText)) return;
				onChangeText(
					addCommaIfNeeded(removeNonNumericAndNonCommaFromString(inputText))
				);
			}}
			{...inputPropsTextInputProps}
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
