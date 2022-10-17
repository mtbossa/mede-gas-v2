import React from "react";
import {
	GestureResponderEvent,
	Text,
	TextProps,
	TouchableHighlight,
	View,
} from "react-native";
import AppText from "../AppText/AppText";
import { Feather } from "@expo/vector-icons";

interface AppTextInputLabelProps {
	helperButton?: boolean;
	onHelperButtonPress?: (e: GestureResponderEvent) => void;
}

function AppTextInputLabel({
	helperButton,
	onHelperButtonPress,
	children,
	style,
	...textProps
}: { children: React.ReactNode } & TextProps & AppTextInputLabelProps) {
	return (
		<View
			style={{ marginBottom: 10, flexDirection: "row", alignItems: "center" }}
		>
			<AppText>
				<Text
					style={[{ fontSize: 17, fontWeight: "900" }, style]}
					{...textProps}
				>
					{children}
				</Text>
			</AppText>
			{helperButton && (
				<View style={{ marginLeft: 7 }}>
					<TouchableHighlight
						style={{ borderRadius: 50 }}
						onPress={e => onHelperButtonPress(e)}
					>
						<Feather name="help-circle" size={24} color="white" />
					</TouchableHighlight>
				</View>
			)}
		</View>
	);
}

export default AppTextInputLabel;
