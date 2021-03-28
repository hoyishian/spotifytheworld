import './App.css';
import React, {useState, useEffect} from "react";
import Axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, TextField, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

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
  const [newSongCharts, setNewSongCharts] = useState([]);
  
  const [newSongName, setNewSongName] = useState("");
  const [newArtistName, setNewArtistName] = useState("");
  const [newAlbumName, setNewAlbumName] = useState("");
  const [newCountryChart, setNewCountryChart] = useState("");
  const [newCountryRank, setNewChartRank] = useState("");

  const [searchCountry, setSearchCountry] = useState("");

  useEffect(() => {
    Axios.get('http://localhost:3002/api/get', 
    {params: {
      search: searchCountry
    }}
    ).then((response) => {
      console.log(response.data)
      setNewSongCharts(response.data)
    })
  },[])

  const searchChart = () => {
    Axios.get('http://localhost:3002/api/get', 
    {params: {
      search: searchCountry
    }}
    ).then((response) => {
      console.log(response.data)
      setNewSongCharts(response.data)
    })
  };

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

  const classes = useStyles();

  return (
    <Grid className="App" container direction = "column" justify="center" alignItems="center">
      <Grid item>
        <h1> Spotify The World</h1>
      </Grid>

      <Grid item>
        <form className = {classes.root}>
          <div>
            <TextField id = "standard-required" label="Song ID" onChange={(e) => {setSongId(e.target.value)} }/>
            <TextField id = "standard-required" label="Song Name" onChange={(e) => {setSongName(e.target.value)} }/>
            <TextField id = "standard-required" label="Artist ID" onChange={(e) => {setArtistId(e.target.value)} }/>
            <TextField id = "standard-required" label="Artist Name" onChange={(e) => {setArtistName(e.target.value)} }/>
            <TextField id = "standard-required" label="Artist Type" onChange={(e) => {setArtistType(e.target.value)} }/>
            <TextField id = "standard-required" label="Album ID" onChange={(e) => {setAlbumId(e.target.value)} }/>
            <TextField id = "standard-required" label="Album Name" onChange={(e) => {setAlbumName(e.target.value)} }/>
            <TextField id = "standard-required" label="Release Date" onChange={(e) => {setReleaseDate(e.target.value)} }/>
            <TextField id = "standard-required" label="Duration of Song" onChange={(e) => {setDuration(e.target.value)} }/>
            <TextField id = "standard-required" label="Country Chart" onChange={(e) => {setCountryChart(e.target.value)} }/>
            <TextField id = "standard-required" label="Rank in Chart" onChange={(e) => {setChartRank(e.target.value)} }/>

          </div>
        </form>
        <Button variant="contained" color="primary" onClick={submitNewSong}> Add New Entry </Button>
      </Grid>

      <Grid item>
        <form className = {classes.root}>
            <div>
              <TextField id = "standard-required" label="Country" onChange={(e) => {setSearchCountry(e.target.value)} }/>

          </div>
        </form>
        <Button variant="contained" color="primary" onClick={searchChart}> Search </Button>
      </Grid>
        <Grid item>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell> Song </TableCell>
                  <TableCell align="right"> Artist </TableCell>
                  <TableCell align="right"> Album </TableCell>
                  <TableCell align="right">Country </TableCell>
                  <TableCell align="right">Chart </TableCell>
                  <TableCell align="right">Action </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {newSongCharts.map((val) => (
                  // Might have issues here. Multiple songs with the same song name
                  <TableRow key={val.name}>
                    <TableCell component="th" scope="row">
                      {val.name}
                    </TableCell>
                    <TableCell align="right">{val.artist_name}</TableCell>
                    <TableCell align="right">{val.album_name}</TableCell>
                    <TableCell align="right">{val.country_chart}</TableCell>
                    <TableCell align="right">{val.chart_rank}</TableCell>
                    <TableCell align="center"> 
                      <Button
                        onClick={() => { deleteSong(val.song_id, val.artist_id, val.album_id) }}
                        color="secondary"
                      >Delete</Button>

                      <Button
                        onClick={() => {updateSong(val.album_id, val.artist_id, val.song_id)}}
                        color="secondary"
                      >Update</Button>
                    
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      
    </Grid>
  );
}

export default App;
