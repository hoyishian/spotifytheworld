import './App.css';
import React, {useState, useEffect} from "react";
import Axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Grid, TextField, Button, Input } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

const CustomTableCell = ({ val, name, onChange }) => {
  const { editMode } = val;
  return (
    <TableCell align="center" >
      {editMode ? (
        <Input
          value={val[name]}
          name={name}
          onChange={e => onChange(e, val)}
        />
      ) : (
        val[name]
      )}
    </TableCell>
  );
};

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

  const [queryList, setQueryList] = useState([]);

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
      var i;
      for (i = 0; i < response.data.length; i++) {
        response.data[i].editMode = false;
        response.data[i].id = response.data[i].song_id.concat(response.data[i].artist_id);
      }
      setNewSongCharts(response.data)
    })
  };

  const getQuery = () => {
    Axios.get('http://localhost:3002/api/retrieve').then((response) => {
      console.log(response.data)
      setQueryList(response.data)
    })
  };

  const onToggleEditMode = (id) => {
    setNewSongCharts(state => {
      return newSongCharts.map(row => {
        if (row.id === id) {
          return { ...row, editMode: !row.editMode };
        }
        return row;
      });
    });
  };

  const onChange = (e, row) => {
    const value = e.target.value;
    const name = e.target.name;
    const { id } = row;
    console.log(name)
    console.log(value)
    if (name === "name") {
      setNewSongName(value);
    } else if (name === "artist_name") {
      setNewArtistName(value);
    } else if (name === "album_name") {
      setNewAlbumName(value)
    } else if (name === "country_chart") {
      setNewCountryChart(value)
    } else if (name === "chart_rank") {
      setNewChartRank(value)
    }

    const newRows = newSongCharts.map(row => {
      if (row.id === id) {
        return { ...row, [name]: value };
      }
      return row;
    });
    setNewSongCharts(newRows);
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

  const updateSong = (curralbumId, currartistId, currsongId, id) => {
    console.log(curralbumId)
    console.log(currartistId)
    console.log(currsongId)
    console.log(newSongName)
    console.log(newArtistName)
    console.log(newAlbumName)
    console.log(newCountryChart)
    console.log(newCountryRank)
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
    onToggleEditMode(id)
  };

  const classes = useStyles();

  return (
    <Grid className="App" container direction = "column" justify="center" alignItems="center" spacing={4}>
      <Grid item>
        <h1> Spotify The World</h1>
      </Grid>

      <Grid item>
          <Button variant="contained" color="primary" onClick={getQuery} color="secondary"> Retrieve Query </Button>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center"> Artist ID </TableCell>
                  <TableCell align="center"> Artist Name </TableCell>
                  <TableCell align="center"> Average Rating </TableCell>
                  <TableCell align="center"> Number of times songs appeared in Charts </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {queryList.map(val => (
                  <TableRow key={val.artist_id}>
                    <TableCell align="center"> {val.artist_id} </TableCell>
                    <TableCell align="center"> {val.artist_name} </TableCell>
                    <TableCell align="center"> {val.avgrating} </TableCell>
                    <TableCell align="center"> {val.count} </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
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
                  <TableCell align="center"> Artist </TableCell>
                  <TableCell align="center"> Album </TableCell>
                  <TableCell align="center">Country </TableCell>
                  <TableCell align="center">Chart </TableCell>
                  <TableCell align="center">Action </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {newSongCharts.map(val => (
                  // Might have issues here. Multiple songs with the same song name
                  <TableRow key={val.id}>
                    <CustomTableCell {...{ val, name: "name", onChange }} />
                    <CustomTableCell {...{ val, name: "artist_name", onChange }} />
                    <CustomTableCell {...{ val, name: "album_name", onChange }} />
                    <CustomTableCell {...{ val, name: "country_chart", onChange }} />
                    <CustomTableCell {...{ val, name: "chart_rank", onChange }} />
                    <TableCell align="center"> 
                       {val.editMode ?
                          <>
                            <Button
                            onClick={() => updateSong(val.album_id, val.artist_id, val.song_id, val.id)}
                            color="secondary"
                            >Done</Button>
                         </>
                        : 
                          <>
                            <Button onClick={() => deleteSong(val.song_id, val.artist_id, val.album_id)} color="secondary"> Delete </Button>
                            <Button onClick={() => onToggleEditMode(val.id)} color="secondary"> Update </Button>
                          </>
                       } 
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
