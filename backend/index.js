const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

var count = 0;

var db = mysql.createPool({
  // host: "localhost",
  host: "23.236.52.139",
  user: "root",
  database: "SpotifyDatabase",
  password: "112233",
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// retrieve
app.get("/api/retrieve", (require, response) => {
  db.getConnection((err, connection) => {
    if (err) {
      connection.release();
      throw err;
    }
    const sqlSelect =
      "SELECT DISTINCT s.name, a.artist_name, al.album_name, s.song_id, al.album_id, a.artist_id, p.note, p.highlyRated FROM (((Personalize p JOIN Song s ON p.song_id = s.song_id) JOIN Sings si ON s.song_id = si.song_id) JOIN Artist a ON si.artist_id = a.artist_id) JOIN Album al ON s.album_id = al.album_id";
    connection.query(sqlSelect, (err, result) => {
      connection.release();
      console.log(result);
      console.log(err);
      response.send(result);
    });
  });
});

// READ
app.get("/api/get", (require, response) => {
  const searchCountry = require.query.search;
  db.getConnection((err, connection) => {
    if (err) {
      connection.release();
      throw err;
    }
    const sqlSelect =
      "SELECT DISTINCT s.name, a.artist_name, al.album_name, s.country_chart, s.chart_rank, s.song_id, al.album_id, a.artist_id FROM ((Song s JOIN Sings si ON s.song_id = si.song_id) JOIN Album al ON s.album_id = al.album_id) JOIN Artist a ON si.artist_id = a.artist_id WHERE s.country_chart LIKE ? ORDER BY s.chart_rank";
    connection.query(sqlSelect, searchCountry, (err, result) => {
      connection.release();
      console.log(result);
      console.log(err);
      response.send(result);
    });
  });
});

// Create
app.post("/api/insert", (require, response) => {
  const songId = require.body.songId;
  db.getConnection((err, connection) => {
    if (err) {
      connection.release();
      throw err;
    }
    const sqlInsert =
      "INSERT INTO Personalize(song_id, note, highlyRated) VALUES (?,?,?);";
    connection.query(sqlInsert, [songId, "", "No"], (err, result) => {
      connection.release();
      console.log("1st Insert");
      console.log(err);
    });
  });
});

// Delete
app.delete("/api/delete/:songId", (require, response) => {
  const songId = require.params.songId;
  db.getConnection((err, connection) => {
    if (err) {
      connection.release();
      throw err;
    }

    const sqlDelete = "DELETE FROM Personalize WHERE song_id = ?";
    connection.query(sqlDelete, songId, (err, result) => {
      connection.release();
      console.log(err);
    });
  });
});

// Update
app.put("/api/update/", (require, response) => {
  const songId = require.body.songId;
  const note = require.body.note;
  db.getConnection((err, connection) => {
    if (err) {
      connection.release();
      throw err;
    }
    const sqlUpdate = "UPDATE Personalize SET note = ? WHERE song_id = ?";
    connection.query(sqlUpdate, [note, songId], (err, result) => {
      connection.release();
      if (err) console.log(err);
    });
  });
});
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log("running on port 3002");
});
