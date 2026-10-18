import { useFonts } from "expo-font";
import { Slot } from "expo-router";
import * as ExpoSplashScreen from 'expo-splash-screen';
import { useEffect } from "react";
import { KeyboardProvider } from "react-native-keyboard-controller";
import "../global.css";

ExpoSplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const [fontLoaded, fontError] = useFonts({
		'Inter-Regular': require('../../assets/fonts/Inter-Regular.ttf'),
	});
	useEffect(() => {
		if (fontLoaded || fontError)
			ExpoSplashScreen.hideAsync();
	}, [fontLoaded, fontError]);
	return (
		<KeyboardProvider>
			{ !(fontLoaded || fontError)
				? null
				: <Slot /> }
		</KeyboardProvider>
	);
}
