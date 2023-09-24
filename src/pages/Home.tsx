import { Box, Button, Input } from "@mui/material";
import Container from "@mui/material/Container";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { FC, useState } from "react";

const Home: FC = () => {
  const [postValue, setPostValue] = useState("");

  const mutation = useMutation({
    mutationFn: async (newPost) => {
      return await axios.post("http://localhost:5000/post", {
        postContent: newPost,
      });
    },
  });
  const query = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const resp = await axios.get("http://localhost:5000/posts");
      const { data } = resp;
      return data;
    },
  });
  const { data } = query;
  // console.log("posts: ", data);

  // TODO: setup loading when the data is undefined
  return (
    <Box paddingTop={2}>
      <Box display={"flex"} justifyContent={"center"} gap={2}>
        <Input
          placeholder="What's on your mind?"
          onChange={(e) => setPostValue(e.target.value)}
        />

        <Button variant="contained" onClick={() => console.log("post pressed")}>
          Post
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
