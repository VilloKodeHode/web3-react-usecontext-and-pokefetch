import { useState } from "react";
import "./App.css";
import PokeDex from "./components/PokeDex";
import { NameChanger } from "./components/NameChanger";
import { siteContext } from "./context/siteContext";

//! Logic moved to context/siteContext.js
// export const siteContext = createContext();

function App() {
  //CONTEXT: the useStates are defined here, but we want to be able to use them in other components without having to prop them directly. We use a context (defined above, siteContext).
  const [greeting, setGreeting] = useState("Bob");
  const [goodbye, setgoodbye] = useState("Bye");
  const [theme, setTheme] = useState("lightMode");

  const changeName = (event) => {
    setGreeting(event.target.value);
  };

  const changeTheme = () => {
    setTheme(theme === "lightMode" ? "darkMode" : "lightMode");
  }

  return (
    <>
      <main className="grid gap-16 justify-center">
        {/* CONTEXT: we pass the useStates to the context with a .Provider. This makes the values avaliable in other components */}
        <siteContext.Provider
          value={{ greeting, goodbye, setGreeting, setgoodbye }}
        >
          {/* CONTEXT: Since this code is not a component we dont need the provider. We can simply pass it directly into the code */}
          <div className="grid gap-8 border-2 p-8 max-w-[600px]">
            <p className={`${theme} text-5xl`}>{greeting}</p>
            <button onClick={() => changeTheme()}>Change Theme</button>
            <textarea className="p-2" type="text" placeholder="Enter name" onChange={changeName} value={greeting} />
          </div>
          {/* CONTEXT: Inside of this component (NameChanger) we have used the context. Check inside to see how it is done */}
          <NameChanger />
          <PokeDex />
        </siteContext.Provider>
      </main>
    </>
  );
}

export default App;
