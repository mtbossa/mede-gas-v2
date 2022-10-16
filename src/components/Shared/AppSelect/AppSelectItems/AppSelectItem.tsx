import React from "react";
import { Picker, PickerItemProps } from "@react-native-picker/picker";

function AppSelectItem({ ...pickerItemProps }: PickerItemProps) {
	return <Picker.Item {...pickerItemProps} />;
}

export default AppSelectItem;
