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
//import React, { useState } from "react";
import Table from "./Table";
import Form from "./Form";
import React, { useState, useEffect } from "react";

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

    useEffect(() => {
      fetchUsers()
        .then((res) => res.json())
        .then((json) => setCharacters(json["users_list"]))
        .catch((error) => {
          console.log(error);
        });
    }, []);
    function removeOneCharacter(index) {
      // const updated = characters.filter((character, i) => {
      //   return i !== index;
      // });
      // setCharacters(updated);
      const promise = fetch(
        `http://localhost:/users/${ID}`, 
        {
          method: "DELETE"
        }).then((res) => {
          if (res.status == 204){
          const updatedCharacters = characters.filter((character) => character.id !== id);
          setCharacters(updatedCharacters);
          }
          else if(res.status == 404)
          {
            throw new Error("ID not valid");
          }
        }
      ).catch((error) =>
      {
        console.error("Error 404 not Found")
      })
    }
    //Delete on backend
    // function deleteUser(ID) {
    //   const promise = fetch(
    //     `http://localhost:/users/${ID}`, 
    //     {
    //       method: "DELETE"
    //     })
    //     .then((res) => {
    //       if (res.status == 204)
    //         return promise;

    //       else if (res.status = 404)
    //         console.log("Error 404 Not Found")
    //     })

    // }
  
    function updateList(person) {
      postUser(person)
        .then(() => setCharacters([...characters, person]))
        .catch((error) => {
          console.log(error);
        });
    }
    //ie3 function
    function fetchUsers() {
      const promise = fetch("http://localhost:8000/users");
      return promise;
    }
    function postUser(person) {
      const promise = fetch("http://localhost:8000/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(person)
      });
    
      return promise;
    }

  
    return (
      <div className="container">
        <Table
          characterData={characters}
          removeCharacter={removeOneCharacter}
          //removeUser = {deleteUser}
    
        />
        <Form handleSubmit={updateList} />
      </div>
    );
  }


export default MyApp;