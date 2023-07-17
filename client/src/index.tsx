import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import 'styles/tailwind.css';
import App from 'app';
import reportWebVitals from 'reportWebVitals';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { ProjectProvider } from 'context/project/project.context';
import { AuthProvider } from 'context/auth/auth.context';

const client = new ApolloClient({
	uri: process.env.REACT_APP_SERVER_URL,
	cache: new InMemoryCache()
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
