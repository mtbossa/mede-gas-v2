import React from "react";
import { StyleSheet, Text, TextInput, TextInputProps } from "react-native";

function AppTextInput({ style, ...inputPropsTextInputProps }: TextInputProps) {
	return (
		<TextInput style={[styles.input, style]} {...inputPropsTextInputProps} />
	);
}

const styles = StyleSheet.create({
	input: {
		borderRadius: 3,
		padding: 10,
		elevation: 2,
		backgroundColor: "#FFFFF3",
	},
});

export default AppTextInput;
