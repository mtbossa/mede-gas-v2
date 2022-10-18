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
import { HelperBottomSheetContext } from "./src/contexts/HelperBottomSheet";
import HelperBottomSheetProvider from "./src/contexts/HelperBottomSheet/provider";

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
		<GestureHandlerRootView style={{ flex: 1 }}>
			<HelperBottomSheetProvider>
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
			</HelperBottomSheetProvider>
		</GestureHandlerRootView>
	);
}

const styles = StyleSheet.create({
	defaultBackgroundColor: {
		backgroundColor: "#141416",
	},
});
