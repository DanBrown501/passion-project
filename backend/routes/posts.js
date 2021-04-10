/** API routes for posts. */

const db = require("../db");
const express = require("express");
const router = new express.Router();

/** GET /   get overview of posts
 *
 * Returns:
 *
 * => [ { id,
 *        title,
 *        description,
 *      },
 *      ...
 *    ]
 *
 */

router.get("/", async function (req, res, next) {
  try {
    const result = await db.query(
      `SELECT p.id,
              p.title,
              p.description,
      FROM posts p 
      ORDER BY p.id
      `
    );
    return res.json(result.rows);
  } catch (err) {
    return next(err);
  }
});

/** GET /[id]  get detail on post w/comments
 *
 * Returns:
 *
 * =>   { id,
 *        title,
 *        description,
 *        body,
 *        comments: [ { id, text }, ... ],
 *      }
 */

router.get("/:id", async function (req, res, next) {
  try {
    const result = await db.query(
      `SELECT p.id,
              p.title,
              p.description,
              p.body,
              CASE WHEN COUNT(c.id) = 0 THEN JSON '[]' ELSE JSON_AGG(
                    JSON_BUILD_OBJECT('id', c.id, 'text', c.text)
                ) END AS comments
      FROM posts p 
        LEFT JOIN comments c ON c.post_id = p.id
      WHERE p.id = $1
      
      GROUP BY p.id    
      ORDER BY p.id
      `, [req.params.id]
    );
    return res.json(result.rows[0]);
  } catch (err) {
    return next(err);
  }
});





/** POST /     add a new post
 *
 * { title, description, body }  =>  { id, title, description, body,  }
 *
 */

router.post("/", async function (req, res, next) {
  try {
    const {title, body, description} = req.body;
    const result = await db.query(
      `INSERT INTO posts (title, description, body) 
        VALUES ($1, $2, $3) 
        RETURNING id, title, description, body,`,
      [title, description, body]);
    return res.status(201).json(result.rows[0]);
  } catch (err) {
    return next(err);
  }
});


/** PUT /[id]     update existing post
 *
 * { title, description, body }  =>  { id, title, description, body, }
 *
 */

router.put("/:id", async function (req, res, next) {
  try {
    const {title, body, description} = req.body;
    const result = await db.query(
      `UPDATE posts SET title=$1, description=$2, body=$3
        WHERE id = $4 
        RETURNING id, title, description, body, `,
      [title, description, body, req.params.id]);
    return res.json(result.rows[0]);
  } catch (e) {
    return next(e);
  }
});


/** DELETE /[id]     delete post
 *
 * => { message: "deleted" }
 *
 */

router.delete("/:id", async (req, res, next) => {
  try {
    await db.query("DELETE FROM posts WHERE id = $1", [req.params.id]);
    return res.json({ message: "deleted" });
  } catch (err) {
    return next(err);
  }
});


module.exports = router;
