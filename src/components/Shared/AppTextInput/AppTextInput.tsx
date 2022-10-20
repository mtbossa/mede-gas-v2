import React, { useState } from "react";
import {
	StyleSheet,
	Text,
	TextInput,
	TextInputProps,
	View,
} from "react-native";
import { colors } from "../../../styles/colors";
import AppInputHelper from "../AppInputHelper";

function AppTextInput({ style, onFocus, onBlur, ...props }: TextInputProps) {
	const [isFocused, setIsFocused] = useState(false);
	return (
		<View>
			<View style={[styles.inputBorderRadius, styles.input, style]}>
				<TextInput
					style={{ color: colors.text, fontSize: 17, fontWeight: "bold" }}
					onFocus={e => {
						setIsFocused(true);
						onFocus && onFocus(e);
					}}
					onBlur={e => {
						setIsFocused(false);
						onBlur && onBlur(e);
					}}
					{...props}
				/>
			</View>
			{isFocused && (
				<View
					style={[
						styles.inputBorderRadius,
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

const styles = StyleSheet.create({
	input: {
		padding: 10,
		backgroundColor: colors.inputBackground,
	},
	inputBorderRadius: {
		borderRadius: 5,
	},
});

export default AppTextInput;

export { styles as appInputStyles };
