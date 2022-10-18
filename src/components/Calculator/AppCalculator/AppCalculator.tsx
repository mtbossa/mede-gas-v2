import numeral from "numeral";
import React, {
	useState,
	useEffect,
	useRef,
	useMemo,
	useCallback,
} from "react";
import { Button, Keyboard, StyleSheet, Text, View } from "react-native";
import { Masks } from "react-native-mask-input";

import { calculateGasSpentValues } from "../../../services/GasCalculator";
import AppMaskInput from "../../Shared/AppMaskInput";
import AppText from "../../Shared/AppText";
import AppTextInputLabel from "../../Shared/AppTextInputLabel";
import Slider from "@react-native-community/slider";
import AppCalculatorReadingInputs from "./AppCalculatorReadingInputs/AppCalculatorReadingInputs";
import Result from "../Result";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

export interface Result {
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

function AppCalculator({ sheetRef }: { sheetRef: any }) {
	const [calculatorFormValues, setCalculatorFormValues] =
		useState<CalculatorForm>({
			lowerReading: "",
			biggerReading: "",
			gasPriceByKg: "",
			conversionCoefficient: "2,5",
		});
	const [coefficientValue, setCoefficientValue] = useState("2,5");
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
			<AppCalculatorReadingInputs
				style={{ marginBottom: 10 }}
				biggerReading={calculatorFormValues.biggerReading}
				lowerReading={calculatorFormValues.lowerReading}
				onChangeValue={(field, value) =>
					setCalculatorFormValues(oldValues => ({
						...oldValues,
						[field]: value,
					}))
				}
			/>

			<View style={{ width: "100%", marginVertical: 10 }}>
				<AppTextInputLabel>Preço (kg/gás)</AppTextInputLabel>
				<AppMaskInput
					style={styles.input}
					keyboardType="decimal-pad"
					mask={Masks.BRL_CURRENCY}
					placeholder={"R$ 0,00"}
					maxLength={11}
					value={calculatorFormValues.gasPriceByKg}
					onChangeText={value =>
						setCalculatorFormValues(oldValues => ({
							...oldValues,
							gasPriceByKg: value,
						}))
					}
				/>
			</View>

			<View style={{ width: "100%", marginTop: 10 }}>
				<AppTextInputLabel
					helperButton={true}
					onHelperButtonPress={() => sheetRef.current?.snapToIndex(0)}
				>
					Coeficiente m³ / kg
				</AppTextInputLabel>
				<View style={{ justifyContent: "center", alignItems: "center" }}>
					<AppText>
						<Text style={{ fontSize: 20, fontWeight: "bold" }}>
							{coefficientValue}
						</Text>
					</AppText>
					<Slider
						style={{ width: "100%", marginTop: 6 }}
						minimumValue={2.0}
						maximumValue={3.0}
						step={0.1}
						value={2.5}
						onValueChange={e => {
							setCoefficientValue(String(e).replace(".", ","));
							setCalculatorFormValues(oldValues => ({
								...oldValues,
								conversionCoefficient: String(e).replace(".", ","),
							}));
						}}
						minimumTrackTintColor="#06317a"
						maximumTrackTintColor="#FFFFFF"
					/>
				</View>
				<View
					style={{
						flexDirection: "row",
						justifyContent: "space-between",
						paddingHorizontal: 15,
						marginTop: 10,
					}}
				>
					<AppText>
						<Text style={{ color: "#969696" }}>2,0</Text>
					</AppText>
					<AppText>
						<Text style={{ color: "#969696" }}>3,0</Text>
					</AppText>
				</View>
			</View>

			<View style={{ width: "50%", marginVertical: 20 }}>
				<Button
					title="Calcular"
					color={"#125ee0"}
					onPress={calculate}
					disabled={calculateButtonDisabled}
				/>
			</View>

			<Result result={result} />
		</View>
	);
}

const styles = StyleSheet.create({
	mainContainer: {
		justifyContent: "center",
		alignItems: "center",
		width: "100%",
		paddingHorizontal: 20,
		paddingVertical: 10,
	},
	input: {
		width: "100%",
	},
});

export default AppCalculator;
