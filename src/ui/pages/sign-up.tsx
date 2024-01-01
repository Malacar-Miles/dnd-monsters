import { Box, TextField, Button, Stack, Typography } from "@mui/material";
import { Check, Block } from "@mui/icons-material";
import PageContentContainer from "../components/page-content-container";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useValidateSignUpForm } from "../../model/form-validation-hooks";
import {
  useReduxUserActions,
  selectUserData,
} from "../../model/redux-slice-users";

const SignUpPage = () => {
  const { createUser, resetUserOperationResult } = useReduxUserActions();

  useEffect(() => {
    resetUserOperationResult();
    // eslint-disable-next-line
  }, []);

  const { operationResult } = useSelector(selectUserData);
  const signedInSuccessfully = operationResult.status === "success";

  const [formUserName, setFormUserName] = useState("");
  const [formPassword, setFormPassword] = useState("");

  const { validateUserName, validatePassword } = useValidateSignUpForm();
  const userNameValidationResult = validateUserName(formUserName);
  const passwordValidationResult = validatePassword(formPassword);

  const disableTextFields = signedInSuccessfully;

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

  const allowSubmit =
    !signedInSuccessfully &&
    userNameValidationResult.isValid &&
    passwordValidationResult.isValid;

  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormUserName(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormPassword(event.target.value);
  };

  const handleSubmit = (event: React.MouseEvent) => {
    event.preventDefault();
    createUser(formUserName, formPassword);
  };

  return (
    <PageContentContainer>
      <Box component="form">
        <Typography
          variant="h2"
          textAlign="center"
          sx={{ marginBottom: "1rem" }}
        >
          Create New Account
        </Typography>
        <Stack alignItems="center" gap="1rem">
          <TextField
            required
            disabled={disableTextFields}
            id="user-name"
            label="User Name"
            autoComplete="off"
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
            value={formPassword}
            onChange={handlePasswordChange}
            error={showPasswordError}
            helperText={passwordHelperText}
          />
          <Button type="submit" disabled={!allowSubmit} onClick={handleSubmit}>
            Sign Up
          </Button>
          <OperationResult />
        </Stack>
      </Box>
    </PageContentContainer>
  );
};

export default SignUpPage;
