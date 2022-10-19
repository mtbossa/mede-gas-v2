import React, { ReactNode, useContext } from "react";
import { Text, TextProps, TouchableHighlight, View } from "react-native";
import AppText from "../AppText/AppText";
import { Feather } from "@expo/vector-icons";
import { HelperBottomSheetContext } from "../../../contexts/HelperBottomSheet";
import { useHelperBottomSheetContext } from "../../../contexts/HelperBottomSheet/hook";

interface AppTextInputLabelProps {
	helperButton?: boolean;
	helperText?: string;
	helperComponent?: ReactNode;
}

function AppTextInputLabel({
	helperButton,
	helperText,
	helperComponent,
	children,
	style,
	...textProps
}: { children: React.ReactNode } & TextProps & AppTextInputLabelProps) {
	const {
		state: { openHelper },
	} = useHelperBottomSheetContext();

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
						onPress={e => openHelper(helperComponent)}
					>
						<Feather name="help-circle" size={24} color="white" />
					</TouchableHighlight>
				</View>
			)}
		</View>
	);
}

export default AppTextInputLabel;
