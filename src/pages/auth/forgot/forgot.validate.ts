export type ForgotProps = {
  email: string;
};

export type ForgotFieldName = keyof ForgotProps;

export type ForgotFormErrors = Partial<Record<ForgotFieldName, string>>;

export const validateField = (
  field: ForgotFieldName,
  value: string,
): string => {
  const trimmedValue = value.trim();

  switch (field) {
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

    default:
      return "";
  }
};
