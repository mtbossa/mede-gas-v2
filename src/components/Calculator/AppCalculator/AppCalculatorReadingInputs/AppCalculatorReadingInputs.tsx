import React from "react";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import { colors } from "../../../../styles/colors";
import AppHelperIconButton from "../../../Shared/AppHelperIconButton";
import AppText from "../../../Shared/AppText";
import AppTextInputLabel from "../../../Shared/AppTextInputLabel";
import ReadingInput from "../../ReadingInput";
import AppBottomSheetHelper from "../../../Shared/AppBottomSheetHelper";
import MeterValuesHelper from "../../TextHelpers/MeterValuesHelper";

interface AppCalculatorReadingInputsProps {
	style?: StyleProp<ViewStyle>;
	biggerReading: string;
	lowerReading: string;
	onChangeValue: (
		field: "biggerReading" | "lowerReading",
		value: string
	) => void;
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
							errorMessage="oi"
							style={[styles.input]}
							value={biggerReading}
							onChangeText={value => onChangeValue("biggerReading", value)}
						/>
					</View>

					<View style={{ marginHorizontal: 13 }}>
						<AppText>
							<Text style={{ fontSize: 40, fontWeight: "bold", color: "#FFF" }}>
								-
							</Text>
						</AppText>
					</View>

					<View style={{ flex: 2 }}>
						<ReadingInput
							style={[styles.input]}
							value={lowerReading}
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
