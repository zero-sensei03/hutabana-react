export type LoginProps = {
  username: string;
  password: string;
};

export type LoginFieldName = keyof LoginProps;

export type LoginFormErrors = Partial<Record<LoginFieldName, string>>;

export const validateField = (field: LoginFieldName, value: string): string => {
  const trimmedValue = value.trim();

  switch (field) {
    case "username":
      if (!trimmedValue) {
        return "Username or email is required.";
      }

      if (trimmedValue.length < 3) {
        return "Username or email must be at least 3 characters.";
      }

      if (trimmedValue.length > 254) {
        return "Username or email not exceed 254 characters.";
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
