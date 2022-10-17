import React from "react";
import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import AppText from "../../../Shared/AppText";
import AppTextInputLabel from "../../../Shared/AppTextInputLabel";
import ReadingInput from "../../ReadingInput";

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
					flexDirection: "column",
					width: "100%",
					alignItems: "center",
					justifyContent: "space-between",
					backgroundColor: "#e8e8e8",
					borderRadius: 10,
					padding: 20,
					elevation: 10,
				},
				style,
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
					<AppTextInputLabel style={{ color: "#222" }}>
						Valor atual
					</AppTextInputLabel>
				</View>
				<View style={{ flex: 1 }}></View>
				<View style={{ flex: 2, alignItems: "center" }}>
					<AppTextInputLabel style={{ color: "#222" }}>
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
						style={[styles.input]}
						value={biggerReading}
						onChangeText={value => onChangeValue("biggerReading", value)}
					/>
				</View>

				<View style={{ marginHorizontal: 20 }}>
					<AppText>
						<Text style={{ fontSize: 40, fontWeight: "bold", color: "#222" }}>
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
	);
}

const styles = StyleSheet.create({
	input: {
		width: "100%",
		fontSize: 20,
	},
});

export default AppCalculatorReadingInputs;
