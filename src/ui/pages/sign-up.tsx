import PageContentContainer from "../components/page-content-container";
import UserCredentialsForm from "../components/user-credentials-form";
import { useValidateSignUpForm } from "../../model/form-validation";
import { useReduxUserActions } from "../../model/redux-slice-users";

const SignUpPage = () => {
  const { createUser } = useReduxUserActions();

  const { validateUserName, validatePassword } = useValidateSignUpForm();

  return (
    <PageContentContainer>
      <UserCredentialsForm
        headerText="Create New Account"
        buttonText="Sign Up"
        formType="sign-up"
        handleFormSubmit={createUser}
        validateUserName={validateUserName}
        validatePassword={validatePassword}
      />
    </PageContentContainer>
  );
};

export default SignUpPage;
