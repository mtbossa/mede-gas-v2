import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { readings } from "../../../../fakeData";
import ReadingListItem from "../ReadingListItem";

function ReadingList() {
	return (
		<ScrollView style={styles.mainContainer}>
			<Text style={styles.baseText}>
				<View>
					{readings.map((reading, index) => (
						<ReadingListItem key={reading.id + index} reading={reading} />
					))}
				</View>
			</Text>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	mainContainer: {
		flex: 1,
		backgroundColor: "#fff",
		width: 400,
	},
	baseText: {
		fontSize: 5,
	},
	titleText: {
		fontSize: 20,
		fontWeight: "bold",
	},
	subText: {
		fontWeight: "normal",
	},
});

export default ReadingList;
