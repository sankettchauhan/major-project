import React, { useEffect } from "react";
import ResponsiveDrawer from "../components/ResponsiveDrawer";
import { collection, query, where, getDocs } from "firebase/firestore";
import { firestoreDb, initializeFirebaseApp } from "../firebase/config";

export default function ArticleSearch() {
  useEffect(() => {
    async function load() {
      initializeFirebaseApp();
      const db = firestoreDb();
      const q = query(
        collection(db, "articles"),
        where("title", "==", "title")
      );
      const querySnapshot = await getDocs(q);
      console.log(querySnapshot);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
      });
    }
    try {
      load();
    } catch (error) {
      console.error(error);
    }
  }, []);
  return (
    <ResponsiveDrawer title={"Search Article"}>article search</ResponsiveDrawer>
  );
}
