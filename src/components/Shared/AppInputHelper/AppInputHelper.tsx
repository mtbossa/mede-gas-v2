import React from "react";
import { StyleSheet, Text, TextProps } from "react-native";
import AppText from "../AppText";

interface AppInputHelper {
	text: string;
}

function AppInputHelper({
	text,
	style,
	...textProps
}: TextProps & AppInputHelper) {
	return (
		<AppText>
			<Text style={[styles.helperText, style]}>{text}</Text>
		</AppText>
	);
}

const styles = StyleSheet.create({
	helperText: {
		fontSize: 12.5,
	},
});

export default AppInputHelper;
