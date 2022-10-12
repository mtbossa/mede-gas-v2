import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, ScrollView, StyleSheet, Text, View } from "react-native";
import ReadingList from "./src/components/Readings/ReadingList";
import SafeViewAndroid from "./src/styles/SafeViewAndroid";

export default function App() {
	return (
		<SafeAreaView style={SafeViewAndroid.AndroidSafeArea}>
			<StatusBar />
			<ReadingList />
		</SafeAreaView>
	);
}
