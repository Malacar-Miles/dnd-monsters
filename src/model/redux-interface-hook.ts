import { useDispatch, useSelector } from "react-redux";
import { create, signIn, signOut, selectUsers } from "./redux-slice-users";

const useReduxInterface = () => {
  const dispatch = useDispatch();

  const { currentUser, allUsers } = useSelector(selectUsers);

  const createUser = (name: string, password: string) => {
    dispatch(create({ name, password }));
  };

  const signInUser = (name: string, password: string) => {
    dispatch(signIn({ name, password }));
  };

  const signOutUser = () => {
    dispatch(signOut());
  };

  return { currentUser, allUsers, createUser, signInUser, signOutUser };
};

export default useReduxInterface;
