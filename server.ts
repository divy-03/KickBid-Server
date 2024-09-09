import app from "./app";
import { connectToAtlas } from "./atlas";


const PORT = process.env.PORT || 4000;

(async () => {
  try {
    await connectToAtlas(); // Wait for the connection to be established
    app.listen(process.env.PORT, () => {
      console.log(`Server is working on http://localhost:${process.env.PORT}`);
    });
  } catch (err) {
    console.error("Failed to connect to MongoDB Atlas:", err);
  }
})();