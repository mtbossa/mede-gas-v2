import numeral from "numeral";
import React, { useState, useCallback, useEffect } from "react";
import { Button, StyleSheet, Text, View } from "react-native";
import MaskInput, { Masks } from "react-native-mask-input";
import { calculateGasSpentValues } from "../../../services/GasCalculator";
import { removeNonNumericAndNonCommaFromString } from "../../../services/ReadingInputValidator";
import AppText from "../../Shared/AppText";
import AppTextInput from "../../Shared/AppTextInput";
import { appInputStyles } from "../../Shared/AppTextInput/AppTextInput";
import AppTextInputLabel from "../../Shared/AppTextInputLabel";
import ReadingInput from "../ReadingInput";
import AppCalculatorReadingInputs from "./AppCalculatorReadingInputs/AppCalculatorReadingInputs";

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
	}
	return (
		<View style={styles.mainContainer}>
			<View style={{ marginVertical: 10 }}>
				<AppText>
					<Text
						style={{
							fontFamily: "RussoOne-Regular",
							fontSize: 30,
						}}
					>
						Calcular Gastos
					</Text>
				</AppText>
			</View>

			<AppCalculatorReadingInputs
				style={{ marginBottom: 5 }}
				biggerReading={calculatorFormValues.biggerReading}
				lowerReading={calculatorFormValues.lowerReading}
				onChangeValue={(field, value) =>
					setCalculatorFormValues(oldValues => ({
						...oldValues,
						[field]: value,
					}))
				}
			/>

			<View style={{ width: "100%", marginVertical: 5 }}>
				<AppTextInputLabel>Preço do gás (kg/gás)</AppTextInputLabel>
				<MaskInput
					style={[styles.input, appInputStyles.input]}
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
			</View>

			<View style={{ width: "100%", marginTop: 5 }}>
				<AppTextInputLabel>Coeficiente de conversão</AppTextInputLabel>
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
			</View>

			<View style={{ width: "50%", marginVertical: 20 }}>
				<Button
					title="Calcular"
					color={"#125ee0"}
					onPress={calculate}
					disabled={calculateButtonDisabled}
				/>
			</View>

			<View style={{ flexDirection: "row", alignItems: "center" }}>
				<View style={{ flex: 1, height: 1, backgroundColor: "#454441" }} />
				<View style={{ marginHorizontal: 12 }}>
					<AppText>
						<Text
							style={{
								fontFamily: "RussoOne-Regular",
								fontSize: 30,
							}}
						>
							Resultado
						</Text>
					</AppText>
				</View>
				<View style={{ flex: 1, height: 1, backgroundColor: "#454441" }} />
			</View>

			<View style={{ flexDirection: "row", marginTop: 15 }}>
				<View style={{ marginRight: 10 }}>
					<AppText>
						<Text style={{ fontSize: 20 }}>Diferença:</Text>
					</AppText>
					<AppText>
						<Text style={{ fontSize: 20 }}>Total gasto: </Text>
					</AppText>
				</View>
				<View>
					<AppText>
						<Text style={{ fontSize: 20 }}>
							{result?.diffInCubicMeter ?? 0} m3 | {result?.diffInKg ?? 0}{" "}
							kg/gás
						</Text>
					</AppText>
					<AppText>
						<Text style={{ fontSize: 20 }}>{result?.moneySpent}</Text>
					</AppText>
				</View>
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
