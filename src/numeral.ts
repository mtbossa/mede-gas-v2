import numeral from "numeral";

const test: numeral.NumeralJSLocale | numeral.NumeralJSFormat = {
	delimiters: {
		thousands: ".",
		decimal: ",",
	},
	abbreviations: {
		thousand: "k",
		million: "m",
		billion: "b",
		trillion: "t",
	},
	ordinal: function (number) {
		return "ro";
	},
	currency: {
		symbol: "R$",
	},
};

// load a locale
numeral.register("locale", "pt-BR", {
	delimiters: {
		thousands: ".",
		decimal: ",",
	},
	abbreviations: {
		thousand: "k",
		million: "m",
		billion: "b",
		trillion: "t",
	},
	ordinal: function (number) {
		return "ro";
	},
	currency: {
		symbol: "R$",
	},
});

// switch between locales
numeral.locale("pt-BR");
