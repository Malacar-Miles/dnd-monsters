import PageContentContainer from "../components/page-content-container";
import UserCredentialsForm from "../components/user-credentials-form";
import { checkIfEmpty } from "../../model/form-validation";
import { useReduxUserActions } from "../../model/redux-slice-users";

const SignInPage = () => {
  const { signInUser } = useReduxUserActions();

  return (
    <PageContentContainer>
      <UserCredentialsForm
        headerText="Sign In"
        buttonText="Sign In"
        handleFormSubmit={signInUser}
        validateUserName={checkIfEmpty}
        validatePassword={checkIfEmpty}
      />
    </PageContentContainer>
  );
};

export default SignInPage;
