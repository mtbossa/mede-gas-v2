import numeral from "numeral";
import React, { useState, useEffect } from "react";
import { Button, Keyboard, StyleSheet, Text, View } from "react-native";
import { Masks } from "react-native-mask-input";

import { calculateGasSpentValues } from "../../../services/GasCalculator";
import AppMaskInput from "../../Shared/AppMaskInput";
import AppText from "../../Shared/AppText";
import AppTextInputLabel from "../../Shared/AppTextInputLabel";
import Slider from "@react-native-community/slider";
import AppCalculatorReadingInputs from "./AppCalculatorReadingInputs/AppCalculatorReadingInputs";
import Result from "../Result";
import { colors } from "../../../styles/colors";
import AppBottomSheetHelper from "../../Shared/AppBottomSheetHelper/AppBottomSheetHelper";
import { CoefficientHelper, PriceHelper } from "../TextHelpers";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useCalculatorForm from "../../../hooks/Calculator/useCalculatorForm";

function AppCalculator() {
	const {
		calculatorFormValues,
		coefficientValue,
		calculateButtonDisabled,
		result,
		setCalculatorFormValues,
		setCoefficientValue,
		calculate,
	} = useCalculatorForm();

	return (
		<View style={{ height: "100%", width: "100%" }}>
			<View style={styles.calculator}>
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
					<AppTextInputLabel
						uom="(kg/gás)"
						helperButton={true}
						helperComponent={
							<AppBottomSheetHelper title="Como encontrar?">
								<PriceHelper />
							</AppBottomSheetHelper>
						}
					>
						Preço
					</AppTextInputLabel>
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
						helperComponent={
							<AppBottomSheetHelper title="Para que serve?">
								<CoefficientHelper />
							</AppBottomSheetHelper>
						}
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
							marginTop: 5,
						}}
					>
						<AppText>
							<Text style={{ color: colors.subText }}>2,0</Text>
						</AppText>
						<AppText>
							<Text style={{ color: colors.subText }}>3,0</Text>
						</AppText>
					</View>
				</View>
				<View style={{ width: "50%", marginVertical: 20 }}>
					<Button
						title="Calcular"
						color={"#125ee0"}
						onPress={() => calculate(calculatorFormValues)}
						disabled={calculateButtonDisabled}
					/>
				</View>
			</View>

			<View style={{ flex: 1 }}>
				<Result result={result} />
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	calculator: {
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderBottomEndRadius: 15,
		borderBottomStartRadius: 15,
		elevation: 5,
		backgroundColor: colors.defaultBackground,
		flex: 2,
	},
	input: {
		width: "100%",
	},
});

export default AppCalculator;
