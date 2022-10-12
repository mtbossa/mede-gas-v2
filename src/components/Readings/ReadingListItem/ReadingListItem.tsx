import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Reading } from "../../../interfaces/Reading";

interface Props {
	reading: Reading;
}

function ReadingListItem({ reading }: Props) {
	return (
		<View >
			<Text style={styles.titleText}>{reading.id}</Text>
			<Text style={styles.subText}>{reading.conversion_coefficient}</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	titleText: {
		fontSize: 20,
		fontWeight: "bold",
	},
	subText: {
		fontWeight: "normal",
	},
});

export default ReadingListItem;
