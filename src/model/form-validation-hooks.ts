import { selectUserData } from "./redux-slice-users";
import { useSelector } from "react-redux";

export const useValidateSignUpForm = () => {
  const { allUsers } = useSelector(selectUserData);

  const validateUserName = (input: string) => {
    const processedInput = input.trim().toLowerCase();

    if (processedInput.length < 3)
      return { isValid: false, message: "Should be at least 3 characters" };

    // eslint-disable-next-line
    const regex = /^[A-Za-z0-9\s\-]+$/;
    if (!regex.test(processedInput))
      return {
        isValid: false,
        message: "No foreign or special characters",
      };

    if (allUsers[processedInput])
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
