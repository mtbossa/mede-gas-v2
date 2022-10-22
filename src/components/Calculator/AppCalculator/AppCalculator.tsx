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
import useForm from "../../../hooks/Form/useForm";
import { BannerAd, TestIds, BannerAdSize } from "react-native-google-mobile-ads";

function AppCalculator() {
	const calculatorHook = useCalculatorForm();
	const { updateFieldValue } = useForm();

	return (
		<View style={{ height: "100%", width: "100%" }}>
			<View style={styles.calculator}>
				<AppCalculatorReadingInputs
					style={{ marginBottom: 10 }}
					biggerReading={calculatorHook.calculatorFormValues.biggerReading}
					lowerReading={calculatorHook.calculatorFormValues.lowerReading}
					onChangeValue={(field, value) =>
						calculatorHook.setCalculatorFormValues(oldValues => {
							return updateFieldValue(field, value, oldValues);
						})
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
						keyboardType="decimal-pad"
						mask={Masks.BRL_CURRENCY}
						placeholder={"R$ 0,00"}
						maxLength={11}
						value={calculatorHook.calculatorFormValues.gasPriceByKg.value}
						onChangeText={value => {
							const newValue = numeral(value).value() ? value : "";
							calculatorHook.setCalculatorFormValues(oldValues => {
								return updateFieldValue("gasPriceByKg", newValue, oldValues);
							});
						}}
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
								{calculatorHook.calculatorFormValues.conversionCoefficient.value}
							</Text>
						</AppText>
						<Slider
							style={{ width: "100%", marginTop: 6 }}
							minimumValue={2.0}
							maximumValue={3.0}
							step={0.1}
							value={calculatorHook.coefficientValue}
							onValueChange={e => {
								calculatorHook.setCalculatorFormValues(oldValues => {
									const updatedForm = { ...oldValues };
									updatedForm.conversionCoefficient.value = String(e).replace(".", ",");
									updatedForm.conversionCoefficient.errors = [];
									return updateFieldValue(
										"conversionCoefficient",
										String(e).replace(".", ","),
										oldValues
									);
								});
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
						onPress={() => calculatorHook.calculate(calculatorHook.calculatorFormValues)}
						disabled={calculatorHook.calculateButtonDisabled}
					/>
				</View>
			</View>

			<View style={{ flex: 1 }}>
				<Result result={calculatorHook.result} />
			</View>
			<View
				style={{ position: "absolute", bottom: 0, alignItems: "center", justifyContent: "center" }}
			>
				<BannerAd unitId={TestIds.BANNER} size={BannerAdSize.FULL_BANNER} />
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
