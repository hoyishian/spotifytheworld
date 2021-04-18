// const useStyles = makeStyles((theme) => ({
//   root: {
//     '& .MuiTextField-root': {
//       margin: theme.spacing(1),
//       width: '25ch',
//     },
//   },
// }));

// const CustomTableCell = ({ val, name, onChange }) => {
//   const { editMode } = val;
//   return (
//     <TableCell align="center" >
//       {editMode ? (
//         <Input
//           value={val[name]}
//           name={name}
//           onChange={e => onChange(e, val)}
//         />
//       ) : (
//         val[name]
//       )}
//     </TableCell>
//   );
// };

// function App() {
//   const [songId, setSongId] = useState('');
//   const [songName, setSongName] = useState('');
//   const [artistId, setArtistId] = useState('');
//   const [artistName, setArtistName] = useState('');
//   const [artistType, setArtistType] = useState('');
//   const [albumId, setAlbumId] = useState('');
//   const [albumName, setAlbumName] = useState('');
//   const [releaseDate, setReleaseDate] = useState('');
//   const [duration, setDuration] = useState('')
//   const [countryChart, setCountryChart] = useState('');
//   const [chartRank, setChartRank] = useState('');
//   const [songCharts, setSongCharts] = useState([]);
//   const [newSongCharts, setNewSongCharts] = useState([]);

//   const [newSongName, setNewSongName] = useState("");
//   const [newArtistName, setNewArtistName] = useState("");
//   const [newAlbumName, setNewAlbumName] = useState("");
//   const [newCountryChart, setNewCountryChart] = useState("");
//   const [newCountryRank, setNewChartRank] = useState("");

//   const [searchCountry, setSearchCountry] = useState("");

//   const [queryList, setQueryList] = useState([]);

//   // useEffect(() => {
//   //   Axios.get('http://localhost:3002/api/get',
//   //   {params: {
//   //     search: searchCountry
//   //   }}
//   //   ).then((response) => {
//   //     console.log(response.data)
//   //     setNewSongCharts(response.data)
//   //   })
//   // },[])

//   const searchChart = () => {
//     Axios.get('http://localhost:3002/api/get',
//     {params: {
//       search: searchCountry
//     }}
//     ).then((response) => {
//       console.log(response.data)
//       var i;
//       for (i = 0; i < response.data.length; i++) {
//         response.data[i].editMode = false;
//         response.data[i].id = response.data[i].song_id.concat(response.data[i].artist_id);
//       }
//       setNewSongCharts(response.data)
//     })
//   };

//   const getQuery = () => {
//     Axios.get('http://localhost:3002/api/retrieve').then((response) => {
//       console.log(response.data)
//       setQueryList(response.data)
//     })
//   };

//   const onToggleEditMode = (id) => {
//     setNewSongCharts(state => {
//       return newSongCharts.map(row => {
//         if (row.id === id) {
//           return { ...row, editMode: !row.editMode };
//         }
//         return row;
//       });
//     });
//   };

//   const onChange = (e, row) => {
//     const value = e.target.value;
//     const name = e.target.name;
//     const { id } = row;
//     console.log(name)
//     console.log(value)
//     if (name === "name") {
//       setNewSongName(value);
//     } else if (name === "artist_name") {
//       setNewArtistName(value);
//     } else if (name === "album_name") {
//       setNewAlbumName(value)
//     } else if (name === "country_chart") {
//       setNewCountryChart(value)
//     } else if (name === "chart_rank") {
//       setNewChartRank(value)
//     }

//     const newRows = newSongCharts.map(row => {
//       if (row.id === id) {
//         return { ...row, [name]: value };
//       }
//       return row;
//     });
//     setNewSongCharts(newRows);
//   };

//   const submitNewSong = () => {
//     Axios.post('http://localhost:3002/api/insert', {
//       songId: songId,
//       songName: songName,
//       artistId: artistId,
//       artistName: artistName,
//       artistType: artistType,
//       albumId: albumId,
//       albumName: albumName,
//       releaseDate: releaseDate,
//       duration: duration,
//       countryChart: countryChart,
//       chartRank: chartRank,
//     });

//     setSongCharts([
//       ...songCharts,
//       {
//         songId: songId,
//         songName: songName,
//         artistId: artistId,
//         artistName: artistName,
//         artistType: artistType,
//         albumId: albumId,
//         albumName: albumName,
//         releaseDate: releaseDate,
//         duration: duration,
//         countryChart: countryChart,
//         chartRank: chartRank,
//       },
//     ]);
//   };

