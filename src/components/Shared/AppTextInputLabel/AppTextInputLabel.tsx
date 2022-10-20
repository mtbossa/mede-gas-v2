import React, { ReactNode, useContext } from "react";
import { Text, TextProps, TouchableHighlight, View } from "react-native";
import AppText from "../AppText/AppText";
import { Feather } from "@expo/vector-icons";
import { HelperBottomSheetContext } from "../../../contexts/HelperBottomSheet";
import { useHelperBottomSheetContext } from "../../../contexts/HelperBottomSheet/hook";
import { colors } from "../../../styles/colors";
import AppHelperIconButton from "../AppHelperIconButton";

interface AppTextInputLabelProps {
	helperButton?: boolean;
	helperText?: string;
	helperComponent?: ReactNode;
	uom?: string;
}

function AppTextInputLabel({
	helperButton,
	helperText,
	helperComponent,
	children,
	style,
	uom,
	...textProps
}: { children: React.ReactNode } & TextProps & AppTextInputLabelProps) {
	const { openHelper } = useHelperBottomSheetContext();

	return (
		<View
			style={{
				marginBottom: 10,
				flexDirection: "row",
				alignItems: "center",
			}}
		>
			<AppText>
				<Text
					style={[{ fontSize: 17, fontWeight: "900" }, style]}
					{...textProps}
				>
					{children}
				</Text>
			</AppText>
			<Text
				style={{
					fontSize: 13,
					color: colors.subText,
					fontFamily: "Heebo",
				}}
			>
				{" "}
				{uom}
			</Text>
			{helperButton && (
				<AppHelperIconButton helperComponent={helperComponent} />
			)}
		</View>
	);
}

export default AppTextInputLabel;
