import React from "react";
import { Text, View } from "react-native";
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
						fontSize: 30,
						fontWeight: "bold",
					}}
				>
					Resultado
				</Text>
			</AppText>

			<View
				style={{
					marginTop: 15,
					flexDirection: "row",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<AppText>
					<Text style={{ fontSize: 20, fontWeight: "bold" }}>
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
					<Text style={{ fontSize: 20, fontWeight: "bold" }}>
						{result?.diffInKg ?? 0} kg/gás
					</Text>
				</AppText>
			</View>

			<AppText>
				<Text style={{ fontSize: 20, fontWeight: "bold" }}>
					{result?.moneySpent}
				</Text>
			</AppText>
		</View>
	);
}

export default Result;
