import React, { useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { useEffect } from "react";
import { firestoreDb, initializeFirebaseApp } from "../firebase/config";
import { CircularProgress, Box, Typography, Chip } from "@mui/material";
import ResponsiveDrawer from "../components/ResponsiveDrawer";

export default function Article() {
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(true);
  // console.log(article);

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
      <ResponsiveDrawer title={"article"}>
        <Box>
          <Typography variant="h3" style={{ textTransform: "capitalize" }}>
            {article.title}
          </Typography>
        </Box>
        <Box>
          <Typography variant="body1" style={{ marginBottom: "10px" }}>
            Created at {new Date(article.dateCreated).toLocaleDateString()}
          </Typography>
        </Box>
        <Box>
          {article.content.length > 0 && (
            <>
              {article.content.map((paragraph, index) => (
                <Box key={`${article.title}-para-${index + 1}`}>
                  <Typography
                    variant="body1"
                    style={{ fontSize: "1.5em", fontWeight: 100 }}
                  >
                    {paragraph}
                  </Typography>
                </Box>
              ))}
            </>
          )}
        </Box>
        <Box>
          {article.tags.length > 0 && (
            <>
              <Typography style={{ marginTop: "1em" }}>
                Tags:{" "}
                {article.tags.map((tag, index) => (
                  <Chip
                    key={`${article.title}-tag-${index + 1}`}
                    label={tag}
                    sx={{ marginRight: "5px" }}
                  />
                ))}{" "}
              </Typography>
            </>
          )}
        </Box>
      </ResponsiveDrawer>
    );

  return <h1>nothing returned!</h1>;
}
