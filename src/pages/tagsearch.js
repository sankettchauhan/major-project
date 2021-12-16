import React, { useEffect, useState } from "react";
import ResponsiveDrawer from "../components/ResponsiveDrawer";
import { collection, query, where, getDocs } from "firebase/firestore";
import { firestoreDb, initializeFirebaseApp } from "../firebase/config";
import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import { useNavigate } from "react-router-dom";

export default function ArticleSearch() {
  const [search, setSearch] = useState("");
  const [res, setRes] = useState([]);
  const navigate = useNavigate();
  console.log(res);

  useEffect(() => {
    async function load() {
      initializeFirebaseApp();
      const db = firestoreDb();
      const q = query(collection(db, "articles"), where("title", "==", search));
      const querySnapshot = await getDocs(q);
      const resArr = [];
      querySnapshot.forEach((doc) => {
        if (doc?.id) {
          resArr.push({ id: doc.id, ...doc.data() });
        }
      });
      setRes(resArr);
    }
    try {
      if (search !== "") load();
    } catch (error) {
      console.error(error);
    }
  }, [search]);

  return (
    <ResponsiveDrawer title={"Search Article"}>
      <Box>
        <TextField
          variant="outlined"
          label="Enter search here"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          size="large"
        />
      </Box>
      {res.length !== 0 && (
        <>
          {res.map((article, i) => (
            <Box key={`key-${article.title}`} sx={{ marginTop: "1em" }}>
              <Button
                size="large"
                variant="contained"
                onClick={() => navigate(`/article/${article.id}`)}
              >
                {article.title}
              </Button>
            </Box>
          ))}
        </>
      )}
    </ResponsiveDrawer>
  );
}
