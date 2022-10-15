import React from "react";
import { Text } from "react-native";

function AppText({ children }: { children: React.ReactNode }) {
	return (
		<Text style={{ fontFamily: "Lato-Regular", color: "#FFF" }}>
			{children}
		</Text>
	);
}

export default AppText;
