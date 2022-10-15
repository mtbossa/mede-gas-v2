import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState } from "react";
import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";
import MaskInput, { Masks } from "react-native-mask-input";

import ReadingInput from "./src/components/Calculator/ReadingInput";
import SafeViewAndroid from "./src/styles/SafeViewAndroid";

import "./src/numeral";
import { calculateGasSpentValues } from "./src/services/GasCalculator";
import numeral from "numeral";
import { removeNonNumericAndNonCommaFromString } from "./src/services/ReadingInputValidator";
import AppTextInput from "./src/components/Shared/AppTextInput";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import AppText from "./src/components/Shared/AppText";

interface Result {
	diffInKg: string;
	diffInCubicMeter: string;
	moneySpent: string;
}

interface CalculatorForm {
	lowerReading: string;
	biggerReading: string;
	gasPriceByKg: string;
	conversionCoefficient: string;
}

let customFonts = {
	"Lato-Regular": require("./assets/fonts/Lato-Regular.ttf"),
};

SplashScreen.preventAutoHideAsync();

export default function App() {
	const [fontsLoaded] = Font.useFonts(customFonts);

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded) {
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);

	const [calculatorFormValues, setCalculatorFormValues] =
		useState<CalculatorForm>({
			lowerReading: "",
			biggerReading: "",
			gasPriceByKg: "",
			conversionCoefficient: "",
		});
	const [calculateButtonDisabled, setCalculateButtonDisabled] = useState(true);
	const [result, setResult] = useState<Result>({
		diffInKg: "0",
		diffInCubicMeter: "0",
		moneySpent: "R$ 0,00",
	});

	useEffect(() => {
		const allNecessaryValuesAreNotNull = Object.values(
			calculatorFormValues
		).every(value => !!value);

		allNecessaryValuesAreNotNull
			? setCalculateButtonDisabled(false)
			: setCalculateButtonDisabled(true);
	}, [calculatorFormValues]);

	function calculate() {
		let valuesAsNumbers = Object.fromEntries(
			Object.entries(calculatorFormValues).map(([k, v]) => [
				k,
				numeral(v).value(),
			])
		);

		const calcResults = calculateGasSpentValues({
			lastReadingCubicMeter: valuesAsNumbers.biggerReading,
			firstReadingCubicMeter: valuesAsNumbers.lowerReading,
			conversionCoefficient: valuesAsNumbers.conversionCoefficient,
			gasPriceByKg: valuesAsNumbers.gasPriceByKg,
		});

		const formattedResults = {
			diffInCubicMeter: numeral(calcResults.diffInCubicMeter).format("0,0.000"),
			diffInKg: numeral(calcResults.diffInKg).format("0,0.000"),
			moneySpent: numeral(calcResults.moneySpent).format("$ 0,0.00"),
		};

		setResult(formattedResults);
		setCalculateButtonDisabled(true);
	}

	if (!fontsLoaded) {
		return null;
	}

	return (
		<SafeAreaView
			onLayout={onLayoutRootView}
			style={[SafeViewAndroid.AndroidSafeArea, styles.defaultBackgroundColor]}
		>
			<StatusBar />
			<View style={styles.mainContainer}>
				<AppText>
					<Text style={{ fontWeight: "bold", fontSize: 23, color: "#FFF" }}>
						Leituras
					</Text>
				</AppText>
				<Text>1.</Text>
				<ReadingInput
					style={styles.input}
					value={calculatorFormValues.lowerReading}
					onChangeText={value =>
						setCalculatorFormValues(oldValues => ({
							...oldValues,
							lowerReading: value,
						}))
					}
				/>
				<Text>2.</Text>
				<ReadingInput
					style={styles.input}
					value={calculatorFormValues.biggerReading}
					onChangeText={value =>
						setCalculatorFormValues(oldValues => ({
							...oldValues,
							biggerReading: value,
						}))
					}
				/>
				<Text>Preço do gás (kg/gás)</Text>
				<MaskInput
					style={styles.input}
					keyboardType="decimal-pad"
					mask={Masks.BRL_CURRENCY}
					value={calculatorFormValues.gasPriceByKg}
					onChangeText={value =>
						setCalculatorFormValues(oldValues => ({
							...oldValues,
							gasPriceByKg: value,
						}))
					}
				/>
				<Text>Coeficiente de conversão</Text>
				<AppTextInput
					style={styles.input}
					keyboardType="decimal-pad"
					value={calculatorFormValues.conversionCoefficient}
					onChangeText={value =>
						setCalculatorFormValues(oldValues => ({
							...oldValues,
							conversionCoefficient:
								removeNonNumericAndNonCommaFromString(value),
						}))
					}
				/>
				<Button
					title="Calcular"
					onPress={calculate}
					disabled={calculateButtonDisabled}
				/>
				<Text>Resultado</Text>
				<View>
					<Text>
						Diferença: {result?.diffInCubicMeter ?? 0} m3 |{" "}
						{result?.diffInKg ?? 0} kg/gás
					</Text>
					<Text>Gasto: {result?.moneySpent}</Text>
				</View>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	defaultBackgroundColor: {
		backgroundColor: "#191819",
	},
	mainContainer: {
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		paddingVertical: 10,
		paddingHorizontal: 20,
	},
	input: {
		width: "100%",
	},
});
