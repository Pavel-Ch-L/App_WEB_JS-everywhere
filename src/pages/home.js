import React, { useEffect } from 'react';
// Импорт библиотеки useQuery и синтаксис gql
import { useQuery, gql } from '@apollo/client';
import { GET_NOTES } from '../gql/query';
import NoteFeed from '../components/NoteFeed';
import Button from '../../solutions/03-GraphQL-Query/components/Button';

const Home = () => {
  useEffect(() => {
    // Обновляем заголовок документа
    document.title = 'Home - Notedly';
  });

  // Хук запроса
  const { data, loading, error, fetchMore } = useQuery(GET_NOTES);

  // Если данные загружаются, отображать сообщение о загрузке
  if (loading) {
    return <p>Loading...</p>;
  }

  // Если при получении данных произошел сбой, отобразить сообщение об ошибке
  if (error) {
    return <p>Error!</p>;
  }

  // Если получение данных прошло успешно, отображаем их в UI
  // React требует присвоение каждому результату уникального ключа
  return (
    <React.Fragment>
      <NoteFeed notes={data.noteFeed.notes} />
      {/* Показывать кнопку подгрузки если hasNextPage = true */}
      {data.noteFeed.hasNextPage && (
        // onClick выполняет запрос, передавая в качестве переменной текущий курсор
        <Button
          onClick={() =>
            fetchMore({
              variables: {
                cursor: data.noteFeed.cursor
              },
              updateQuery: (previousResult, { fetchMoreResult }) => {
                return {
                  noteFeed: {
                    cursor: fetchMoreResult.noteFeed.cursor,
                    hasNextPage: fetchMoreResult.noteFeed.hasNextPage,
                    // Совмещаем новые результаты со старыми
                    notes: [
                      ...previousResult.noteFeed.notes,
                      ...fetchMoreResult.noteFeed.notes
                    ],
                    _typename: 'notefeed'
                  }
                };
              }
            })
          }
        >
          Load more
        </Button>
      )}
    </React.Fragment>
  );
};

//#region Предыдущие версии

/* стр 143

  import Button from '../components/Button'; 

  useEffect(() => {
    // Обновляем заголовок документа
    document.title = 'Notedly';
  });
  return (
    <div>
      <p>This is the home page</p>
      <Button>Click me</Button>
    </div>
  );

*/

/* стр 159

  import ReactMarkdown from 'react-markdown';

  <div>
    {data.noteFeed.notes.map(note => (
      <article key={note.id}>
        <img
          src={note.author.avatar}
          alt={`${note.author.username} avatar`}
          height="50px"
        />{' '}
        {note.author.username} {note.createdAt} {note.favoriteCount}{' '}
        <ReactMarkdown source={note.content} />
      </article>
    ))}
  </div>
*/

//#endregion

export default Home;
