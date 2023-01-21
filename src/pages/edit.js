import React, { useEffect } from 'react';
import { useQuery, useMutation, gql } from '@apollo/client';
import NoteForm from '../components/NoteForm';

import { GET_NOTE, GET_ME } from '../gql/query';
import { EDIT_NOTE } from '../gql/mutation';

const EditNote = props => {
  useEffect(() => {
    // Обновляем заголовок документа
    document.title = 'Edit - Notedly';
  });

  // Сохраняем id из url в виде переменной
  const id = props.match.params.id;

  // Запрашиваем хук, передавая значение Id  в качестве переменной
  const { loading, error, data } = useQuery(GET_NOTE, {
    variables: { id }
  });

  // Получить информацию о текущем пользователе
  const { data: userdata } = useQuery(GET_ME);
  // Определяем мутацию
  const [editNote] = useMutation(EDIT_NOTE, {
    variables: {
      id
    },
    onCompleted: () => {
      props.history.push(`/note/${id}`);
    }
  });

  // Если данные загружаются, отображаем сообщение о загрузке
  if (loading) return <p>Loading...</p>;
  // Если ошибка при получении данных, отобразить сообщение об ошибке
  if (error) return <p>Error! Note not found</p>;

  // Если текущий пользователь не соответствует автору заметки,
  // вернуть соответствующее сообщение
  if ((userdata && userdata.me.id) !== (data && data.note.author.id)) {
    return <p>You do not access to edit this note</p>;
  }

  // Передаем данные в компанент формы
  return <NoteForm content={data.note.content} action={editNote} />;
};

export default EditNote;
