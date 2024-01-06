/* The api service www.dnd5eapi.co provides images for some monsters. 
I want to show these images (whenever they are available) on monster
search result cards. Problem is, the general search request only returns
Display Name and Index for each monster. To get the image URL path, 
I have to request full data for a particular monster, and I'd rather 
avoid it due to performance concerns.

Fortunately, those image urls can be easily inferred, for example
if the monster's index is "assassin", its image URL will be
"https://www.dnd5eapi.co/api/images/monsters/assassin.png".

The below function constructs such URLs based on monster index.*/

export const constructMonsterImageUrl = (monsterIndex: string) =>
  `https://www.dnd5eapi.co/api/images/monsters/${monsterIndex}.png`;
