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
import { colors } from "../../styles/colors";

interface Props {
	children: ReactNode;
}

function HelperBottomSheetProvider({ children }: Props) {
	const sheetRef = useRef<BottomSheet>(null);
	const snapPoints = useMemo(() => ["50%"], []);

	const [isOpen, setIsOpen] = useState(false);
	const [helperComponent, setHelperComponent] = useState<ReactNode | null>(
		null
	);

	const openHelper = useCallback((text: string) => {
		setHelperComponent(text);
		setIsOpen(true);
		sheetRef.current?.snapToIndex(0);
	}, []);

	const closeHelper = useCallback(() => {
		setIsOpen(false);
		sheetRef.current?.close();
	}, []);

	return (
		<HelperBottomSheetContext.Provider
			value={{ openHelper, closeHelper, isOpen }}
		>
			{children}

			{/* Helper Label Bottom Sheet */}
			<BottomSheet
				ref={sheetRef}
				snapPoints={snapPoints}
				enablePanDownToClose={true}
				index={-1}
				backgroundStyle={{backgroundColor: colors.primary}}
				style={{ paddingVertical: 5, paddingHorizontal: 10 }}
				onClose={() => setIsOpen(false)}
			>
				<BottomSheetView>{helperComponent}</BottomSheetView>
			</BottomSheet>
		</HelperBottomSheetContext.Provider>
	);
}

export default HelperBottomSheetProvider;
