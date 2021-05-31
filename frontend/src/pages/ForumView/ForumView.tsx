import { t } from 'common/dictionary';
import { useAuth } from 'common/hooks/authHook';
import Layout from 'components/Layout';
import React, { FC, useEffect, useState } from 'react';
import { Button, Comment, Form, Header, Label } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { getForumTopicsSelector } from 'store/selectors';
import { getForumTopic } from 'store/actions/forumTopic';
import { useParams } from 'react-router';
import { FieldChangeEvent } from 'common/types';
import { validateName } from 'utils';
import { useStringField } from 'common/hooks/formHooks';
import { ForumErrors } from './types';
import some from 'lodash/some';
import { Forum as ForumAPI } from 'api/forum';

const ForumList: FC = () => {
  useAuth();
  const dispatch = useDispatch();
  const topics = useSelector(getForumTopicsSelector);
  const { id } = useParams<{ id: string }>();

  const [isSend, setIsSend] = useState(false);
  const [errors, setErrors] = useState<Partial<ForumErrors>>({});

  const [comment, handleChangeComment] = useStringField('');
  const handleBlurComment = (event: FieldChangeEvent): void => {
    const { name, value } = event.target;

    setErrors((prevState) => ({
      ...prevState,
      [name]: validateName(value),

    }));
  };

  useEffect(() => {
    dispatch(getForumTopic());
  }, [isSend]);

  const handleSubmit = (): void => {
    if (!!comment && !some(errors, Boolean)) {
      ForumAPI.createComment({ topic_id: id, comment }).then(() => setIsSend(true));
    }
  };


  if (!topics.length) {
    return <Layout title={t('question')}><div>Loading...</div></Layout>
  }

  const topic = topics.filter(topic => topic.id.toString() === id)[0];

  if (typeof topic === 'undefined') {
    return <Layout title={t('question')}><div>Topic not found!</div></Layout>
  }

  return (
    <Layout title={t('question')}>
      <h3>
        {topic.title}
      </h3>
      <p>
        {topic.description}
      </p>
      <Label>by {topic.user}</Label>

      <div style={{marginTop: '26px'}}><h3>Comments:</h3></div>

      <Comment.Group>
        {topic.comments.map((item) => (
          <Comment key={item.id}>
            <Comment.Content>
              <Comment.Author as="a">{item.user}</Comment.Author>
              <Comment.Text>{item.comment}</Comment.Text>
            </Comment.Content>
          </Comment>
        ))}


        {!isSend ? (<Form onSubmit={handleSubmit}>
          <Form.TextArea
            name="comment"
            value={comment}
            type="text"
            onChange={handleChangeComment}
            style={{ minHeight: 120 }}
            onBlur={handleBlurComment}
            error={errors.comment}
          />
          <Button content="Add Reply" type="submit" labelPosition="left" icon="edit" primary />
        </Form>) : (
          <Header as="h1" textAlign="center">
            {t('success')}
          </Header>
        )}
      </Comment.Group>
    </Layout>
  );
};
export default ForumList;
