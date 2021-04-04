const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

var count = 0;

var db = mysql.createConnection({
  // host: "localhost",
  host: "23.236.52.139",
  user: "root",
  database: "SpotifyDatabase",
  password: "112233"
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

// retrieve
app.get("/api/retrieve", (require, response) => {
  const sqlSelect = "SELECT si.artist_id, a.artist_name, AVG(s.chart_rank) as avgrating, COUNT(*) as count FROM (Song s JOIN Sings si ON s.song_id = si.song_id) JOIN Artist a on si.artist_id = a.artist_id GROUP BY a.artist_id HAVING count > 1 ORDER BY count DESC, avgrating ASC LIMIT 15";
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
  const songName = require.body.songName;
  const artistId = require.body.artistId;
  const artistName = require.body.artistName;
  const artistType = require.body.artistType;
  const albumId = require.body.albumId;
  const albumName = require.body.albumName;
  const releaseDate = require.body.releaseDate;
  const duration = require.body.duration;
  const countryChart = require.body.countryChart;
  const chartRank = require.body.chartRank;

  const sqlInsert = "INSERT INTO Sings(song_id, artist_id) VALUES (?,?);";
  db.query(sqlInsert, [songId, artistId], (err, result) => {
      console.log(count, "1st Insert");
      count = count + 1;
      console.log(err);
  });
  const sqlInsert1 = "INSERT INTO Artist(artist_id,artist_name, artist_type) VALUES (?, ?, ?)";
  db.query(sqlInsert1, [artistId, artistName, artistType], (err, result) => {
      console.log(count, "2nd Insert");
      count = count + 1;
      console.log(err);
  });;
  const sqlInsert2 = "INSERT INTO Album(album_id, album_name, release_date) VALUES (?, ?, ?)";
  db.query(sqlInsert2, [albumId, albumName, releaseDate], (err, result) => {
      console.log(count, "3rd Insert");
      count = count + 1;
      console.log(err);
  });
  const sqlInsert3 = "INSERT INTO Song(song_id, name, duration, album_id, country_chart, chart_rank) VALUES (?, ?, ?, ?, ?, ?)";
  db.query(sqlInsert3, [songId, songName, duration, albumId, countryChart, chartRank], (err, result) => {
      console.log(count, "4th Insert");
      count = count + 1;
      console.log(err);
  });
});


// Delete
app.delete("/api/delete/:albumId/:artistId/:songId", (require, response) => {
  const songId = require.params.songId;
  const artistId = require.params.artistId;
  const albumId = require.params.albumId;

  const sqlDelete = "DELETE FROM Artist WHERE artist_id = ?";
  db.query(sqlDelete, artistId, (err, result) => {
    console.log(err);
  });
  const sqlDelete1 = "DELETE FROM Sings WHERE song_id = ? AND artist_id = ?";
  db.query(sqlDelete1, [songId, artistId], (err, result) => {
    console.log(err);
  });
  const sqlDelete2 = "DELETE FROM Album WHERE album_id = ?";
  db.query(sqlDelete2, albumId, (err, result) => {
    console.log(err);
  });
  const sqlDelete3 = "DELETE FROM Song WHERE song_id = ?";
  db.query(sqlDelete3, songId, (err, result) => {
    console.log(err);
  });
});

// Update
app.put("/api/update/", (require, response) => {
  const albumId = require.body.albumId;
  const artistId = require.body.artistId;
  const songId = require.body.songId;
  const songName = require.body.songName;
  const artistName = require.body.artistName;
  const albumName = require.body.albumName;
  const countryChart = require.body.countryChart;
  const countryRank = require.body.countryRank;

  console.log(albumId)
  console.log(artistId)
  console.log(songId)
  console.log(songName)
  console.log(artistName)
  console.log(albumName)
  console.log(countryChart)
  console.log(countryRank)

  const sqlUpdate = "UPDATE Artist SET artist_name = ? WHERE artist_id = ?";
  db.query(sqlUpdate, [artistName,artistId], (err, result) => {
      if (err) 
      console.log(err);
  })
  const sqlUpdate1 = "UPDATE Song SET name = ?, country_chart = ?, chart_rank = ? WHERE song_id = ?";
  db.query(sqlUpdate1, [songName,countryChart, countryRank, songId], (err, result) => {
      if (err) 
      console.log(err);
  })
  const sqlUpdate2 = "UPDATE Album SET album_name = ? WHERE album_id= ?";
  db.query(sqlUpdate2, [albumName,albumId], (err, result) => {
      if (err) 
      console.log(err);
  })
});

app.listen(3002, () => {
  console.log("running on port 3002");
})
