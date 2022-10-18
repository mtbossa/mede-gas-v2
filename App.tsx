import { StatusBar } from 'expo-status-bar';
import { useCallback, useRef, useMemo } from "react";
import { SafeAreaView, StyleSheet, Text } from "react-native";
import SafeViewAndroid from "./src/styles/SafeViewAndroid";

import "./src/numeral";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import AppCalculator from "./src/components/Calculator/AppCalculator";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { HelperBottomSheetContext } from "./src/contexts/HelperBottomSheetContext";

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

	const openHelper = useCallback(() => {
		sheetRef.current?.snapToIndex(0);
	}, []);

	const handleClosePress = useCallback(() => {
		sheetRef.current?.close();
	}, []);

	if (!fontsLoaded) {
		return null;
	}

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<HelperBottomSheetContext.Provider value={{ openHelper }}>
				<SafeAreaView
					onLayout={onLayoutRootView}
					style={[
						SafeViewAndroid.AndroidSafeArea,
						styles.defaultBackgroundColor,
					]}
				>
					<StatusBar />
					<AppCalculator />
				</SafeAreaView>
			</HelperBottomSheetContext.Provider>

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
