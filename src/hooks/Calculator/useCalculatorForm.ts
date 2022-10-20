import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LocalStorageKeys } from "../../components/utils/enums/LocalStorageKeys";
import numeral from "numeral";
import { calculateGasSpentValues } from "../../services/GasCalculator";
import { Keyboard } from "react-native";

interface CalculatorForm {
	lowerReading: string;
	biggerReading: string;
	gasPriceByKg: string;
	conversionCoefficient: string;
}
export interface Result {
	diffInKg: string;
	diffInCubicMeter: string;
	moneySpent: string;
}
const INITIAL_FORM_STATE = {
	lowerReading: "",
	biggerReading: "",
	gasPriceByKg: "",
	conversionCoefficient: "2,5",
};

export default function useCalculatorForm() {
	const [coefficientValue, setCoefficientValue] = useState("2,5");
	const [result, setResult] = useState<Result>({
		diffInKg: "0",
		diffInCubicMeter: "0",
		moneySpent: "0,00",
	});
	const [calculateButtonDisabled, setCalculateButtonDisabled] = useState(true);
	const [calculatorFormValues, setCalculatorFormValues] =
		useState<CalculatorForm>(INITIAL_FORM_STATE);

	useEffect(() => {
		(async () => {
			try {
				const jsonValue = await AsyncStorage.getItem(
					LocalStorageKeys.CalculatorFormValues
				);
				if (jsonValue) {
					const form = JSON.parse(jsonValue);
					setCalculatorFormValues(form);
					calculate(form);
				}
			} catch (e) {}
		})();
	}, []);

	useEffect(() => {
		const allNecessaryValuesAreNotNull = Object.values(
			calculatorFormValues
		).every(value => !!value);

		allNecessaryValuesAreNotNull
			? setCalculateButtonDisabled(false)
			: setCalculateButtonDisabled(true);
	}, [calculatorFormValues]);

	function calculate(formValues: CalculatorForm) {
		let valuesAsNumbers = Object.fromEntries(
			Object.entries(formValues).map(([k, v]) => [k, numeral(v).value()])
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
			moneySpent: numeral(calcResults.moneySpent).format("0,0.00"),
		};

		setResult(formattedResults);
		Keyboard.dismiss();

		(async () => {
			try {
				const jsonValue = JSON.stringify(formValues);
				await AsyncStorage.setItem(
					LocalStorageKeys.CalculatorFormValues,
					jsonValue
				);
			} catch (e) {}
		})();
	}

	return {
		calculate,
		coefficientValue,
		setCoefficientValue,
		result,
		setResult,
		calculateButtonDisabled,
		setCalculateButtonDisabled,
		calculatorFormValues,
		setCalculatorFormValues,
	};
}