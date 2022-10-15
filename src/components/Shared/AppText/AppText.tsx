import React from "react";
import { Text } from "react-native";

function AppText({ children }: { children: React.ReactNode }) {
	return <Text style={{ fontFamily: "Lato-Regular" }}>{children}</Text>;
}

export default AppText;
