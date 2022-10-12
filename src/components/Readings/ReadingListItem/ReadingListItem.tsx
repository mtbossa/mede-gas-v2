import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Reading } from "../../../interfaces/Reading";

interface Props {
	reading: Reading;
}

function ReadingListItem({ reading }: Props) {
	return (
		<View style={styles.card}>
			<Text style={styles.title}>{reading.created_at}</Text>
			<Text style={styles.subTitle}>{reading.cubic_meters} m³</Text>
		</View>
	);
}

const styles = StyleSheet.create({
	title: {
		fontSize: 20,
		fontWeight: "bold",
	},
	subTitle: {
		fontSize: 18,
		fontWeight: "normal",
	},
	card: {
		borderRadius: 5,
		borderColor: "#111",
		borderWidth: 5,
		backgroundColor: "#FFF",
		padding: 10,
		alignItems: "center",
		justifyContent: "center",
	},
});

export default ReadingListItem;
