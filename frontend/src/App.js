import './App.css';
import React, {useState, useEffect} from "react";
import Axios from 'axios';

function App() {
  const [songId, setSongId] = useState(''); 
  const [songName, setSongName] = useState('');
  const [artistId, setArtistId] = useState('');
  const [artistName, setArtistName] = useState('');
  const [artistType, setArtistType] = useState('');
  const [albumId, setAlbumId] = useState('');
  const [albumName, setAlbumName] = useState('');
  const [releaseDate, setReleaseDate] = useState('');
  const [duration, setDuration] = useState('')
  const [countryChart, setCountryChart] = useState('');
  const [chartRank, setChartRank] = useState('');
  const [songCharts, setSongCharts] = useState([]);
  
  const [newSongName, setNewSongName] = useState("");
  const [newArtistName, setNewArtistName] = useState("");
  const [newAlbumName, setNewAlbumName] = useState("");
  const [newCountryChart, setNewCountryChart] = useState("");
  const [newCountryRank, setNewChartRank] = useState("");

  useEffect(() => {
    Axios.get('http://localhost:3002/api/get').then((response) => {
      console.log(response.data)
      setSongCharts(response.data)
    })
  },[])

  const submitNewSong = () => { 
    Axios.post('http://localhost:3002/api/insert', {
      songId: songId,
      songName: songName,
      artistId: artistId,
      artistName: artistName,
      artistType: artistType,
      albumId: albumId,
      albumName: albumName,
      releaseDate: releaseDate,
      duration: duration,
      countryChart: countryChart,
      chartRank: chartRank,
    });
    
    setSongCharts([
      ...songCharts,
      {
        songId: songId,
        songName: songName,
        artistId: artistId,
        artistName: artistName,
        artistType: artistType,
        albumId: albumId,
        albumName: albumName,
        releaseDate: releaseDate,
        duration: duration,
        countryChart: countryChart,
        chartRank: chartRank,
      },
    ]);
  };

  const deleteSong = (songId, artistId, albumId) => {
    Axios.delete(`http://localhost:3002/api/delete/${albumId}/${artistId}/${songId}`
      // data: {
      //   songId: "$songId",
      //   artistId: "$artistId",
      //   albumId: "$albumId"
      // }
    );
  };

  const updateSong = (curralbumId, currartistId, currsongId) => {
    Axios.put(`http://localhost:3002/api/update`, {
      albumId: curralbumId,
      artistId: currartistId,
      songId: currsongId,
      songName: newSongName,
      artistName: newArtistName,
      albumName: newAlbumName,
      countryChart: newCountryChart,
      countryRank: newCountryRank

    });
    setNewSongName("")
    setNewArtistName("")
    setNewAlbumName("")
    setNewCountryChart("")
    setNewChartRank("")
  };

  return (
    <div className="App">
      <h1> CRUD APPLICATIONS</h1>

      <div className="form">
        <div>
          <label> Song ID:</label>
          <input type="text" name="songId" onChange={(e) => {
            setSongId(e.target.value)
          } }/>
        </div>
        <div>
          <label> Song:</label>
          <input type="text" name="songName" onChange={(e) => {
            setSongName(e.target.value)
          } }/>
        </div>
        <div>
          <label> Artist ID:</label>
          <input type="text" name="artistId" onChange={(e) => {
            setArtistId(e.target.value)
          } }/>
        </div>
        <div>
          <label> Artist:</label>
          <input type="text" name="artistName" onChange={(e) => {
            setArtistName(e.target.value)
          } }/>
        </div>
        <div>
          <label> Artist Type:</label>
          <input type="text" name="artistType" onChange={(e) => {
            setArtistType(e.target.value)
          } }/>
        </div>
        <div>
          <label> Album ID:</label>
          <input type="text" name="albumId" onChange={(e) => {
            setAlbumId(e.target.value)
          } }/>
        </div>
        <div>
          <label> Album Name:</label>
          <input type="text" name="albumName" onChange={(e) => {
            setAlbumName(e.target.value)
          } }/>
        </div>
        <div>
          <label> Release Date:</label>
          <input type="text" name="releaseDate" onChange={(e) => {
            setReleaseDate(e.target.value)
          } }/>
        </div>
        <div>
          <label> Duration:</label>
          <input type="text" name="duration" onChange={(e) => {
            setDuration(e.target.value)
          } }/>
        </div>
        <div>
          <label> Country Chart:</label>
          <input type="text" name="countryChart" onChange={(e) => {
            setCountryChart(e.target.value)
          } }/>
        </div>
        <div>
          <label> Chart Rank:</label>
          <input type="text" name="chartRank" onChange={(e) => {
            setChartRank(e.target.value)
          } }/>
        </div>

        
        <button onClick={submitNewSong}> Submit</button>

        {songCharts.map((val) => {
          return (
            <div className = "card" border="2px">
              <div border="2px">
                <div display = "flex" > Song: {val.name} </div>
                <div display = "flex"> Artist: {val.artist_name}</div>
                <div display = "flex"> Album: {val.album_name}</div>
                <div display = "flex"> Country: {val.country_chart}</div>
                <div display = "flex"> Chart: {val.chart_rank}</div>
              </div>
              <button onClick={() => { deleteSong(val.song_id, val.artist_id, val.album_id) }}> Delete</button>
              <input type="text" id="updateSongName" defaultValue = {val.name} onChange={(e) => {
                setNewSongName(e.target.value)
              } }/>
              <input type="text" id="updateArtistName" defaultValue = {val.artist_name} onChange={(e) => {
                setNewArtistName(e.target.value)
              } }/>
              <input type="text" id="updateAlbumName" defaultValue = {val.album_name} onChange={(e) => {
                setNewAlbumName(e.target.value)
              } }/>
              <input type="text" id="updateCountryChart" defaultValue = {val.country_chart} onChange={(e) => {
                setNewCountryChart(e.target.value)
              } }/>
              <input type="text" id="updateChartRank" defaultValue = {val.chart_rank} onChange={(e) => {
                setNewChartRank(e.target.value)
              } }/>
              <button onClick={() => {
                updateSong(val.album_id, val.artist_id, val.song_id)
              }}> Update</button>
              </div>
          );
          
          ;
        })}
        

      </div>
      
    </div>
  );
}

export default App;
