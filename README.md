# D&D Monsters

This web app shows basic information about monsters from the fantasy tabletop role-playing game "Dungeons and Dragons" (5th edition). It fetches data from a [free API](https://www.dnd5eapi.co/docs/#overview). Currently this API provides images for only a small subset of monsters, so I'm showing a placeholer image in cases where a proper image is not available.

This is a practice project. My main purpose was to learn the Material UI library which I had never used before.

## App features:

- Sign up and Sign in
- Search monsters by name
- Check out individual monster pages with stats
- Browse Search History when signed in
- Add monsters to Favorites when signed in
- User data is saved to localStorage and is restored upon revisiting the page

## Technologies used:

- TypeScript programming language
- React library for rendering
- React Router library for routing
- Material UI component library
- Redux library for state management
- dayjs library for timestamps on the Search History page

Please check out the [live version](https://dnd5e-monsters.netlify.app/) of this app!
