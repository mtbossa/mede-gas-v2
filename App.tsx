import { StatusBar } from 'expo-status-bar';
import {
	SafeAreaView,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";
import ReadingList from "./src/components/Readings/ReadingList";
import SafeViewAndroid from "./src/styles/SafeViewAndroid";

export default function App() {
	return (
		<SafeAreaView
			style={[SafeViewAndroid.AndroidSafeArea, styles.defaultBackgroundColor]}
		>
			<StatusBar />
			<View>
				<Text>Digite ou selecione leituras</Text>
				<Text>1.</Text>
				<TextInput style={styles.input} />
				<Text>2.</Text>
				<TextInput style={styles.input} />
				<Text>Resultado</Text>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	defaultBackgroundColor: {
		backgroundColor: "#aaa",
	},
	input: {
		height: 40,
		margin: 12,
		borderWidth: 1,
		padding: 10,
	},
});
