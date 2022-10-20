import React from "react";
import { Text } from "react-native";
import { colors } from "../../../../styles/colors";

export default function PriceHelper() {
	return (
		<Text>
			Esse é o valor que você paga por{" "}
			<Text style={{ color: colors.subText }}>1 kg (quilo)</Text> de gás
			utilizado. Para obter esse valor, encontre em contato com seu provedor de
			gás.
		</Text>
	);
}
