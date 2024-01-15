import type {
  SearchableEntity,
  EntityBasicData,
} from "shared/api/searchable-entity";

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

export const monsterEntity: SearchableEntity = {
  entityType: "monster",
  fallbackImageUrl: "/images/monster-fallback-image.png",
  getImageUrlFunction: constructMonsterImageUrl,
};

export type Attributes = {
  charisma?: number;
  constitution?: number;
  dexterity?: number;
  intelligence?: number;
  strength?: number;
  wisdom?: number;
};

export type MonsterBasicData = EntityBasicData;

export type MonsterExtendedData = MonsterBasicData &
  Attributes & {
    image?: string;
    size?: "Tiny" | "Small" | "Medium" | "Large" | "Huge" | "Gargantuan";
    type?: string;
    alignment?:
      | "chaotic neutral"
      | "chaotic evil"
      | "chaotic good"
      | "lawful neutral"
      | "lawful evil"
      | "lawful good"
      | "neutral"
      | "neutral evil"
      | "neutral good"
      | "any alignment"
      | "unaligned";
    hit_points?: number;
    challenge_rating?: number;
    proficiency_bonus?: number;
    xp?: number;
    desc?: string | [string];
  };
