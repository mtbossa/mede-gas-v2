import React, { useState } from "react";
import { TextInputProps } from "react-native";
import numeral from "numeral";
import {
	addCommaIfNeeded,
	removeNonNumericAndNonCommaFromString,
	validReadingInput,
} from "../../../services/ReadingInputValidator";
import TextInput from "../../Shared/TextInput";

type ReadingInputProps = {} & TextInputProps;

function ReadingInput({
	value,
	onChangeText,
	...inputPropsTextInputProps
}: ReadingInputProps) {
	return (
		<TextInput
			keyboardType="number-pad"
			placeholder="00000,000"
			maxLength={10}
			value={value}
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

export default ReadingInput;
