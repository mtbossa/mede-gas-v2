import React, { useState } from "react";
import { StyleSheet, Text, TextInput, TextInputProps } from "react-native";
import MaskInput, { MaskInputProps } from "react-native-mask-input";
import { appInputStyles } from "../AppTextInput/AppTextInput";

function AppMaskInput({ style, ...maskInputProps }: MaskInputProps) {
	const [isFocused, setIsFocused] = useState(false);
	return (
		<MaskInput
			onFocus={() => setIsFocused(true)}
			onBlur={() => setIsFocused(false)}
			style={[appInputStyles.input, isFocused && appInputStyles.focused, style]}
			keyboardType="decimal-pad"
			{...maskInputProps}
		/>
	);
}

export default AppMaskInput;
