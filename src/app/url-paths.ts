// These constats store URL paths to various pages of the site
const URL_PATHS = {
  root: "/",

  searchRoot: "/search",
  searchParam: "searchQuery",
  get search() {
    return `${this.searchRoot}/:${this.searchParam}?`;
  },

  monsterRoot: "/monster",
  monsterParam: "monsterIndex",
  get monster() {
    return `${this.monsterRoot}/:${this.monsterParam}?`;
  },

  signIn: "/sign-in",
  signUp: "/sign-up",

  history: "/history",
};

Object.setPrototypeOf(URL_PATHS, null);
Object.freeze(URL_PATHS);

export default URL_PATHS;
