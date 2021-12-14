import React, { useEffect, useState } from "react";
import { firestoreDb, initializeFirebaseApp } from "../firebase/config";
import { collection, addDoc } from "firebase/firestore";
import Form from "../components/Form";
import { useNavigate } from "react-router-dom";
import ResponsiveDrawer from "../components/ResponsiveDrawer";

export default function ArticleNew() {
  const navigate = useNavigate();
  const [article, setArticle] = useState({});
  //   console.log("article: ", article);
  useEffect(() => {
    async function createArticle() {
      try {
        initializeFirebaseApp();
        const db = firestoreDb();
        const docRef = await addDoc(collection(db, "articles"), article);
        navigate("/");
        //   TODO: add snack - success and fail
      } catch (error) {
        console.log(error);
      }
    }
    if (article?.title && article?.content) {
      createArticle();
    }
  }, [article]);
  return (
    <>
      <ResponsiveDrawer title={"Add an Article"}>
        <Form setArticle={setArticle} />
      </ResponsiveDrawer>
    </>
  );
}
