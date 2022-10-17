import React, { useState } from "react";
import {
	StyleSheet,
	Text,
	TextInput,
	TextInputProps,
	View,
} from "react-native";
import AppInputHelper from "../AppInputHelper";

function AppTextInput({
	style,
	onFocus,
	onBlur,
	...inputPropsTextInputProps
}: TextInputProps) {
	const [isFocused, setIsFocused] = useState(false);
	return (
		<View>
			<TextInput
				onFocus={e => {
					setIsFocused(true);
					onFocus(e);
				}}
				onBlur={e => {
					setIsFocused(false);
					onBlur(e);
				}}
				style={[styles.input, isFocused && styles.focused, style]}
				{...inputPropsTextInputProps}
			/>
		</View>
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
		padding: 12,
		elevation: 2,
		backgroundColor: "#FFFFF3",
	},
});

export default AppTextInput;

export { styles as appInputStyles };
