export type MonsterBasicData = {
  index: string;
  name: string;
  url: string;
};

export type Attributes = {
  charisma?: number;
  constitution?: number;
  dexterity?: number;
  intelligence?: number;
  strength?: number;
  wisdom?: number;
};

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
