import React, { useState } from "react";
import { Picker, PickerProps } from "@react-native-picker/picker";
import { StyleSheet, View } from "react-native";

function AppSelect<T>({ children, ...pickerProps }: PickerProps<T>) {
	const [isFocused, setIsFocused] = useState(false);
	return (
		<View style={[styles.input, isFocused && styles.focused]}>
			<Picker
				onFocus={() => setIsFocused(true)}
				onBlur={() => setIsFocused(false)}
				{...pickerProps}
			>
				{children}
			</Picker>
		</View>
	);
}

const styles = StyleSheet.create({
	focused: {
		borderColor: "#125ee0",
		borderWidth: 2,
		outlineStyle: "solid",
		outlineWidth: 4,
	},
	input: {
		borderRadius: 3,
		elevation: 2,
		backgroundColor: "#FFFFF3",
	},
});

export default AppSelect;
