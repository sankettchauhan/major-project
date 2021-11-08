import React, { useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useEffect } from "react";
import { firestoreDb, initializeFirebaseApp } from "../firebase/config";
import { CircularProgress } from "@mui/material";

export default function Article() {
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      initializeFirebaseApp();
      const db = firestoreDb();
      const aId = window.location.pathname.split("/")[2];
      try {
        const docRef = doc(db, "articles", aId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setArticle(docSnap.data());
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      } catch (err) {
        console.log("Error: ", err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <CircularProgress />;

  if (article?.title)
    return (
      <div>
        <h1>{article.title}</h1>
        <h3>{article.content}</h3>
      </div>
    );

  return <h1>nothing returned!</h1>;
}