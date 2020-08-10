import React from 'react';
import { gql, useQuery } from '@apollo/client';
import {
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  makeStyles,
} from '@material-ui/core';

const GET_COUNTRY = gql`
  query country($input: ID!) {
    country(code: $input) {
      name
      code
      continent {
        name
      }
      capital
      currency
      languages {
        name
      }
    }
  }
`;

const useStyles = makeStyles((theme) => ({
  list: {
    backgroundColor: theme.palette.background.paper,
    maxWidth: 300,
    margin: '0 auto',
  },
}));

function CountryInfo({ code }) {
  const { loading, error, data } = useQuery(GET_COUNTRY, {
    variables: { input: code },
  });
  const classes = useStyles();

  if (loading) return <CircularProgress />;
  if (error) return `Error: ${error.message}`;

  return (
    <>
      <img
        src={`https://www.countryflags.io/${data.country.code}/flat/64.png`}
        alt={`the flag of ${data.country.name}`}
      ></img>
      <h2>{data.country.name}</h2>
      <p>
        {data.country.name} is a country located in{' '}
        {data.country.continent.name}.
      </p>
      {data.country.capital && (
        <p>
          The capital of {data.country.name} is {data.country.capital}.
        </p>
      )}
      {data.country.languages.length === 0 ? null : (
        <>
          <h3>Languages spoken</h3>
          <div className={classes.list}>
            <List dense={true}>
              {data.country.languages.map((lang) => (
                <ListItem key={lang.name}>
                  <ListItemText
                    style={{ textAlign: 'center' }}
                    primary={lang.name}
                  />
                </ListItem>
              ))}
            </List>
          </div>
        </>
      )}
      {data.country.currrency && (
        <p style={{ padding: '0 20px' }}>
          if you want to go shopping, <i>make sure</i> you have some{' '}
          <b>{data.country.currency}</b> on you. That is the widely used
          currency.
        </p>
      )}
    </>
  );
}

export default CountryInfo;
