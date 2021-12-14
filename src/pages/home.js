import React, { useEffect, useState } from "react";
import { firestoreDb, initializeFirebaseApp } from "../firebase/config";
import { CircularProgress } from "@mui/material";
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
    <ResponsiveDrawer title={"Home"}>
      <button onClick={() => navigate(`/article/add`)}>add article</button>
      {articles?.map((article, index) => (
        <div>
          <button onClick={() => navigate(`/article/${article.id}`)}>
            {article.title}
          </button>
        </div>
      ))}
    </ResponsiveDrawer>
  );
}
