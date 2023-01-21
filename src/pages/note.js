import React from 'react';
import { useQuery, gql } from '@apollo/client';
import Note from '../components/Note';

// Запрос note, принимающий переменную ID
const GET_NOTE = gql`
  query note($id: ID!) {
    note(id: $id) {
      id
      createdAt
      content
      favoriteCount
      author {
        username
        id
        avatar
      }
    }
  }
`;

const NotePage = props => {
  // Сохраняем id из url в виде переменной
  const id = props.match.params.id;

  // Запрашиваем хук, передавая значение Id  в качестве переменной
  const { loading, error, data } = useQuery(GET_NOTE, { variables: { id } });

  // Если данные загружаются, отображаем сообщение о загрузке
  if (loading) return <p>Loading...</p>;
  // Если ошибка при получении данных, отобразить сообщение об ошибке
  if (error) return <p>Error! Note not found</p>;

  // Если загрузка данных успешна, отобразить в UI
  return <Note note={data.note} />;
};

//#region стр 164
/* 
    return (
      <div>
        <p>ID: {props.match.params.id}</p>
      </div>
    );
  */
//#endregion

export default NotePage;
