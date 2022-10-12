import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";

import { readings } from "../../../../fakeData";
import ReadingListItem from "../ReadingListItem";

function ReadingList() {
	return (
		<ScrollView style={styles.scrollView}>
			{readings.map((reading, index) => (
				<View key={reading.id + index} style={styles.listItem}>
					<ReadingListItem reading={reading} />
				</View>
			))}
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	scrollView: {
		padding: 10,
	},
	listItem: {
		paddingBottom: 20,
	},
});

export default ReadingList;
