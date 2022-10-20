import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AppText from "../../Shared/AppText";
import { Result as CalculationResult } from "../AppCalculator/AppCalculator";
import { FontAwesome5 } from "@expo/vector-icons";

function Result({ result }: { result: CalculationResult }) {
	return (
		<View
			style={{
				justifyContent: "center",
				alignItems: "center",
				height: "100%",
			}}
		>
			<AppText>
				<Text
					style={{
						fontFamily: "Heebo",
						fontSize: 14,
						// letterSpacing: 1.1,
						textTransform: "uppercase",
					}}
				>
					Resultado
				</Text>
			</AppText>

			<View
				style={{
					marginTop: 17,
					flexDirection: "row",
					justifyContent: "center",
					alignItems: "center",
					marginBottom: 10,
				}}
			>
				<AppText>
					<Text style={styles.resultText}>
						{result?.diffInCubicMeter ?? 0} m³
					</Text>
				</AppText>
				<View
					style={{
						marginHorizontal: 10,
					}}
				>
					<FontAwesome5 name="equals" size={16} color="white" />
				</View>

				<AppText>
					<Text style={styles.resultText}>{result?.diffInKg ?? 0} kg/gás</Text>
				</AppText>
			</View>
					
			<AppText>
				<Text style={styles.resultText}>{result?.moneySpent}</Text>
			</AppText>
		</View>
	);
}

const styles = StyleSheet.create({
	resultText: {
		fontSize: 26,
		fontWeight: "bold",
	},
});

export default Result;
