import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AppText from "../../../Shared/AppText";
import AppTextInputLabel from "../../../Shared/AppTextInputLabel";
import ReadingInput from "../../ReadingInput";

interface AppCalculatorReadingInputsProps {
	biggerReading: string;
	lowerReading: string;
	onChangeValue: (
		field: "biggerReading" | "lowerReading",
		value: string
	) => void;
}

function AppCalculatorReadingInputs({
	biggerReading,
	lowerReading,
	onChangeValue,
}: AppCalculatorReadingInputsProps) {
	return (
		<View
			style={{
				flexDirection: "column",
				width: "100%",
				alignItems: "center",
				justifyContent: "space-between",
			}}
		>
			<View
				style={{
					width: "100%",
					flexDirection: "row",
					justifyContent: "space-evenly",
				}}
			>
				<View style={{ flex: 2, alignItems: "center" }}>
					<AppTextInputLabel>Valor atual</AppTextInputLabel>
				</View>
				<View style={{ flex: 1 }}></View>
				<View style={{ flex: 2, alignItems: "center" }}>
					<AppText>
						<AppTextInputLabel>Valor anterior</AppTextInputLabel>
					</AppText>
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
						style={[styles.input, , { marginTop: 7 }]}
						value={biggerReading}
						onChangeText={value => onChangeValue("biggerReading", value)}
					/>
				</View>

				<View style={{ marginHorizontal: 20 }}>
					<AppText>
						<Text style={{ fontSize: 40, fontWeight: "bold" }}>-</Text>
					</AppText>
				</View>

				<View style={{ flex: 2 }}>
					<ReadingInput
						style={[styles.input, { marginTop: 7 }]}
						value={lowerReading}
						onChangeText={value => onChangeValue("lowerReading", value)}
					/>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	input: {
		width: "100%",
		fontSize: 20,
	},
});

export default AppCalculatorReadingInputs;
