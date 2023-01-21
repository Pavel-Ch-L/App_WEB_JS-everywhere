import React from 'react';
import ReactDom from 'react-dom';

// Импортируем библиотеки Apollo Client
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink
} from '@apollo/client';

// Импортируем глобальные стили
import GlobalStyle from './components/GlobalStyle';

// Импортируем маршруты
import Pages from './pages';

// Настраиваем API URI и кэш
const uri = process.env.API_URI;
const cache = new InMemoryCache();

// Настраиваем прикрепление заголовков к запросам
import { setContext } from 'apollo-link-context';
const httpLink = createHttpLink({ uri });

// Проверям наличие токена и возвращаем заголовок в контекст
const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      ...headers,
      authorization: localStorage.getItem('token') || ''
    }
  };
});

// Настраиваем Apollo Client
const client = new ApolloClient({
  /* uri, */
  link: authLink.concat(httpLink),
  resolvers: {},
  cache,
  connectToDevTools: true
});

// Проверяем наличие локального токена
const data = {
  isLoggedIn: !!localStorage.getItem('token')
};
// Зписываем данные кэша при начальной загрузке
cache.writeData({ data });
// Теперь можно обращаться isLoggedIn в виде GraphQL запроса
// в любом месте приложения

// Записываем данные кэша после его сброса
client.onResetStore(() => cache.writeData({ data }));

const App = () => (
  <ApolloProvider client={client}>
    <GlobalStyle />
    <Pages />
  </ApolloProvider>
);

ReactDom.render(<App />, document.getElementById('root'));
