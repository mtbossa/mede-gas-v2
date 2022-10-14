import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from "react";
import {
	Button,
	GestureResponderEvent,
	SafeAreaView,
	StyleSheet,
	Text,
	TextInput,
	View,
} from "react-native";
import MaskInput, { Masks } from "react-native-mask-input";

import ReadingInput from "./src/components/Calculator/ReadingInput";
import SafeViewAndroid from "./src/styles/SafeViewAndroid";

import "./src/numeral";
import { calculateGasSpentValues } from "./src/services/GasCalculator";
import numeral from "numeral";
import { removeNonNumericAndNonCommaFromString } from "./src/services/ReadingInputValidator";

export default function App() {
	const [lowerReading, setLowerReading] = useState("");
	const [biggerReading, setBiggerReading] = useState("");
	const [gasPriceByKg, setGasPriceByKg] = useState("");
	const [conversionCoefficient, setConversionCoefficient] = useState("");
	const [calculateButtonDisabled, setCalculateButtonDisabled] = useState(true);

	useEffect(() => {
		const allNecessaryValuesAreNotNull =
			lowerReading && biggerReading && gasPriceByKg && conversionCoefficient;

		allNecessaryValuesAreNotNull
			? setCalculateButtonDisabled(false)
			: setCalculateButtonDisabled(true);
	}, [lowerReading, biggerReading, gasPriceByKg, conversionCoefficient]);

	function calculate() {
		let valuesAsNumbers = Object.fromEntries(
			Object.entries({
				biggerReading,
				lowerReading,
				conversionCoefficient,
				gasPriceByKg,
			}).map(([k, v]) => [k, numeral(v).value()])
		);

		const { diffInCubicMeter, diffInKg, moneySpent } = calculateGasSpentValues({
			lastReadingCubicMeter: valuesAsNumbers.biggerReading,
			firstReadingCubicMeter: valuesAsNumbers.lowerReading,
			conversionCoefficient: valuesAsNumbers.conversionCoefficient,
			gasPriceByKg: valuesAsNumbers.gasPriceByKg,
		});
	}

	return (
		<SafeAreaView
			style={[SafeViewAndroid.AndroidSafeArea, styles.defaultBackgroundColor]}
		>
			<StatusBar />
			<View>
				<Text>Digite ou selecione leituras</Text>
				<Text>1.</Text>
				<ReadingInput value={lowerReading} onChangeText={setLowerReading} />
				<Text>2.</Text>
				<ReadingInput value={biggerReading} onChangeText={setBiggerReading} />
				<Text>Preço do gás (kg/gás)</Text>
				<MaskInput
					keyboardType="decimal-pad"
					style={styles.input}
					mask={Masks.BRL_CURRENCY}
					value={gasPriceByKg}
					onChangeText={setGasPriceByKg}
				/>
				<Text>Coeficiente de conversão</Text>
				<TextInput
					keyboardType="decimal-pad"
					style={styles.input}
					value={conversionCoefficient}
					onChangeText={text =>
						setConversionCoefficient(
							removeNonNumericAndNonCommaFromString(text)
						)
					}
				/>
				<Button
					title="Calcular"
					onPress={calculate}
					disabled={calculateButtonDisabled}
				/>
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
