import React, { useState } from "react";
import {
	StyleSheet,
	Text,
	TextInput,
	TextInputProps,
	View,
} from "react-native";
import MaskInput, { MaskInputProps } from "react-native-mask-input";
import { colors } from "../../../styles/colors";
import AppTextInput, { appInputStyles } from "../AppTextInput/AppTextInput";

function AppMaskInput({ style, ...maskInputProps }: MaskInputProps) {
	return (
		<AppTextInput
			render={(styles, onBlur, onFocus) => {
				return (
					<MaskInput
						style={styles}
						keyboardType="decimal-pad"
						onBlur={onBlur}
						onFocus={onFocus}
						{...maskInputProps}
					/>
				);
			}}
		/>
	);
}

export default AppMaskInput;
