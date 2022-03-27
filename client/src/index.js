import React from "react";
import { render } from "react-dom";
import "./index.css";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import theme from "./theme";
import { ThemeProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  cache: new InMemoryCache(),
});

//  domain={process.env.REACT_APP_DOMAIN}
//       clientId={process.env.REACT_APP_CLIENTID}

render(
  <React.StrictMode>
    <Auth0Provider
      domain='dev-l6ustgtw.us.auth0.com'
      clientId='szS40NtDItA7Tuucto56y592detGEMwv'
      redirectUri={window.location.origin}
    >
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <BrowserRouter>
          <ApolloProvider client={client}>
            <App />
          </ApolloProvider>
        </BrowserRouter>
      </ThemeProvider>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
