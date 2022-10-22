import React from "react";
import { Text } from "react-native";

export default function MeterValuesHelper() {
	return (
		<Text>
			Esses valores serão encontrados no medidor de gás que você possuem.
			Normalmente ele se encontra no corredor do prédio, dentro de um "armário".{" "}
			{"\n"}
			{"\n"}O campo "Valor atual" sempre deve ser maior que o "Valor anterior",
			pois o cálculo feito realiza a subtração do "Valor atual" pelo "Valor
			anterior".
		</Text>
	);
}
