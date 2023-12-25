export type User = {
  name: string;
  password: string;
};

export type UserDataStorage = {
  [key: string]: User;
};

export const blankUser: User = {
  name: "",
  password: "",
};
