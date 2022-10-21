import React, { ReactNode, useCallback, useEffect, useState } from "react";
import {
	NativeSyntheticEvent,
	StyleProp,
	StyleSheet,
	Text,
	TextInput,
	TextInputFocusEventData,
	TextInputProps,
	TextStyle,
	View,
} from "react-native";
import { colors } from "../../../styles/colors";
import AppInputHelper from "../AppInputHelper";

interface AppTextInputProps {
	errorMessage?: string;
	render?: (
		styles: Array<StyleProp<TextStyle>>,
		onBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void,
		onFocus: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void
	) => ReactNode;
}

function AppTextInput({
	errorMessage,
	style,
	onFocus,
	onBlur,
	render,
	...props
}: TextInputProps & AppTextInputProps) {
	const [isFocused, setIsFocused] = useState(false);
	const [localErrorMessage, setLocalErrorMessage] = useState("");

	useEffect(() => {
		setLocalErrorMessage(errorMessage);
	}, [errorMessage]);

	const handleOnFocus = useCallback(
		(e: NativeSyntheticEvent<TextInputFocusEventData>) => {
			setIsFocused(true);
			setLocalErrorMessage("");
			onFocus && onFocus(e);
		},
		[]
	);

	const handleOnBlur = useCallback(
		(e: NativeSyntheticEvent<TextInputFocusEventData>) => {
			setIsFocused(false);
			onBlur && onBlur(e);
		},
		[]
	);

	return (
		<>
			<View
				style={[
					styles.inputBorderRadius,
					{ backgroundColor: colors.inputBackground },
				]}
			>
				{isFocused && !localErrorMessage && (
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
				{localErrorMessage && (
					<View
						style={[
							styles.inputBorderRadius,
							{
								width: "100%",
								height: "100%",
								position: "absolute",
								borderColor: colors.inputBorderColorError,
								borderWidth: 2,
							},
						]}
					></View>
				)}
				<View style={[styles.inputBorderRadius, styles.input]}>
					{(render &&
						render([styles.text, style], handleOnBlur, handleOnFocus)) || (
						<TextInput
							style={[styles.text, style]}
							onFocus={handleOnFocus}
							onBlur={handleOnBlur}
							{...props}
						/>
					)}
				</View>
			</View>
			{localErrorMessage && (
				<View style={{ position: "absolute", top: 48 }}>
					<Text
						style={{
							color: colors.inputBorderColorError,
							fontSize: 11,
						}}
					>
						{localErrorMessage}
					</Text>
				</View>
			)}
		</>
	);
}

const styles = StyleSheet.create({
	input: {
		padding: 10,
	},
	inputBorderRadius: {
		borderRadius: 5,
	},
	text: {
		color: colors.text,
		fontSize: 17,
		fontWeight: "bold",
	},
});

export default AppTextInput;

export { styles as appInputStyles };
