import React, { ReactNode } from "react";
import {
	StyleProp,
	StyleSheet,
	Text,
	TextComponent,
	TextStyle,
	View,
} from "react-native";
import AppText from "../AppText";

interface AppBottomSheetHelperProps {
	title: string;
	children: ReactNode;
	descriptionStyle?: StyleProp<TextStyle>;
}

function AppBottomSheetHelper({ title, children, descriptionStyle }: AppBottomSheetHelperProps) {
	return (
		<View style={styles.container}>
			<View style={styles.titleContainer}>
				<AppText>
					<Text style={styles.title}>{title}</Text>
				</AppText>
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
		marginBottom: 10,
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
