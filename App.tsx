import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import SafeViewAndroid from "./src/styles/SafeViewAndroid";

const readings = [
	{
		id: 1,
		created_at: "2022-01-01 15:00:00",
		cubic_meters: 50,
		cubic_meter_price: 5,
		conversion_coefficient: 2.4,
	},
	{
		id: 2,
		created_at: "2022-01-01 15:00:00",
		cubic_meters: 50,
		cubic_meter_price: 5,
		conversion_coefficient: 2.4,
	},
	{
		id: 3,
		created_at: "2022-01-01 15:00:00",
		cubic_meters: 50,
		cubic_meter_price: 5,
		conversion_coefficient: 2.4,
	},
	{
		id: 4,
		created_at: "2022-01-01 15:00:00",
		cubic_meters: 50,
		cubic_meter_price: 5,
		conversion_coefficient: 2.4,
	},
];

export default function App() {
	return (
		<SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
			<ScrollView>
				<StatusBar style="auto" />
				<Text>Hi</Text>
				<Text>Hi</Text>
				<Text>Hi</Text>
				<Text>Hi</Text>
				<Text>Hi</Text>
			</ScrollView>
		</SafeAreaView>
	);
}
