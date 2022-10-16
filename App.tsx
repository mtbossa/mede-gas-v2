import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState } from "react";
import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";
import MaskInput, { Masks } from "react-native-mask-input";

import ReadingInput from "./src/components/Calculator/ReadingInput";
import SafeViewAndroid from "./src/styles/SafeViewAndroid";

import "./src/numeral";
import { calculateGasSpentValues } from "./src/services/GasCalculator";
import numeral from "numeral";
import { removeNonNumericAndNonCommaFromString } from "./src/services/ReadingInputValidator";
import AppTextInput from "./src/components/Shared/AppTextInput";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import AppText from "./src/components/Shared/AppText";
import AppCalculator from "./src/components/Calculator/AppCalculator";

let customFonts = {
	"Lato-Regular": require("./assets/fonts/Lato-Regular.ttf"),
	Heebo: require("./assets/fonts/Heebo.ttf"),
};

SplashScreen.preventAutoHideAsync();

export default function App() {
	const [fontsLoaded] = Font.useFonts(customFonts);

	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded) {
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);

	if (!fontsLoaded) {
		return null;
	}

	return (
		<SafeAreaView
			onLayout={onLayoutRootView}
			style={[SafeViewAndroid.AndroidSafeArea, styles.defaultBackgroundColor]}
		>
			<StatusBar />
			<AppCalculator />
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	defaultBackgroundColor: {
		backgroundColor: "#191819",
	},
});
