import { Box, TextField, Button, Stack, Typography } from "@mui/material";
import PageContentContainer from "../components/page-content-container";
import { useState } from "react";
import { useValidateSignUpForm } from "../../model/form-validation-hooks";
import useReduxInterface from "../../model/redux-interface-hook";

const SignUpPage = () => {
  const { createUser, signInUser } = useReduxInterface();

  const [formUserName, setFormUserName] = useState("");
  const [formPassword, setFormPassword] = useState("");

  const { validateUserName, validatePassword } = useValidateSignUpForm();
  const userNameValidationResult = validateUserName(formUserName);
  const passwordValidationResult = validatePassword(formPassword);

  const showUserNameError =
    formUserName.length > 0 && userNameValidationResult.isValid === false;
  const userNameHelperText =
    formUserName.length > 0 ? userNameValidationResult.message : "";

  const showPasswordError =
    formPassword.length > 0 && passwordValidationResult.isValid === false;
  const passwordHelperText =
    formPassword.length > 0 ? passwordValidationResult.message : "";

  const allowSubmit =
    userNameValidationResult.isValid && passwordValidationResult.isValid;

  const handleUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormUserName(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormPassword(event.target.value);
  };

  const handleSubmit = (event: React.MouseEvent) => {
    event.preventDefault();
    createUser(formUserName, formPassword);
    signInUser(formUserName, formPassword);
  };

  return (
    <PageContentContainer>
      <Box component="form">
        <Typography variant="h2" textAlign="center" sx={{ marginBottom: "1rem"}}>
          Create New Account
        </Typography>
        <Stack alignItems="center" gap="1rem">
          <TextField
            required
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
        </Stack>
      </Box>
    </PageContentContainer>
  );
};

export default SignUpPage;
