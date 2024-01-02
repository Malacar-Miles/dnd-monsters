import PageContentContainer from "shared/ui/page-content-container";
import UserCredentialsForm from "widgets/user-credentials-form";
import { useValidateSignUpForm } from "features/form-validation";
import { useReduxUserActions } from "entities/user";

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
