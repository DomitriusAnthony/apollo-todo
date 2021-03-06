import React from 'react';
import ReactDOM from 'react-dom';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { withClientState } from 'apollo-link-state';
import { ApolloLink } from 'apollo-link';
import { ApolloProvider } from 'react-apollo';
import defaults from './apollo/defaults';
import resolvers from './apollo/resolvers';

import App from './App';


const cache = new InMemoryCache();

const typeDefs = `
    type Todo {
        id: Int!
        text: String!
        isCompleted: Boolean
    }

    type Mutation {
        addTodo(text: String!): Todo
        toggleTodo(id: Int!): Todo
    }

    type Query {
        todos: [Todo]
    }
`

const stateLink = withClientState({
    cache,
    defaults,
    resolvers,
    typeDefs
})

const client = new ApolloClient({
    cache,
    link: ApolloLink.from([
        stateLink
    ])
})

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>, 
    document.getElementById('root')
);

