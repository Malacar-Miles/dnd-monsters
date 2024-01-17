export const getInitialsFromUserName = (userName: string) => {
  return userName
    .split(" ")
    .map((name) => name[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
};
