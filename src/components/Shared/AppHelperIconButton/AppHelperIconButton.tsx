import React, { ReactNode, useContext } from "react";
import { TouchableHighlight, View } from "react-native";
import { Feather } from "@expo/vector-icons";

import { colors } from "../../../styles/colors";
import { useHelperBottomSheetContext } from "../../../contexts/HelperBottomSheet/hook";

interface AppHelperIconButtonProps {
	helperComponent: ReactNode;
	iconSize?: number;
}

function AppHelperIconButton({
	helperComponent,
	iconSize,
}: AppHelperIconButtonProps) {
	const { openHelper } = useHelperBottomSheetContext();

	return (
		<View style={{ marginLeft: 7 }}>
			<TouchableHighlight
				style={{ borderRadius: 50 }}
				onPress={e => openHelper(helperComponent)}
			>
				<Feather
					name="help-circle"
					size={iconSize || 16}
					color={colors.subText}
				/>
			</TouchableHighlight>
		</View>
	);
}

export default AppHelperIconButton;
