import React, {
	ReactNode,
	useCallback,
	useMemo,
	useRef,
	useState,
} from "react";
import { HelperBottomSheetContext } from ".";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { Text } from "react-native";

interface Props {
	children: ReactNode;
}

function HelperBottomSheetProvider({ children }: Props) {
	const sheetRef = useRef<BottomSheet>(null);
	const snapPoints = useMemo(() => ["50%"], []);

	const [helperText, setHelperText] = useState("");

	const openHelper = useCallback((text: string) => {
		setHelperText(text);
		sheetRef.current?.snapToIndex(0);
	}, []);

	const closeHelper = useCallback(() => {
		sheetRef.current?.close();
	}, []);

	return (
		<HelperBottomSheetContext.Provider
			value={{ state: { openHelper, closeHelper } }}
		>
			{children}

			{/* Helper Label Bottom Sheet */}
			<BottomSheet
				ref={sheetRef}
				snapPoints={snapPoints}
				enablePanDownToClose={true}
				index={-1}
			>
				<BottomSheetView>
					<Text>{helperText}</Text>
				</BottomSheetView>
			</BottomSheet>
		</HelperBottomSheetContext.Provider>
	);
}

export default HelperBottomSheetProvider;