//   const deleteSong = (songId, artistId, albumId) => {
//     Axios.delete(`http://localhost:3002/api/delete/${albumId}/${artistId}/${songId}`
//     );
//   };

//   const updateSong = (curralbumId, currartistId, currsongId, id) => {
//     console.log(curralbumId)
//     console.log(currartistId)
//     console.log(currsongId)
//     console.log(newSongName)
//     console.log(newArtistName)
//     console.log(newAlbumName)
//     console.log(newCountryChart)
//     console.log(newCountryRank)
//     Axios.put(`http://localhost:3002/api/update`, {
//       albumId: curralbumId,
//       artistId: currartistId,
//       songId: currsongId,
//       songName: newSongName,
//       artistName: newArtistName,
//       albumName: newAlbumName,
//       countryChart: newCountryChart,
//       countryRank: newCountryRank

//     });
//     setNewSongName("")
//     setNewArtistName("")
//     setNewAlbumName("")
//     setNewCountryChart("")
//     setNewChartRank("")
//     onToggleEditMode(id)
//   };

//   const classes = useStyles();

//   return (
//     <Grid className="App" container direction = "column" justify="center" alignItems="center" spacing={4}>
//       <Grid item>
//         <h1> Spotify The World</h1>
//       </Grid>

//       <Grid item>
//           <Button variant="contained" color="primary" onClick={getQuery} color="secondary"> Retrieve Query </Button>
//           <TableContainer component={Paper}>
//             <Table className={classes.table} aria-label="simple table">
//               <TableHead>
//                 <TableRow>
//                   <TableCell align="center"> Artist ID </TableCell>
//                   <TableCell align="center"> Artist Name </TableCell>
//                   <TableCell align="center"> Average Rating </TableCell>
//                   <TableCell align="center"> Number of times songs appeared in Charts </TableCell>
//                 </TableRow>
//               </TableHead>

//               <TableBody>
//                 {queryList.map(val => (
//                   <TableRow key={val.artist_id}>
//                     <TableCell align="center"> {val.artist_id} </TableCell>
//                     <TableCell align="center"> {val.artist_name} </TableCell>
//                     <TableCell align="center"> {val.avgrating} </TableCell>
//                     <TableCell align="center"> {val.count} </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Grid>

//       <Grid item>
//         <form className = {classes.root}>
//           <div>
//             <TextField id = "standard-required" label="Song ID" onChange={(e) => {setSongId(e.target.value)} }/>
//             <TextField id = "standard-required" label="Song Name" onChange={(e) => {setSongName(e.target.value)} }/>
//             <TextField id = "standard-required" label="Artist ID" onChange={(e) => {setArtistId(e.target.value)} }/>
//             <TextField id = "standard-required" label="Artist Name" onChange={(e) => {setArtistName(e.target.value)} }/>
//             <TextField id = "standard-required" label="Artist Type" onChange={(e) => {setArtistType(e.target.value)} }/>
//             <TextField id = "standard-required" label="Album ID" onChange={(e) => {setAlbumId(e.target.value)} }/>
//             <TextField id = "standard-required" label="Album Name" onChange={(e) => {setAlbumName(e.target.value)} }/>
//             <TextField id = "standard-required" label="Release Date" onChange={(e) => {setReleaseDate(e.target.value)} }/>
//             <TextField id = "standard-required" label="Duration of Song" onChange={(e) => {setDuration(e.target.value)} }/>
//             <TextField id = "standard-required" label="Country Chart" onChange={(e) => {setCountryChart(e.target.value)} }/>
//             <TextField id = "standard-required" label="Rank in Chart" onChange={(e) => {setChartRank(e.target.value)} }/>

//           </div>
//         </form>
//         <Button variant="contained" color="primary" onClick={submitNewSong}> Add New Entry </Button>
//       </Grid>

//       <Grid item>
//         <form className = {classes.root}>
//             <div>
//               <TextField id = "standard-required" label="Country" onChange={(e) => {setSearchCountry(e.target.value)} }/>

//           </div>
//         </form>
//         <Button variant="contained" color="primary" onClick={searchChart}> Search </Button>
//       </Grid>
//         <Grid item>
//           <TableContainer component={Paper}>
//             <Table className={classes.table} aria-label="simple table">
//               <TableHead>
//                 <TableRow>
//                   <TableCell> Song </TableCell>
//                   <TableCell align="center"> Artist </TableCell>
//                   <TableCell align="center"> Album </TableCell>
//                   <TableCell align="center">Country </TableCell>
//                   <TableCell align="center">Chart </TableCell>
//                   <TableCell align="center">Action </TableCell>
//                 </TableRow>
//               </TableHead>

