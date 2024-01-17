import { Box, TextField, Button, Stack, Typography } from "@mui/material";
import { Check, Block } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useReduxUserActions, selectUserData } from "entities/user";
import type { ValidatorFunction } from "features/form-validation";

type UserCredentialsFormProps = {
  headerText: string;
  buttonText: string;
  formType: "sign-up" | "sign-in";
  handleFormSubmit: (formUsername: string, formPassword: string) => void;
  validateUserName: ValidatorFunction;
  validatePassword: ValidatorFunction;
};

const UserCredentialsForm = (props: UserCredentialsFormProps) => {
  const {
    headerText,
    buttonText,
    formType,
    handleFormSubmit,
    validateUserName,
    validatePassword,
  } = props;

  const { resetUserOperationResult } = useReduxUserActions();

  useEffect(() => {
    // Reset operation result both when creating and
    // when destroying the component
    resetUserOperationResult();
    return resetUserOperationResult;
    // eslint-disable-next-line
  }, []);

  const { operationResult } = useSelector(selectUserData);
  const signedInSuccessfully = operationResult.status === "success";

  const [formUserName, setFormUserName] = useState("");
  const [formPassword, setFormPassword] = useState("");

  const userNameValidationResult = validateUserName(formUserName);
  const passwordValidationResult = validatePassword(formPassword);

  const disableTextFields = signedInSuccessfully;

  const allowSubmit =
    !signedInSuccessfully &&
    userNameValidationResult.isValid &&
    passwordValidationResult.isValid;

  const showOperationResult = operationResult.status !== "not-attempted";
  const operationResultColor = signedInSuccessfully ? "success" : "error";
  const OperationResultIcon = () =>
    signedInSuccessfully ? <Check /> : <Block />;
  const OperationResult = () =>
    showOperationResult ? (
      <Stack direction="row" alignItems="center" gap="0.5rem">
        <OperationResultIcon />
        <Typography color={operationResultColor}>
          {operationResult.message}
        </Typography>
      </Stack>
    ) : null;

  const passwordAutocomplete =
    formType === "sign-up" ? "new-password" : "current-password";

  const showUserNameError =
    formUserName.length > 0 &&
    !signedInSuccessfully &&
    userNameValidationResult.isValid === false;

  const userNameHelperText =
    formUserName.length > 0 && !signedInSuccessfully
      ? userNameValidationResult.message
      : "";

  const showPasswordError =
    formPassword.length > 0 &&
    !signedInSuccessfully &&
    passwordValidationResult.isValid === false;

  const passwordHelperText =
    formPassword.length > 0 && !signedInSuccessfully
      ? passwordValidationResult.message
      : "";

  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormUserName(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormPassword(event.target.value);
  };

  const handleSubmit = (event: React.MouseEvent) => {
    event.preventDefault();
    handleFormSubmit(formUserName, formPassword);
  };

  return (
    <>
      <Box component="form">
        <Typography
          variant="h2"
          textAlign="center"
          sx={{ marginBottom: "1rem" }}
        >
          {headerText}
        </Typography>
        <Stack alignItems="center" gap="1rem">
          <TextField
            required
            disabled={disableTextFields}
            id="user-name"
            label="User Name"
            autoComplete="username"
            value={formUserName}
            onChange={handleUserNameChange}
            error={showUserNameError}
            helperText={userNameHelperText}
          />
          <TextField
            required
            disabled={disableTextFields}
            id="password"
            label="Password"
            type="password"
            autoComplete={passwordAutocomplete}
            value={formPassword}
            onChange={handlePasswordChange}
            error={showPasswordError}
            helperText={passwordHelperText}
          />
          <Button type="submit" disabled={!allowSubmit} onClick={handleSubmit}>
            {buttonText}
          </Button>
          <OperationResult />
        </Stack>
      </Box>
    </>
  );
};

export default UserCredentialsForm;
