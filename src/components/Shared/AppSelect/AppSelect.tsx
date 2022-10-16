import React from "react";
import { Picker, PickerProps } from "@react-native-picker/picker";

function AppSelect<T>({ children, ...pickerProps }: PickerProps<T>) {
	return <Picker {...pickerProps}>{children}</Picker>;
}

export default AppSelect;
