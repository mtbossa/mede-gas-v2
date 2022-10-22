export interface FormField {
	value: string;
	errors: string[];
}

export type Form<T> = {
	[Property in keyof T]: FormField;
};

export default function useForm() {
	const updateFieldValue = <T>(field: keyof T, value: string, form: Form<T>) => {
		const updatedForm = { ...form };
		updatedForm[field].value = value;
		updatedForm[field].errors = [];
		return updatedForm;
	};

	return {
		updateFieldValue,
	};
}
