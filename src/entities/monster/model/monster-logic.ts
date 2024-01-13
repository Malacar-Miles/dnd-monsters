import type { StatTableData } from "shared/ui/stat-table";
import type { MonsterExtendedData } from "./monster-data";

export const convertMonsterDescription = (desc: any) =>
  typeof desc === "string"
    ? desc
    : Array.isArray(desc)
    ? desc.join(" \n")
    : null;

export const generateStatTables = (data: MonsterExtendedData) => {
  const attributeTableData: StatTableData = {
    tableHeader: "Attributes",
    tableData: [
      ["Strength", data.strength],
      ["Dexterity", data.dexterity],
      ["Constitution", data.constitution],
      ["Intelligence", data.intelligence],
      ["Wisdom", data.wisdom],
      ["Charisma", data.charisma],
    ],
  };

  const otherStatsTableData: StatTableData = {
    tableHeader: "Misc. Stats",
    tableData: [
      ["Alignment", data.alignment],
      ["Creature Type", data.type],
      ["Size", data.size],
      ["Hit Points", data.hit_points],
      ["Proficiency Bonus", data.proficiency_bonus],
      ["Challenge Rating", data.challenge_rating],
    ],
  };

  return { attributeTableData, otherStatsTableData };
};
