import React from "react";
import { Text, TextProps } from "react-native";
import AppText from "../AppText/AppText";

function AppTextInputLabel({
	children,
	style,
	...textProps
}: { children: React.ReactNode } & TextProps) {
	return (
		<AppText>
			<Text style={[{ fontSize: 20 }, style]} {...textProps}>
				{children}
			</Text>
		</AppText>
	);
}

export default AppTextInputLabel;
