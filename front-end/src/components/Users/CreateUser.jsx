import React, { useState } from "react";

//potential for later when actually implementing it:
// https://www.geeksforgeeks.org/how-to-show-and-hide-password-in-reactjs/ ???

//ref: code from createuser lab4
const CreateUser = () => {
  const [username, setUsername] = useState("");
  const [pw, setPw] = useState("");
  const [email, setEmail] = useState("");
  const [statusMessage, setStatusMessage] = useState("");

  const handleUsernameFieldChange = (event) => {
    event.preventDefault();
    setUsername(event.target.value);
  };

  const handlePwFieldChange = (event) => {
    event.preventDefault();
    setPw(event.target.value);
  };

  const handleEmailFieldChange = (event) => {
    event.preventDefault();
    setEmail(event.target.value);
  };

  const handleCreateUser = async (event) => {
    event.preventDefault();
    setStatusMessage("");

    let user = {
      username: username,
      pw: pw,
      email: email,
    };

    try {
      fetch("http://localhost:3100/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      })
        .then((response) => response.json())
        .then((data) => {
          setStatusMessage("User " + user.username + " created");
        });
    } catch (err) {
      // Remediation logic
      setStatusMessage("There was an error creating the user");
    }
  };

  return (
    <div className="">
      <div className="">
        <label className="">Email</label>
        <input
          type="text"
          placeholder="example@gmail.com"
          value={email}
          onChange={(e) => handleEmailFieldChange(e)}
        />

        <label className="">Username</label>
        <input
          type="text"
          placeholder=""
          value={username}
          onChange={(e) => handleUsernameFieldChange(e)}
        />

        <label className="">Password</label>
        <input
          type="text"
          placeholder=""
          value={pw}
          onChange={(e) => handlePwFieldChange(e)}
        />

        <button className="" onClick={handleCreateUser}>
          Create User
        </button>
        <p className="">{statusMessage}</p>
      </div>
    </div>
  );
};

export default CreateUser;
