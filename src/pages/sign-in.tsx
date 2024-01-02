import PageContentContainer from "shared/ui/page-content-container";
import UserCredentialsForm from "widgets/user-credentials-form";
import { checkIfEmpty } from "features/form-validation";
import { useReduxUserActions } from "entities/user";

const SignInPage = () => {
  const { signInUser } = useReduxUserActions();

  return (
    <PageContentContainer>
      <UserCredentialsForm
        headerText="Sign In"
        buttonText="Sign In"
        formType="sign-in"
        handleFormSubmit={signInUser}
        validateUserName={checkIfEmpty}
        validatePassword={checkIfEmpty}
      />
    </PageContentContainer>
  );
};

export default SignInPage;
