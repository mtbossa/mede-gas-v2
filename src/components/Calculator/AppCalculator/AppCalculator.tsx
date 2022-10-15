import numeral from "numeral";
import React, { useState, useCallback, useEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import MaskInput, { Masks } from "react-native-mask-input";
import { calculateGasSpentValues } from "../../../services/GasCalculator";
import { removeNonNumericAndNonCommaFromString } from "../../../services/ReadingInputValidator";
import AppText from "../../Shared/AppText";
import AppTextInput from "../../Shared/AppTextInput";
import ReadingInput from "../ReadingInput";

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

function AppCalculator() {
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
	return (
		<View style={styles.mainContainer}>
			<AppText>
				<Text style={{ fontWeight: "bold", fontSize: 26 }}>Leituras</Text>
			</AppText>

			<View
				style={{
					flexDirection: "row",
					width: "100%",
					alignContent: "center",
					alignItems: "center",
					backgroundColor: "red",
				}}
			>
				<View>
					<AppText>
						<Text style={{ fontSize: 15 }}>Última leitura</Text>
					</AppText>
					<ReadingInput
						style={[styles.input, { marginTop: 7 }]}
						value={calculatorFormValues.lowerReading}
						onChangeText={value =>
							setCalculatorFormValues(oldValues => ({
								...oldValues,
								lowerReading: value,
							}))
						}
					/>
				</View>
				<AppText>
					<Text
						style={{ fontSize: 40, fontWeight: "bold", marginHorizontal: 20 }}
					>
						-
					</Text>
				</AppText>
				<View>
					<AppText>
						<Text style={{ fontSize: 15 }}>Leitura anterior</Text>
					</AppText>
					<ReadingInput
						style={[styles.input, , { marginTop: 7 }]}
						value={calculatorFormValues.biggerReading}
						onChangeText={value =>
							setCalculatorFormValues(oldValues => ({
								...oldValues,
								biggerReading: value,
							}))
						}
					/>
				</View>
			</View>

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
						conversionCoefficient: removeNonNumericAndNonCommaFromString(value),
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
	);
}

const styles = StyleSheet.create({
	mainContainer: {
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		paddingVertical: 10,
		paddingHorizontal: 20,
	},
	input: {
		width: "100%",
		fontSize: 20,
	},
});

export default AppCalculator;
