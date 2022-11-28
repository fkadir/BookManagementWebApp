import React, { useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import Logo from "../components/Logo";
import "./Login.css";

// code adapted from: https://github.com/coding-with-chaim/forgot-password-code/blob/master/client/src/routes/ResetPassword/index.js

//unadapted youtube: 6:25

// const ResetPassword = (props) => {
//   const [password, setPassword] = useState("");

//   const submitHandler = (e) => {
//     e.preventDefault();
//     const body = {
//       password,
//       id: props.match.params.id,
//     };
//     axios({
//       url: "/auth/reset",
//       data: body,
//       method: "patch",
//     }).then(() => {
//       props.history.push("/login");
//     });
//   };

//   return (
//     <Form onSubmit={submitHandler}>
//       <Row>
//         <Input
//           type="password"
//           name="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="New Password"
//         />
//       </Row>
//       <Row>
//         <Button>Save</Button>
//       </Row>
//     </Form>
//   );
// };

// export default ResetPassword;
