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

	const [helperComponent, setHelperComponent] = useState<ReactNode | null>(
		null
	);

	const openHelper = useCallback((text: string) => {
		setHelperComponent(text);
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
				backgroundStyle={{ backgroundColor: "#32384a" }}
				style={{ paddingVertical: 5, paddingHorizontal: 10 }}
			>
				<BottomSheetView>{helperComponent}</BottomSheetView>
			</BottomSheet>
		</HelperBottomSheetContext.Provider>
	);
}

export default HelperBottomSheetProvider;
