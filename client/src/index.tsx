import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'styles/tailwind.css';
import App from 'app';
import reportWebVitals from 'reportWebVitals';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { ProjectProvider } from 'context/project/project.context';
import { AuthProvider } from 'context/auth/auth.context';

const authLink = setContext((_, { headers }) => {
	return {
		headers: {
			...headers,
			authorization: localStorage.getItem('cookies') || ''
		}
	};
});

const httpLink = createHttpLink({
	uri: process.env.REACT_APP_SERVER_URL || '/graphql',
	credentials: 'include',
	fetchOptions: {
		mode: 'no-cors'
	}
});

const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: authLink.concat(httpLink)
});

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
	<React.StrictMode>
		<ApolloProvider client={client}>
			<BrowserRouter>
				<AuthProvider>
					<ProjectProvider>
						<App />
					</ProjectProvider>
				</AuthProvider>
			</BrowserRouter>
		</ApolloProvider>
	</React.StrictMode>
);

reportWebVitals();
