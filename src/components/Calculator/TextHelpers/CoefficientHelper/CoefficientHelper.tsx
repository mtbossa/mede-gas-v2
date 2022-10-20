import React from "react";
import { Text } from "react-native";
import { colors } from "../../../../styles/colors";

export default function CoefficientHelper() {
	return (
		<Text>
			Utilizado para realizar a conversão da unidade de medida m³ (metros
			cúbicos) para kg (kilo) de gás.{"\n"}
			{"\n"}
			<Text style={{ fontSize: 14, color: colors.subText }}>
				Exemplo: 1,000 m³ x 2,5 (coeficiente) = 2,500 kg / gás
			</Text>
			{"\n"}
			{"\n"}Solicite ao seu provedor de gás qual é o valor que você deve
			utilizar. (Recomendado: 2,5)
		</Text>
	);
}
