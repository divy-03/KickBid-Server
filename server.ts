import app from "./app";

const PORT = process.env.PORT || 4000;  // Default to 4000 if not provided

app.listen(PORT, () => {
  console.log(`Server is working on http://localhost:${PORT}`);
});
