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
import { appInputStyles } from "../AppTextInput/AppTextInput";

function AppMaskInput({ style, ...maskInputProps }: MaskInputProps) {
	const [isFocused, setIsFocused] = useState(false);
	return (
		<View>
			<View style={[appInputStyles.inputBorderRadius, appInputStyles.input]}>
				<MaskInput
					onFocus={() => setIsFocused(true)}
					onBlur={() => setIsFocused(false)}
					style={[appInputStyles.text, style]}
					keyboardType="decimal-pad"
					{...maskInputProps}
				/>
			</View>
			{isFocused && (
				<View
					style={[
						appInputStyles.inputBorderRadius,
						{
							width: "100%",
							height: "100%",
							position: "absolute",
							borderColor: colors.inputBorderColor,
							borderWidth: 2,
						},
					]}
				></View>
			)}
		</View>
	);
}

export default AppMaskInput;
