import useReduxInterface from "./redux-interface-hook";

export const useValidateSignUpForm = () => {
  const { allUsers } = useReduxInterface();

  const validateUserName = (input: string) => {
    const trimmedInput = input.trim();

    if (trimmedInput.length < 3)
      return { isValid: false, message: "Should be at least 3 characters" };

    // eslint-disable-next-line
    const regex = /^[A-Za-z0-9\s\-]+$/;
    if (!regex.test(trimmedInput))
      return {
        isValid: false,
        message:
          "No foreign or special characters",
      };

    if (allUsers[trimmedInput])
      return { isValid: false, message: "This user name is not available" };

    return { isValid: true, message: "This user name is valid" };
  };

  const validatePassword = (input: string) => {
    if (input.startsWith(" ") || input.endsWith(" "))
      return {
        isValid: false,
        message: "May not start or end with space",
      };

    if (input.length < 5)
      return { isValid: false, message: "Should be at least 5 characters" };

    return { isValid: true, message: "This password is valid" };
  };

  return { validateUserName, validatePassword };
};
