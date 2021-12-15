import React, { useEffect, useState } from "react";
import { firestoreDb, initializeFirebaseApp } from "../firebase/config";
import { Button, CircularProgress } from "@mui/material";
import { collection, getDocs } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import ResponsiveDrawer from "../components/ResponsiveDrawer";

initializeFirebaseApp();
const db = firestoreDb();

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    // loads all the articles in the db
    async function load() {
      try {
        const querySnapshot = await getDocs(collection(db, "articles"));
        setArticles([]);
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const id = doc.id;
          setArticles((articles) =>
            articles.concat([
              {
                id,
                ...data,
              },
            ])
          );
        });
      } catch (err) {
        console.log("Error: ", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <CircularProgress />;

  return (
    <ResponsiveDrawer title={"All Articles"}>
      {articles?.map((article, index) => (
        <Button
          size="large"
          variant="contained"
          onClick={() => navigate(`/article/${article.id}`)}
          sx={{ marginBottom: "1em", marginLeft: "0.5em" }}
          key={`key-${article.title}`}
        >
          {article.title}
        </Button>
      ))}
    </ResponsiveDrawer>
  );
}
