import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { TOGGLE_FAVORITE } from '../gql/mutation';
import { GET_MY_FAVORITES } from '../gql/query';

import ButtonAsLink from './ButtonAsLink';

const FavoriteNote = props => {
  // Сохраняет число избранных заметок пользователя как состояние
  const [count, setCount] = useState(props.favoriteCount);
  // Если пользователь отметил заметку как избранную, сохранить как состояние
  const [favorited, setFavorited] = useState(
    // Проверить присутствует-ли заметка в списке избранных
    props.me.favorites.filter(note => note.id === props.noteId).length > 0
  );
  // Хук мутации toggleFavorite
  const [toggleFavorite] = useMutation(TOGGLE_FAVORITE, {
    variables: {
      id: props.noteId
    },
    // Повторно получаем запрос GET_MY_Favorites для обновления кэша
    refetchQueries: [{ query: GET_MY_FAVORITES }]
  });
  // Если пользователь добавил заметку в избранное, отобразить вариант ее удаления из списка.
  // В противном случае отобразить вариант ее добавления
  return (
    <React.Fragment>
      {favorited ? (
        <ButtonAsLink
          onClick={() => {
            toggleFavorite();
            setFavorited(false);
            setCount(count - 1);
          }}
        >
          Remove Favorite
        </ButtonAsLink>
      ) : (
        <ButtonAsLink
          onClick={() => {
            toggleFavorite();
            setFavorited(true);
            setCount(count + 1);
          }}
        >
          Add Favorite
        </ButtonAsLink>
      )}
    </React.Fragment>
  );
};

export default FavoriteNote;
