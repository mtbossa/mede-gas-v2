import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Reading } from "../../../interfaces/Reading";

interface Props {
	reading: Reading;
}

function ReadingListItem({ reading }: Props) {
	return (
		<View style={styles.card}>
			<View>
				<Text style={styles.baseText}>
					<Text>
						<Text style={styles.title}>Data da leitura:</Text>{" "}
						{reading.created_at}
						{"\n"}
					</Text>
					<Text>
						<Text style={styles.title}>Valor da leitura:</Text>{" "}
						{reading.cubic_meters} m³{"\n"}
					</Text>
					<Text>
						<Text style={styles.title}>Preço (m³):</Text> R${" "}
						{reading.cubic_meter_price} / m³{"\n"}
					</Text>
					<Text>
						<Text style={styles.title}>Coeficiente de conversão:</Text>{" "}
						{reading.conversion_coefficient}
					</Text>
				</Text>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	baseText: {
		fontSize: 20,
		flexDirection: "row",
	},
	title: {
		fontWeight: "bold",
	},
	card: {
		borderRadius: 5,
		backgroundColor: "#FFF",
		padding: 10,
	},
});

export default ReadingListItem;
