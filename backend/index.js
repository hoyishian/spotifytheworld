const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

var count = 0;

var db = mysql.createConnection({
  host: "localhost",
  // host: "23.236.52.139",
  user: "root",
  database: "SpotifyDatabase",
  // password: "112233"
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// retrieve
app.get("/api/retrieve", (require, response) => {
  const sqlSelect = "SELECT DISTINCT s.name, a.artist_name, al.album_name, s.song_id, al.album_id, a.artist_id, p.note, p.highlyRated FROM (((Personalize P JOIN Song s ON p.song_id = s.song_id) JOIN Sings si ON s.song_id = si.song_id) JOIN Artist a ON si.artist_id = a.artist_id) JOIN Album al ON s.album_id = al.album_id" ;
  db.query(sqlSelect, (err, result) => {
      console.log(result);
      console.log(err);
      response.send(result);
  });
});

// READ
app.get("/api/get", (require, response) => {
  const searchCountry = require.query.search;
  console.log(searchCountry);
  const sqlSelect = "SELECT DISTINCT s.name, a.artist_name, al.album_name, s.country_chart, s.chart_rank, s.song_id, al.album_id, a.artist_id FROM ((Song s JOIN Sings si ON s.song_id = si.song_id) JOIN Album al ON s.album_id = al.album_id) JOIN Artist a ON si.artist_id = a.artist_id WHERE s.country_chart LIKE ? ORDER BY s.chart_rank";
  db.query(sqlSelect, searchCountry, (err, result) => {
      console.log(result);
      console.log(err);
      response.send(result);
  });
});

// Create
app.post("/api/insert", (require, response) => {
  const songId = require.body.songId;

  const sqlInsert = "INSERT INTO Personalize(song_id, note, highlyRated) VALUES (?,?,?);";
  db.query(sqlInsert, [songId, "", "No"], (err, result) => {
      console.log( "1st Insert");
      console.log(err);
  });
});


// Delete
app.delete("/api/delete/:songId", (require, response) => {
  const songId = require.params.songId;

  const sqlDelete = "DELETE FROM Personalize WHERE song_id = ?";
  db.query(sqlDelete, songId, (err, result) => {
    console.log(err);
  });
});

// Update
app.put("/api/update/", (require, response) => {

  const songId = require.body.songId;
  const note = require.body.note;

  const sqlUpdate = "UPDATE Personalize SET note = ? WHERE song_id = ?";
  db.query(sqlUpdate, [note,songId], (err, result) => {
      if (err) 
      console.log(err);
  })
});

app.listen(3002, () => {
  console.log("running on port 3002");
})
