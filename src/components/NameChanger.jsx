import { useContext } from "react";
import { siteContext } from "../context/siteContext";


export const NameChanger = () => {
  //CONTEXT: use the context in this component
    const {greeting, goodbye} = useContext(siteContext)
  return (
    <div>
      <h2>The length of the name is:</h2>
      <p>{greeting.length}</p>
      <p>{goodbye}</p>
    </div>
  );
};
