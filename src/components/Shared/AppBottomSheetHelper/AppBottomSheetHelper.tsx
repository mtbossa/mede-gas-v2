import React, { ReactNode } from "react";
import {
	Pressable,
	StyleProp,
	StyleSheet,
	Text,
	TextComponent,
	TextStyle,
	View,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { colors } from "../../../styles/colors";
import AppText from "../AppText";
import { useHelperBottomSheetContext } from "../../../contexts/HelperBottomSheet/hook";

interface AppBottomSheetHelperProps {
	title: string;
	children: ReactNode;
	descriptionStyle?: StyleProp<TextStyle>;
}

function AppBottomSheetHelper({
	title,
	children,
	descriptionStyle,
}: AppBottomSheetHelperProps) {
	const { closeHelper } = useHelperBottomSheetContext();
	return (
		<View style={styles.container}>
			<View style={styles.titleContainer}>
				<AppText>
					<Text style={styles.title}>{title}</Text>
				</AppText>
				<Pressable onPress={() => closeHelper()}>
					<AntDesign name="close" size={20} color={colors.subText} />
				</Pressable>
			</View>

			<AppText>
				<Text style={[styles.description]}>{children}</Text>
			</AppText>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 20,
		paddingVertical: 10,
	},
	titleContainer: {
		flexDirection: "row",
		marginBottom: 10,
		justifyContent: "space-between",
		alignItems: "center",
	},
	title: {
		fontSize: 25,
		fontWeight: "bold",
		fontFamily: "Heebo",
	},
	description: {
		fontSize: 17,
	},
});
export default AppBottomSheetHelper;
