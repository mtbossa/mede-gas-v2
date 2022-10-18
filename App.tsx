import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useRef, useState, useMemo } from "react";
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
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import bottomSheet from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheet";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";


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

		// hooks
		const sheetRef = useRef<BottomSheet>(null);

		// variables
		const snapPoints = useMemo(() => ["50%"], []);
	
		const handleSnapPress = useCallback(index => {
			sheetRef.current?.snapToIndex(index);
		}, []);
	
		const handleClosePress = useCallback(() => {
			sheetRef.current?.close();
		}, []);

	if (!fontsLoaded) {
		return null;
	}

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<SafeAreaView
				onLayout={onLayoutRootView}
				style={[SafeViewAndroid.AndroidSafeArea, styles.defaultBackgroundColor]}
			>
				<StatusBar />
				<AppCalculator sheetRef={sheetRef}/>
			</SafeAreaView>

			{/* Helper Label Bottom Sheet */}
			<BottomSheet
				ref={sheetRef}
				snapPoints={snapPoints}
				enablePanDownToClose={true}
				index={-1}
			>
				<BottomSheetView>
					<Text>Awesome 🔥</Text>
				</BottomSheetView>
			</BottomSheet>
		</GestureHandlerRootView>
	);
}

const styles = StyleSheet.create({
	defaultBackgroundColor: {
		backgroundColor: "#141416",
	},
});
