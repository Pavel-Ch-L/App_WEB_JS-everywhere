import React, { useEffect } from 'react';
import { useQuery } from '@apollo/client';

import NoteFeed from '../components/NoteFeed';
import { GET_MY_FAVORITES } from '../gql/query';

const Favorites = () => {
  useEffect(() => {
    // Обновляем заголовок документа
    document.title = 'Favorites - Notedly';
  });

  const { loading, error, data } = useQuery(GET_MY_FAVORITES);

  // Если данные загружаются, выводим сообщение о загрузке
  if (loading) return 'Loading...';
  // Если при получении данных произошел сбой, выводим сообщение об ошибке
  if (error) return `Error! ${error.message}`;
  // Если запрос успешен и содержит заметки, выводим их в ленту
  // Если запрос успешен,но заметок нет выводим сообщение 'No favorites yet'
  if (data.me.favorites.length !== 0) {
    return <NoteFeed notes={data.me.favorites} />;
  } else {
    return <p>No favorites yet</p>;
  }
};

export default Favorites;
