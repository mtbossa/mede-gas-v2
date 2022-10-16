import React from "react";
import { StyleSheet, Text, TextProps, View } from "react-native";
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
		<View style={styles.helperTextView}>
			<AppText>
				<Text style={[styles.helperText, style]}>{text}</Text>
			</AppText>
		</View>
	);
}

const styles = StyleSheet.create({
	helperText: {
		fontSize: 12.5,
	},
	helperTextView: {
		marginLeft: 15,
		marginTop: 5,
	},
});

export default AppInputHelper;
