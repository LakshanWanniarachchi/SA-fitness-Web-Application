import { React, useContext, useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import {
  Typography,
  Box,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

import AuthContext from "../context/AuthContext";

// Method to convert raw markdown text to beautiful UI using MUI
const renderMarkdownWithStyles = (markdownText) => {
  return (
    <ReactMarkdown
      components={{
        // Map h1 to Typography variant "h4"
        h1: ({ node, ...props }) => (
          <Typography variant="h4" component="h1" gutterBottom {...props} />
        ),
        // Map h2 to Typography variant "h5"
        h2: ({ node, ...props }) => (
          <Typography variant="h5" component="h2" gutterBottom {...props} />
        ),
        // Map h3 to Typography variant "h6"
        h3: ({ node, ...props }) => (
          <Typography variant="h6" component="h3" gutterBottom {...props} />
        ),
        // Map p to Typography for body text
        p: ({ node, ...props }) => (
          <Typography variant="body1" gutterBottom {...props} />
        ),
        // Map strong (bold) to Typography with fontWeight
        strong: ({ node, ...props }) => (
          <Typography
            variant="body1"
            fontWeight="bold"
            display="inline"
            {...props}
          />
        ),
        // Map ul (unordered list) to MUI List and ListItem
        ul: ({ node, ...props }) => (
          <List sx={{ listStyleType: "disc", paddingLeft: 3 }} {...props} />
        ),
        li: ({ node, ...props }) => (
          <ListItem sx={{ display: "list-item" }}>
            <ListItemText {...props} />
          </ListItem>
        ),
        // Map blockquote for any special text you want to emphasize
        blockquote: ({ node, ...props }) => (
          <Box
            sx={{
              borderLeft: "4px solid #ccc",
              paddingLeft: 2,
              color: "gray",
              fontStyle: "italic",
            }}
            {...props}
          />
        ),
      }}
    >
      {markdownText}
    </ReactMarkdown>
  );
};

// Example Component
const MealPlan = () => {
  const { get_diet } = useContext(AuthContext);
  const [rawText, setRawText] = useState("");

  useEffect(() => {
    const fetchDiet = async () => {
      const diet = await get_diet(); // Await the promise
      setRawText(diet); // Set the result as the rawText state
    };
    fetchDiet();
  }, [get_diet]);

  return (
    <Box sx={{ padding: 3 }}>
      {/* Render the beautiful Markdown with MUI styles */}
      {rawText ? renderMarkdownWithStyles(rawText) : "Loading..."}
    </Box>
  );
};

export default MealPlan;