//               <TableBody>
//                 {newSongCharts.map(val => (
//                   // Might have issues here. Multiple songs with the same song name
//                   <TableRow key={val.id}>
//                     <CustomTableCell {...{ val, name: "name", onChange }} />
//                     <CustomTableCell {...{ val, name: "artist_name", onChange }} />
//                     <CustomTableCell {...{ val, name: "album_name", onChange }} />
//                     <CustomTableCell {...{ val, name: "country_chart", onChange }} />
//                     <CustomTableCell {...{ val, name: "chart_rank", onChange }} />
//                     <TableCell align="center">
//                        {val.editMode ?
//                           <>
//                             <Button
//                             onClick={() => updateSong(val.album_id, val.artist_id, val.song_id, val.id)}
//                             color="secondary"
//                             >Done</Button>
//                          </>
//                         :
//                           <>
//                             <Button onClick={() => deleteSong(val.song_id, val.artist_id, val.album_id)} color="secondary"> Delete </Button>
//                             <Button onClick={() => onToggleEditMode(val.id)} color="secondary"> Update </Button>
//                           </>
//                        }
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>
//         </Grid>

//     </Grid>
//   );
// }

import "./App.css";
import React, { useState } from "react";
import Axios from "axios";
import styled from 'styled-components';
import { makeStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Grid,
  Button,
  FormControl,
  Select,
  MenuItem,
  InputLabel,
  Tabs,
  Tab,
} from "@material-ui/core";

import AddIcon from "@material-ui/icons/Add";
import EditIcon from '@material-ui/icons/Edit';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  container: {
    maxHeight: 440,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 160,
    borderColor: "white",
    textColor:  "white",
    color: "white"
  },
  customTabRoot: {
    color: "#FFFFFF",
  },
  customTabIndicator: {
    backgroundColor: "#1DB954"
  },
  select: {
    color:"white",
    textAlign: "left"
    
  },
  InputLabel: {
    borderColor: "white",
    color:  "white",
    textColor: "white",
  },
  TableRow: {
    backgroundColor: "#201c1c"
  },
  TableCell: {
    color: "white"
  },
}));

const StyledInputLabel = styled(InputLabel)`
  .MuiInputLabel-root {
    color: white;
    border-color: white;
    text-color: white;
  }
  .Mui-focused {
    color: white;
    border-color: white;
    text-color: white;
  }
  .MuiInputLabel-formControl {
    color: white;
    border-color: white;
    text-color: white;
  }
  .MuiInputLabel-marginDense {
    color: white;
    border-color: white;
    text-color: white;
  }
  .MuiInputLabel-outlined {
    color: white;
    border-color: white;
    text-color: white;
  }
`;

const country_list = [
  { country: "Argentina" },
  { country: "Australia" },
  { country: "Austria" },
  { country: "Belgium" },
  { country: "Bolivia" },
  { country: "Brazil" },
  { country: "Bulgaria" },
  { country: "Canada" },
  { country: "Chile" },
  { country: "Columbia" },
  { country: "Costa Rica" },
  { country: "Czech Republic" },
  { country: "Denmark" },
  { country: "Dominican Republic" },
  { country: "Ecuador" },
  { country: "El Salvador" },
  { country: "Estonia" },
  { country: "France" },
  { country: "Germany" },
  { country: "Global" },
  { country: "Greece" },
  { country: "Guatemala" },
  { country: "Honduras" },
  { country: "Hong Kong" },
  { country: "Hungary" },
  { country: "Iceland" },
  { country: "India" },
  { country: "Indonesia" },
  { country: "Ireland" },
  { country: "Israel" },
  { country: "Japan" },
  { country: "Korea" },
  { country: "Latvia" },
  { country: "Malaysia" },
  { country: "Mexico" },
  { country: "Netherlands" },
  { country: "New Zealand" },
  { country: "Peru" },
  { country: "Poland" },
  { country: "Portugal" },
  { country: "Russia" },
  { country: "Singapore" },
  { country: "South Africa" },
  { country: "Spain" },
  { country: "Sweden" },
  { country: "Taiwan" },
  { country: "Turkey" },
  { country: "USA" },
  { country: "United Kingdom" },
  { country: "Uraguay" },
  { country: "Vietnam" },
];

