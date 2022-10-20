import React from "react";
import { StyleSheet, Text, View } from "react-native";
import AppText from "../../Shared/AppText";
import { Result as CalculationResult } from "../AppCalculator/AppCalculator";
import { FontAwesome5 } from "@expo/vector-icons";
import { colors } from "../../../styles/colors";

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
						{result?.diffInCubicMeter ?? 0}{" "}
						<Text style={styles.uomText}>m³</Text>
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
					<Text style={styles.resultText}>
						{result?.diffInKg ?? 0} <Text style={styles.uomText}>kg/gás</Text>
					</Text>
				</AppText>
			</View>

			<AppText>
				<Text style={styles.resultText}>
					<Text style={styles.uomText}>R$</Text> {result?.moneySpent}
				</Text>
			</AppText>
		</View>
	);
}

const styles = StyleSheet.create({
	resultText: {
		fontSize: 24,
		fontWeight: "bold",
	},
	uomText: { color: colors.subText, fontFamily: "Heebo", fontSize: 16 },
});

export default Result;
