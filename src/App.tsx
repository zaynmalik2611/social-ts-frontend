import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import LoadingPage from "./pages/LoadingPage";

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useQuery({
    queryKey: ["auth"],
    queryFn: async () => {
      try {
        const resp = await axios.get("http://localhost:5000/auth/success", {
          withCredentials: true,
        });
        setLoading(false);
        console.log("resp: ", resp);
        if (resp.status === 200) {
          const { data } = resp;
          // console.log("data", data);
          const { user } = data;
          setUser(user);
          return data;
        }
      } catch (error) {
        setLoading(false);
        return error;
      }
    },
    retry: false,
  });

  // console.log("user: ", user);
  // console.log("lod", loading);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/posts",
      element: <>Posts</>,
    },
  ]);
  return loading ? (
    <LoadingPage />
  ) : user ? (
    <RouterProvider router={router}></RouterProvider>
  ) : (
    <SignUp />
  );
}

export default App;
