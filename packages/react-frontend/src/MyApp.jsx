// // src/MyApp.jsx
// import React from "react";

// function MyApp() {
//   return (
//     <div>
//       <h1>Hello, React!</h1>
//     </div>
//   );
// }
// export default MyApp;
// src/MyApp.jsx
import React, { useState } from "react";
import Table from "./Table";
import Form from "./Form";
// const characters = [
//     {
//       name: "Charlie",
//       job: "Janitor"
//     },
//     {
//       name: "Mac",
//       job: "Bouncer"
//     },
//     {
//       name: "Dee",
//       job: "Aspring actress"
//     },
//     {
//       name: "Dennis",
//       job: "Bartender"
//     }
//   ];
  

  function MyApp() {
    const [characters, setCharacters] = useState([]);

    function removeOneCharacter(index) {
      const updated = characters.filter((character, i) => {
        return i !== index;
      });
      setCharacters(updated);
    }
  
    function updateList(person) {
      setCharacters([...characters, person]);
    }
  
    return (
      <div className="container">
        <Table
          characterData={characters}
          removeCharacter={removeOneCharacter}
        />
        <Form handleSubmit={updateList} />
        hi
      </div>
    );
  }


export default MyApp;