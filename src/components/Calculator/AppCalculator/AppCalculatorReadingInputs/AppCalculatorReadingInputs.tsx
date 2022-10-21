import React from "react";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import { colors } from "../../../../styles/colors";
import AppHelperIconButton from "../../../Shared/AppHelperIconButton";
import AppText from "../../../Shared/AppText";
import AppTextInputLabel from "../../../Shared/AppTextInputLabel";
import ReadingInput from "../../ReadingInput";
import AppBottomSheetHelper from "../../../Shared/AppBottomSheetHelper";
import MeterValuesHelper from "../../TextHelpers/MeterValuesHelper";
import { FormField } from "../../../../hooks/Calculator/useCalculatorForm";

interface AppCalculatorReadingInputsProps {
	style?: StyleProp<ViewStyle>;
	biggerReading: FormField;
	lowerReading: FormField;
	onChangeValue: (field: "biggerReading" | "lowerReading", value: string) => void;
}

function AppCalculatorReadingInputs({
	style,
	biggerReading,
	lowerReading,
	onChangeValue,
}: AppCalculatorReadingInputsProps) {
	return (
		<View
			style={[
				{
					backgroundColor: colors.primary,
					borderRadius: 10,
					elevation: 10,
					alignItems: "center",
					justifyContent: "center",
					padding: 20,
				},
				style,
			]}
		>
			<View style={{ flexDirection: "row", alignItems: "center" }}>
				<AppText>
					<Text
						style={{
							fontFamily: "Heebo",
							fontSize: 25,
							fontWeight: "bold",
						}}
					>
						Valores do medidor
					</Text>
				</AppText>
				<AppHelperIconButton
					iconSize={20}
					helperComponent={
						<AppBottomSheetHelper title="Onde encontrar?">
							<MeterValuesHelper />
						</AppBottomSheetHelper>
					}
				/>
			</View>

			<View
				style={[
					{
						flexDirection: "column",
						width: "100%",
						alignItems: "center",
						justifyContent: "space-between",
						marginTop: 15,
					},
				]}
			>
				<View
					style={{
						width: "100%",
						flexDirection: "row",
						justifyContent: "space-evenly",
					}}
				>
					<View style={{ flex: 2, alignItems: "center" }}>
						<AppTextInputLabel style={{ color: "#FFF" }} uom="(m³)">
							Valor atual
						</AppTextInputLabel>
					</View>
					<View style={{ flex: 1 }}></View>
					<View style={{ flex: 2, alignItems: "center" }}>
						<AppTextInputLabel style={{ color: "#FFF" }} uom="(m³)">
							Valor anterior
						</AppTextInputLabel>
					</View>
				</View>

				<View
					style={{
						flexDirection: "row",
						justifyContent: "center",
						alignItems: "center",
					}}
				>
					<View style={{ flex: 2 }}>
						<ReadingInput
							errorMessage={biggerReading.errors[0]}
							style={[styles.input]}
							value={biggerReading.value}
							onChangeText={value => onChangeValue("biggerReading", value)}
						/>
					</View>

					<View style={{ marginHorizontal: 13 }}>
						<AppText>
							<Text style={{ fontSize: 40, fontWeight: "bold", color: "#FFF" }}>-</Text>
						</AppText>
					</View>

					<View style={{ flex: 2 }}>
						<ReadingInput
							errorMessage={lowerReading.errors[0]}
							style={[styles.input]}
							value={lowerReading.value}
							onChangeText={value => onChangeValue("lowerReading", value)}
						/>
					</View>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	input: {
		width: "100%",
	},
});

export default AppCalculatorReadingInputs;
