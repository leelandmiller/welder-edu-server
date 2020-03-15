/* global API_URL ENV */
import '@babel/polyfill';
import smoothscroll from 'smoothscroll-polyfill';
import raf from 'raf';
import React from 'react';
import { hydrate, render } from 'react-dom';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from 'material-ui-pickers';

import { ThemeProvider as MuiThemeProvider } from '@material-ui/core/styles'
import { createMuiTheme } from '@material-ui/core/styles';
import cssVars from '!!sass-variable-loader!./stylesheets/utils/_variables.scss';

import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink } from 'apollo-link';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
// import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import ErrorBoundary from './components/ErrorBoundary';
// import PopupProvider from './components/hoc/PopupProvider.jsx';
import './stylesheets/main.scss';
import { lightTheme } from './theme';
import Routes from './routes';

raf(function tick() {
  // Animation logic
  raf(tick);
});

smoothscroll.polyfill();

// const client = new ApolloClient({
//   link: new HttpLink(),
//   cache: new InMemoryCache(),
//   dataIdFromObject: o => o.id
// });

// old httpLink to graphql server
// const httpLink = createHttpLink({
//   uri: 'http://localhost:3001/graphql'
// });

const link = createUploadLink({
  uri: `${API_URL}/graphql`,
  credentials: 'include'
});

/** sets the context of the request */
const authLink = setContext((_, { headers }) => {
  // get auth token from localStorage if it exists
  const token = localStorage.getItem('token');
  // return headers to context so httpLink can read
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  };
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );
  }

  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

const client = new ApolloClient({
  // link: authLink.concat(link),
  link: ApolloLink.from([
    authLink,
    errorLink,
    link
  ]),
  cache: new InMemoryCache({
    dataIdFromObject: o => o.id
  })
});

// Apollo Boost
// const client = new ApolloClient({
//   uri: 'http://localhost:3001/graphql'
// });

// const generateClassName = createGenerateClassName({
//   dangerouslyUseGlobalCSS: true,
//   productionPrefix: 'c',
// });

const muiTheme = createMuiTheme({
  palette: {
    text: { primary: cssVars.black, secondary: cssVars.black },
    primary: { main: cssVars.primaryClr },
    secondary: { main: cssVars.secondaryClr },
  },
  typography: {
    useNextVariants: true,
    headline: {
      fontSize: 36, fontWeight: 700, color: cssVars.darkTextClr
    },
    title: {
      fontSize: 24, fontWeight: 700, color: cssVars.darkTextClr
    },
    subheading: {
      fontSize: 16, fontWeight: 300, color: cssVars.darkTextClr
    },
    body2: {
      fontSize: 16, fontWeight: 300, color: cssVars.darkTextClr
    },
    body1: {
      fontSize: 16, fontWeight: 300, color: cssVars.grey
    }
  },
  appBar: {
    height: 72,
  },
  overrides: {
    MuiInput: {
      underline: {
        '&:after': {
          backgroundColor: cssVars.primaryClr
        }
      }
    },
    MuiButton: {
      root: {
        // borderRadius: '24px'
      }
    }
  }
});

const Root = () => {
  return (
    <ErrorBoundary>
      <ApolloProvider client={client}>
        <MuiThemeProvider theme={lightTheme}>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <Routes/>
          </MuiPickersUtilsProvider>
        </MuiThemeProvider>
      </ApolloProvider>
    </ErrorBoundary>
  );
};

const rootElement = document.getElementById('root');
if (rootElement.hasChildNodes()) {
  hydrate(<Root/>, rootElement);
} else {
  render(<Root/>, rootElement);
}

// ReactDOM.render(
//   <Root/>,
//   document.getElementById('root')
// );
