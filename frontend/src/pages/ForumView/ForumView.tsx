import { t } from 'common/dictionary';
import { useAuth } from 'common/hooks/authHook';
import Layout from 'components/Layout';
import React, { FC, useEffect, useState } from 'react';
import { Button, Comment, Form, Header, Label } from 'semantic-ui-react';
import { useDispatch, useSelector } from 'react-redux';
import { getForumTopicsSelector } from 'store/selectors';
import { getForumTopic } from 'store/actions/forumTopic';
import { useHistory, useParams } from 'react-router';
import { FieldChangeEvent } from 'common/types';
import { validateName } from 'utils';
import { useStringField } from 'common/hooks/formHooks';
import { ForumErrors } from './types';
import some from 'lodash/some';
import { Forum as ForumAPI } from 'api/forum';

const ForumList: FC = () => {
  useAuth();

  const history = useHistory();
  const dispatch = useDispatch();
  const topics = useSelector(getForumTopicsSelector);
  const { id } = useParams<{ id: string }>();
  const [isSend, setIsSend] = useState(false);
  const [errors, setErrors] = useState<Partial<ForumErrors>>({});
  const [comment, handleChangeComment, setComment] = useStringField('');

  const [errorsReply, setErrorsReply] = useState<Partial<ForumErrors>>({});
  const [commentReply, handleChangeCommentReply, setCommentReply] = useStringField('');

  const [replyCommentId, setReplyCommentId] = useState<number|null>(null);

  const handleBlurComment = (event: FieldChangeEvent): void => {
    const { name, value } = event.target;

    setErrors((prevState) => ({
      ...prevState,
      [name]: validateName(value),
    }));
  };

  const handleBlurCommentReply = (event: FieldChangeEvent): void => {
    const { name, value } = event.target;

    setErrorsReply((prevState) => ({
      ...prevState,
      [name]: validateName(value),
    }));
  };

  useEffect(() => {
    dispatch(getForumTopic());
  }, [isSend, replyCommentId]);

  const handleSubmit = (): void => {
    if (!!comment && !some(errors, Boolean)) {
      ForumAPI.createComment({ topic_id: id, comment }).then(() => {
        setReplyCommentId(null);
        setComment('');
        setIsSend(true);
      });
    }
  };

  const handleSubmitReply = (commentId: number): void => {
    if (!!commentReply && !some(errorsReply, Boolean)) {
      ForumAPI.createComment({ topic_id: id, comment: commentReply, commentId }).then(() => {
        setReplyCommentId(null);
        setCommentReply('');
      });
    }
  };

  const topic = topics.filter(topic => topic.id.toString() === id)[0];

  if (typeof topic === 'undefined') {
    return <Layout title={t('question')}><div>Topic not found!</div></Layout>
  }

  const topicCommentsOnlyParents = topic.comments.filter(item => item.commentId === null).sort(function(a, b) {
    return a.id - b.id;
  }).reverse();

  if (!topics.length) {
    return <Layout title={t('question')}><div>Loading...</div></Layout>
  }

  const showReplyForm = (id: number) => {
    setReplyCommentId(id);
  }

  const findReplies = (itemId: number) => {
    return topic.comments.filter(item => item.commentId === itemId).sort(function(a, b) {
      return a.id - b.id;
    });
  }

  const renderCommentRecursive = (item, spaceLeft = 0) => {
    return <>
      <Comment key={item.id} style={{marginLeft: spaceLeft}}>
        <Comment.Content>
          <Comment.Author as="a">{item.user}</Comment.Author>
          <Comment.Text>{item.comment}</Comment.Text>
          <Comment.Actions>
            <Comment.Action onClick={_ => showReplyForm(item.id)}>Reply</Comment.Action>
            {replyCommentId === item.id && (
              <Form reply onSubmit={() => handleSubmitReply(item.id)}>
                <Form.TextArea
                  name="comment"
                  value={commentReply}
                  type="text"
                  onChange={handleChangeCommentReply}
                  style={{ minHeight: 120 }}
                  onBlur={handleBlurCommentReply}
                  error={errorsReply.comment}
                />
                <Form.Input type={'hidden'} value={item.id} name={'commentId'} />
                <Button
                  type="submit"
                  content='Add Reply'
                  labelPosition='left'
                  icon='edit'
                  primary
                />
              </Form>
            )}
          </Comment.Actions>
        </Comment.Content>
      </Comment>
      {findReplies(item.id).map(item => renderCommentRecursive(item, spaceLeft + 20))}
    </>
  }

  return (
    <Layout title={t('question')}>
      <Button onClick={() => history.goBack()} secondary>{t('back')}</Button>
      <h3>
        {topic.title}
      </h3>
      <p>
        {topic.description}
      </p>
      <Label>by {topic.user}</Label>
      <hr/>

      <div style={{marginTop: '26px'}}><h3>Comments:</h3></div>
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
      <hr/>

      <Comment.Group>
        {topicCommentsOnlyParents.map(item => renderCommentRecursive(item))}
      </Comment.Group>
    </Layout>
  );
};
export default ForumList;
