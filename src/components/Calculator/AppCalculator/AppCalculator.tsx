import { Picker } from "@react-native-picker/picker";
import numeral from "numeral";
import React, { useState, useCallback, useEffect } from "react";
import { Button, Keyboard, StyleSheet, Text, View } from "react-native";
import MaskInput, { Masks } from "react-native-mask-input";
import { calculateGasSpentValues } from "../../../services/GasCalculator";
import { removeNonNumericAndNonCommaFromString } from "../../../services/ReadingInputValidator";
import AppMaskInput from "../../Shared/AppMaskInput";
import AppSelect from "../../Shared/AppSelect";
import AppSelectItem from "../../Shared/AppSelect/AppSelectItems";
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

const COEFFICIENT_VALUES = [
	"2,2",
	"2,3",
	"2,4",
	"2,5",
	"2,6",
	"2,7",
	"2,8",
	"2,9",
];

function AppCalculator() {
	const [calculatorFormValues, setCalculatorFormValues] =
		useState<CalculatorForm>({
			lowerReading: "",
			biggerReading: "",
			gasPriceByKg: "",
			conversionCoefficient: "2,5",
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
		Keyboard.dismiss();
	}
	return (
		<View style={styles.mainContainer}>
			<View style={{ marginVertical: 10 }}>
				<AppText>
					<Text
						style={{
							fontFamily: "Heebo",
							fontSize: 30,
							fontWeight: "bold",
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
				<AppTextInputLabel>Preço (kg/gás)</AppTextInputLabel>
				<AppMaskInput
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
			</View>

			<View style={{ width: "100%", marginTop: 5 }}>
				<AppTextInputLabel>Coeficiente m³ / kg</AppTextInputLabel>
				<AppSelect
					selectedValue={calculatorFormValues.conversionCoefficient}
					onValueChange={(itemValue, itemIndex) =>
						setCalculatorFormValues(oldValues => ({
							...oldValues,
							conversionCoefficient:
								removeNonNumericAndNonCommaFromString(itemValue),
						}))
					}
					helperText="Utilizado na conversão m³ para kg (Recomendado: 2,5)"
				>
					{COEFFICIENT_VALUES.map((value, index) => (
						<AppSelectItem label={value} value={value} key={index} />
					))}
				</AppSelect>
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
				<View style={{ flex: 1, height: 1, backgroundColor: "#06317a" }} />
				<View style={{ marginHorizontal: 12 }}>
					<AppText>
						<Text
							style={{
								fontFamily: "Heebo",
								fontSize: 30,
								fontWeight: "bold",
							}}
						>
							Resultado
						</Text>
					</AppText>
				</View>
				<View style={{ flex: 1, height: 1, backgroundColor: "#06317a" }} />
			</View>

			<View style={{ flexDirection: "row", marginTop: 15 }}>
				<View style={{ marginRight: 10 }}>
					<View style={{ marginBottom: 7 }}>
						<AppText>
							<Text style={{ fontSize: 20 }}>Diferença:</Text>
						</AppText>
					</View>
					<AppText>
						<Text style={{ fontSize: 20 }}>Total gasto: </Text>
					</AppText>
				</View>
				<View>
					<View style={{ marginBottom: 7 }}>
						<AppText>
							<Text style={{ fontSize: 20, fontWeight: "bold" }}>
								{result?.diffInCubicMeter ?? 0} m3 | {result?.diffInKg ?? 0}{" "}
								kg/gás
							</Text>
						</AppText>
					</View>
					<AppText>
						<Text style={{ fontSize: 20, fontWeight: "bold" }}>
							{result?.moneySpent}
						</Text>
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
