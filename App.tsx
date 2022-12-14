import { StatusBar } from 'expo-status-bar';
import { useCallback } from "react";
import { KeyboardAvoidingView, Platform, SafeAreaView } from "react-native";
import SafeViewAndroid from "./src/styles/SafeViewAndroid";

import "./src/numeral";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import HelperBottomSheetProvider from "./src/contexts/HelperBottomSheet/provider";
import Pages from "./src/components/Pages";
import { colors } from "./src/styles/colors";


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
				<StatusBar backgroundColor={colors.defaultBackground} style={"light"} />
				<SafeAreaView
					onLayout={onLayoutRootView}
					style={[
						SafeViewAndroid.AndroidSafeArea,
						{
							backgroundColor: colors.primary,
						},
					]}
				>
					<KeyboardAvoidingView
						behavior={Platform.OS === "ios" ? "padding" : "height"}
						enabled={false}
					>
						<Pages />
					
					</KeyboardAvoidingView>
				</SafeAreaView>
			</HelperBottomSheetProvider>
		</GestureHandlerRootView>
	);
}


