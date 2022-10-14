export function calculateDiff(biggerValue: number, lowerValue: number): number {
	if (lowerValue > biggerValue)
		throw new Error("lowerValue must be <= then biggerValue");

	return biggerValue - lowerValue;
}

export function transformGasCubicMeterToKg(
	cubicMeterValue: number,
	conversionCoefficient: number
): number {
	return cubicMeterValue * conversionCoefficient;
}

export function calculateGasMoneyExpensesBasesOnPriceByKg(
	amountSpentInKg: number,
	gasPriceByKg: number
): number {
	return amountSpentInKg * gasPriceByKg;
}

export function calculateGasSpentValues({
	lastReadingCubicMeter,
	firstReadingCubicMeter,
	conversionCoefficient,
	gasPriceByKg,
}: {
	lastReadingCubicMeter: number;
	firstReadingCubicMeter: number;
	conversionCoefficient: number;
	gasPriceByKg: number;
}) {
	const diffInCubicMeter = calculateDiff(
		lastReadingCubicMeter,
		firstReadingCubicMeter
	);
	const diffInKg = calculateDiff(
		transformGasCubicMeterToKg(lastReadingCubicMeter, conversionCoefficient),
		transformGasCubicMeterToKg(firstReadingCubicMeter, conversionCoefficient)
	);

	return {
		diffInCubicMeter: diffInCubicMeter.toFixed(3),
		diffInKg: diffInKg.toFixed(2),
		moneySpent: calculateGasMoneyExpensesBasesOnPriceByKg(
			diffInKg,
			gasPriceByKg
		).toFixed(2),
	};
}
