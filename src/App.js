import React, { useState } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import {
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  makeStyles,
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core';
import { gql, useQuery } from '@apollo/client';

import Header from './components/Header';
import CountryInfo from './components/CountryInfo';
import Footer from './components/Footer';
import './App.css';

const GET_COUNTRIES = gql`
  query countries {
    countries {
      name
      code
    }
  }
`;

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(5),
    minWidth: 250,
    textAlign: 'left',
  },
}));

function App() {
  const [selectedCountry, setSelectedCountry] = useState('');
  const { data } = useQuery(GET_COUNTRIES);
  const classes = useStyles(darkTheme);

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <Header />
        <div className="App">
          <FormControl className={classes.formControl}>
            <InputLabel id="label">Please select a country</InputLabel>
            <Select
              labelId="label"
              id="select"
              value={selectedCountry}
              label="country"
              onChange={(e) => setSelectedCountry(e.target.value)}
            >
              {data &&
                data.countries.map((country) => (
                  <MenuItem dense key={country.code} value={country.code}>
                    {country.name}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <div>
            {selectedCountry && <CountryInfo code={selectedCountry} />}{' '}
          </div>
        </div>
        <Footer />
      </ThemeProvider>
    </>
  );
}

export default App;
