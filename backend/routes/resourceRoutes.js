import express from "express";
import Resource from "../models/Resource.js";

const router = express.Router();

/*
=================================
UPLOAD RESOURCE
=================================
*/
router.post("/upload", async (req, res) => {
  try {
    const { title, summary, fileType } = req.body;

    const resource = new Resource({
      title,
      summary,
      fileType,
      relevanceScore: Math.random() // mock score
    });

    await resource.save();

    res.json({
      message: "Resource uploaded successfully",
      resource
    });
  } catch (error) {
    res.status(500).json({ error: "Upload failed" });
  }
});

/*
=================================
SEARCH (SIMULATED SEMANTIC SEARCH)
=================================
*/
router.get("/search", async (req, res) => {
  try {
    const query = req.query.q;

    const resources = await Resource.find();

    // Simulated semantic search logic
    const filtered = resources
      .map((item) => {
        let score = 0;

        if (item.title.toLowerCase().includes(query.toLowerCase())) {
          score += 0.6;
        }

        if (item.summary.toLowerCase().includes(query.toLowerCase())) {
          score += 0.4;
        }

        return {
          ...item._doc,
          relevanceScore: score
        };
      })
      .filter((item) => item.relevanceScore > 0)
      .sort((a, b) => b.relevanceScore - a.relevanceScore);

    res.json(filtered);
  } catch (error) {
    res.status(500).json({ error: "Search failed" });
  }
});

/*
=================================
GET ALL RESOURCES
=================================
*/
router.get("/resources", async (req, res) => {
  const resources = await Resource.find();
  res.json(resources);
});

export default router;
