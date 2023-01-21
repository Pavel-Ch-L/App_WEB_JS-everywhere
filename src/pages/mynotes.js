import React, { useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';

import NoteFeed from '../components/NoteFeed';
import { GET_MY_NOTES } from '../gql/query';

const MyNotes = () => {
  useEffect(() => {
    // Обновляем заголовок документа
    document.title = 'My Notes - Notedly';
  });

  const { loading, error, data } = useQuery(GET_MY_NOTES);

  // Если данные загружаются, выводим сообщение о загрузке
  if (loading) return 'Loading...';
  // Если при получении данных произошел сбой, выводим сообщение об ошибке
  if (error) return `Error! ${error.message}`;
  // Если запрос успешен и содержит заметки, выводим их в ленту
  // Если запрос успешен,но заметок нет выводим сообщение 'No notes yet'
  if (data.me.notes.length !== 0) {
    return <NoteFeed notes={data.me.notes} />;
  } else {
    return <p>No notes yet</p>;
  }
};

export default MyNotes;
