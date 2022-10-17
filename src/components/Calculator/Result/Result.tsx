import React from "react";
import { Text, View } from "react-native";
import AppText from "../../Shared/AppText";
import { Result as CalculationResult } from "../AppCalculator/AppCalculator";
import { FontAwesome5 } from "@expo/vector-icons";

function Result({ result }: { result: CalculationResult }) {
	return (
		<View>
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
					flexDirection: "row",
					marginTop: 15,
					backgroundColor: "#06317a",
					borderRadius: 10,
					padding: 20,
					elevation: 10,
				}}
			>
				<View style={{ marginRight: 10 }}>
					<View style={{ marginBottom: 55 }}>
						<AppText>
							<Text style={{ fontSize: 20 }}>Diferença:</Text>
						</AppText>
					</View>
					<AppText>
						<Text style={{ fontSize: 20 }}>Total gasto: </Text>
					</AppText>
				</View>
				<View>
					<View style={{ marginBottom: 16 }}>
						<AppText>
							<Text style={{ fontSize: 20, fontWeight: "bold" }}>
								{result?.diffInCubicMeter ?? 0} m³
							</Text>
						</AppText>
						<View
							style={{
								alignSelf: "center",
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
			</View>
		</View>
	);
}

export default Result;
