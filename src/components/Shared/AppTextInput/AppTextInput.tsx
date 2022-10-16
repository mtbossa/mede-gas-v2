import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TextInputProps } from "react-native";

function AppTextInput({ style, ...inputPropsTextInputProps }: TextInputProps) {
	const [isFocused, setIsFocused] = useState(false);
	return (
		<TextInput
			onFocus={() => setIsFocused(true)}
			onBlur={() => setIsFocused(false)}
			style={[styles.input, isFocused && styles.focused, style]}
			{...inputPropsTextInputProps}
		/>
	);
}

const styles = StyleSheet.create({
	focused: {
		borderColor: "#125ee0",
		borderWidth: 2,
		outlineStyle: "solid",
		outlineWidth: 4,
	},
	input: {
		borderRadius: 3,
		padding: 10,
		elevation: 2,
		backgroundColor: "#FFFFF3",
	},
});

export default AppTextInput;

export { styles as appInputStyles };
