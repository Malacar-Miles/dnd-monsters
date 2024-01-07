import { useParams } from "react-router-dom";
import URL_PATHS from "app/url-paths";
import { MonsterDetails } from "entities/monster";

const MonsterPage = () => {
  const param = useParams();
  const monsterIndex = param[URL_PATHS.monsterParam] || "";
  return <MonsterDetails monsterIndex={monsterIndex} />;
};

export default MonsterPage;