function App() {
  const [searchCountry, setSearchCountry] = useState("");
  const [newSongCharts, setNewSongCharts] = useState([]);
  const [tab, setTab] = React.useState(0);
  const [myCharts, setMyCharts] = useState([]);
  const tabChange = (event, newValue) => {
    setTab(newValue);
  };

  const searchChart = (value) => {
    Axios.get("http://localhost:3002/api/get", {
      params: {
        search: value,
      },
    }).then((response) => {
      console.log(response.data);
      var i;
      for (i = 0; i < response.data.length; i++) {
        response.data[i].editMode = false;
        response.data[i].id = response.data[i].song_id.concat(
          response.data[i].artist_id
        );
      }
      setNewSongCharts(response.data);
    });
  };

  // For My Songs Retrieval
  const getMyCharts = () => {
    Axios.get("http://localhost:3002/api/retrieve").then((response) => {
      console.log(response.data);
      setMyCharts(response.data);
    });
  };

  const changeCountry = (event) => {
    setSearchCountry(event.target.value);
    searchChart(event.target.value);
  };

  const classes = useStyles();

  return (
    <Grid
      className="App"
      container
      direction="column"
      justify="center"
      alignItems="center"
      spacing={4}
    >
      <Grid item>
        <h1 style={{ color: 'white' }}> Spotify The World</h1>
      </Grid>
      <Grid item>
        <Tabs
          value={tab}
          onChange={tabChange}
          classes={{
            root: classes.customTabRoot,
            indicator: classes.customTabIndicator
          }}
        >
          <Tab label="Charts" />
          <Tab label="Personalized List" />
          <Tab label="Map View" />
        </Tabs>
      </Grid>
      {tab === 0 && (
        <Grid item>
          <FormControl variant="outlined" className={classes.formControl}>
            <StyledInputLabel className={classes.InputLabel}>Country</StyledInputLabel>
            <Select classes={{root: classes.select, select: classes.select, icon: classes.select}} onChange={changeCountry} value={searchCountry}>
              {country_list.map((val) => (
                <MenuItem value={val.country}>{val.country}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
      )}

      {tab === 0 && (
        <Grid item>
          <TableContainer className={classes.container} component={Paper}>
            <Table className={classes.container} aria-label="simple table">
              <TableHead>
                <TableRow className = {classes.TableRow}>
                  <TableCell align="center" className = {classes.TableCell}>Rank </TableCell>
                  <TableCell align="center"className = {classes.TableCell}> Song </TableCell>
                  <TableCell align="center"className = {classes.TableCell}> Artist </TableCell>
                  <TableCell align="center" className = {classes.TableCell}> Album </TableCell>
                  <TableCell align="center" className = {classes.TableCell}> Actions </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {newSongCharts.map((val) => (
                  <TableRow key={val.id} className = {classes.TableRow}>
                    <TableCell align="center" className = {classes.TableCell}> {val.chart_rank} </TableCell>
                    <TableCell align="center" className = {classes.TableCell}> {val.name} </TableCell>
                    <TableCell align="center" className = {classes.TableCell}> {val.artist_name} </TableCell>
                    <TableCell align="center" className = {classes.TableCell}> {val.album_name} </TableCell>
                    <TableCell align="center" className = {classes.TableCell}>
                      <AddIcon style={{ fill: "#1DB954" }} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      )}

      {tab === 1 && (
        <Grid item>
          <Button onClick={getMyCharts} variant="contained" color="primary">
            Refresh
          </Button>
        </Grid>
      )}

      {tab === 1 && (
        <Grid item>
          <TableContainer className={classes.container} >
            <Table className={classes.container} aria-label="simple table">
              <TableHead >
                <TableRow className = {classes.TableRow}>
                  <TableCell align="center" className = {classes.TableCell}> Song </TableCell>
                  <TableCell align="center" className = {classes.TableCell}> Artist </TableCell>
                  <TableCell align="center" className = {classes.TableCell}> Album </TableCell>
                  <TableCell align="center" className = {classes.TableCell}> Note </TableCell>
                  <TableCell align="center" className = {classes.TableCell}> Actions </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {myCharts.map((val) => (
                  <TableRow key={val.id} className = {classes.TableRow}>
                    <TableCell align="center" className = {classes.TableCell}> {val.name} </TableCell>
                    <TableCell align="center" className = {classes.TableCell}> {val.artist_name} </TableCell>
                    <TableCell align="center" className = {classes.TableCell}> {val.album_name} </TableCell>
                    <TableCell align="center" className = {classes.TableCell}> {val.note} </TableCell>
                    <TableCell align="center"className = {classes.TableCell}>
                      <EditIcon style={{ fill: "orange" }} />
                      <CloseIcon style={{ fill: "red" }} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      )}
    </Grid>
  );
}

export default App;
