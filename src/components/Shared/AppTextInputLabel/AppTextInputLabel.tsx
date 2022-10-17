import React from "react";
import { Text, TextProps, View } from "react-native";
import AppText from "../AppText/AppText";

function AppTextInputLabel({
	children,
	style,
	...textProps
}: { children: React.ReactNode } & TextProps) {
	return (
		<View style={{ marginBottom: 5 }}>
			<AppText>
				<Text
					style={[{ fontSize: 17, fontWeight: "900" }, style]}
					{...textProps}
				>
					{children}
				</Text>
			</AppText>
		</View>
	);
}

export default AppTextInputLabel;
