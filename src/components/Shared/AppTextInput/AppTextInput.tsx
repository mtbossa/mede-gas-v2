import React from "react";
import { StyleSheet, Text, TextInput, TextInputProps } from "react-native";

function AppTextInput({ ...inputPropsTextInputProps }: TextInputProps) {
	return <TextInput style={styles.input} {...inputPropsTextInputProps} />;
}

const styles = StyleSheet.create({
	input: {
		height: 40,
		margin: 12,
		padding: 10,
		borderRadius: 3,
		elevation: 5,
		backgroundColor: "#FFFFF3",
	},
});

export default AppTextInput;