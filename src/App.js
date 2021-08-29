import React from "react";
import ReactDOM from "react-dom";
import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    HttpLink,
    ApolloLink
} from "@apollo/client";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { createUploadLink } from 'apollo-upload-client';
import { Home } from "./app/";

const App = () => {

    const httpLink = ApolloLink.split(
        (operation) => operation.getContext().hasUpload,
        createUploadLink({ uri: "http://localhost:3001/graphql" }),
        new HttpLink({ uri: "http://localhost:3001/graphql" }),
    );

    const client = new ApolloClient({
        uri: "http://localhost:3001/graphql",
        cache: new InMemoryCache(),
        link: httpLink
    });

    return (
        <ApolloProvider client={client}>
            <Router>
                <Switch>
                    <Route path="/">
                        <Home />
                    </Route>
                </Switch>
            </Router>
        </ApolloProvider>
    );
};

ReactDOM.render(
    <App />,
    document.getElementById('root')
);
