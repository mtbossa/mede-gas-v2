import React, { useContext } from "react";
import { Text, TextProps, TouchableHighlight, View } from "react-native";
import AppText from "../AppText/AppText";
import { Feather } from "@expo/vector-icons";
import { HelperBottomSheetContext } from "../../../contexts/HelperBottomSheetContext";

interface AppTextInputLabelProps {
	helperButton?: boolean;
}

function AppTextInputLabel({
	helperButton,
	children,
	style,
	...textProps
}: { children: React.ReactNode } & TextProps & AppTextInputLabelProps) {
	const { openHelper } = useContext(HelperBottomSheetContext);

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
						onPress={e => openHelper()}
					>
						<Feather name="help-circle" size={24} color="white" />
					</TouchableHighlight>
				</View>
			)}
		</View>
	);
}

export default AppTextInputLabel;
