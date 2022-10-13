import { StatusBar } from 'expo-status-bar';
import { useState } from "react";
import {
	Button,
	SafeAreaView,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";
import ReadingInput from "./src/components/Calculator/ReadingInput";
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
				<ReadingInput />
				<Text>2.</Text>
				<ReadingInput />
				<Text>Preço do gás (kg/gás)</Text>
				<TextInput style={styles.input} />
				<Text>Coeficiente de conversão</Text>
				<TextInput style={styles.input} />
				<Button title="Calcular" />
				<Text>Resultado</Text>
				<View>
					<Text>Diferença (m3): 50 m3 | 5 kg/gás</Text>
					<Text>Gasto (R$): R$ 50,00</Text>
				</View>
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
