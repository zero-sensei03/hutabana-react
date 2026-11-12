export type RegisterProps = {
  username: string;
  email: string;
  password: string;
};

export type RegisterFieldName = keyof RegisterProps;

export type RegisterFormErrors = Partial<Record<RegisterFieldName, string>>;

export const validateField = (
  field: RegisterFieldName,
  value: string,
): string => {
  const trimmedValue = value.trim();

  switch (field) {
    case "username":
      if (!trimmedValue) {
        return "Username is required.";
      }

      if (trimmedValue.length < 3) {
        return "Username must be at least 3 characters.";
      }

      if (!/^[a-zA-Z0-9_]+$/.test(trimmedValue)) {
        return "Only letters, numbers, and underscores are allowed.";
      }

      return "";

    case "email":
      if (!trimmedValue) {
        return "Email address is required.";
      }

      if (
        trimmedValue.length > 254 ||
        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedValue)
      ) {
        return "Please enter a valid email address.";
      }

      return "";

    case "password":
      if (!value) {
        return "Password is required.";
      }

      if (value.length < 8) {
        return "Password must be at least 8 characters.";
      }

      if (!/[a-z]/.test(value)) {
        return "Password must contain a lowercase letter.";
      }

      if (!/[A-Z]/.test(value)) {
        return "Password must contain an uppercase letter.";
      }

      if (!/[0-9]/.test(value)) {
        return "Password must contain a number.";
      }

      return "";

    default:
      return "";
  }
};
