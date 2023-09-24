import { Button } from "@mui/material";

import { FC } from "react";

const SignUp: FC = () => {
  const google = () => {
    window.open("http://localhost:5000/auth/google", "_self");
  };
  //TODO: make the template for signing up
  return (
    <>
      <Button variant="contained" onClick={() => google()}>
        Login With Google
      </Button>
    </>
  );
};

export default SignUp;
