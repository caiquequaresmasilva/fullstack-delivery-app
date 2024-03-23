const patterns = Object.freeze({
  email: {
    pattern: "^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,10}$",
    message: "The email must have the correct format.",
  },
  password: {
    pattern: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$",
    message:
      "The password must contain at least 8 characters, with uppercase letters, lowercase letters and numbers.",
  },
});

export default function validateField(field: FieldName, value: string) {
  return {
    isValid: RegExp(patterns[field].pattern).test(value),
    message: patterns[field].message,
  };
}
