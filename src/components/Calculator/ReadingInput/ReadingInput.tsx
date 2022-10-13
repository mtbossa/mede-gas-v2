import React, { useState } from "react";
import MaskInput from "react-native-mask-input";

const READING_MASK = [/\d/, /\d/, /\d/, /\d/, /\d/, ",", /\d/, /\d/, /\d/]; // 99999,999

function ReadingInput() {
	const [readingOne, setReadingOne] = useState("");

	return (
		<MaskInput
			keyboardType="numeric"
			value={readingOne}
			onChangeText={(masked, unmasked) => {
				setReadingOne(masked);
				// assuming you typed "9" all the way:
				console.log(masked); // (99) 99999-9999
				console.log(unmasked); // 99999999999
			}}
			mask={READING_MASK}
		/>
	);
}

export default ReadingInput;
