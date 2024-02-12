const express = require("express"); // to create and manage backend server
const path = require("path"); // to serve static (local) files
const axios = require("axios"); // to send API requests
require("dotenv").config(); // to work with env variables

const app = express();

// middleware
app.use(express.static("static"));

// GET routes
app.get("/", (req, res) => {
  // Send HTML file in response
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/api/news/:query", async (req, res) => {
  const query = req.params.query;
  try {
    let apiUrl;
    if (query.toLowerCase() === "all") {
      apiUrl = `https://newsapi.org/v2/top-headlines?country=all&apiKey=${process.env.NEWS_API_KEY}`;
    } else {
      apiUrl = `https://newsapi.org/v2/everything?q=${query}&apiKey=${process.env.NEWS_API_KEY}`;
    }
    const response = await axios.get(apiUrl);
    res.json(response.data.articles);
  } catch (error) {
    // console.error("Error fetching news", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// start the server
app.listen(process.env.PORT || 3000, () => {
  console.log("SERVER STARTED @",process.env.PORT || 3000);
});
