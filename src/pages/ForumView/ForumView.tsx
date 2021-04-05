import React, { FC } from 'react';
import Layout from 'components/Layout';
import { t } from 'common/dictionary';
import { Button, Comment, Form, Label } from 'semantic-ui-react';

const ForumList: FC = () => {
  let question = {
    createdBy: 'Jack',
    date: '21.01.2020',
    name: 'Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века?',
    answers: [
      {
        date: '21.01.2010',
        text: 'How artistic!',
        createdBy: 'Matt',
        authorImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Donald_Trump_official_portrait.jpg/1200px-Donald_Trump_official_portrait.jpg',
      },
      {
        date: '21.01.2010',
        text: 'How artistic!',
        createdBy: 'Matt',
        authorImage: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Donald_Trump_official_portrait.jpg/1200px-Donald_Trump_official_portrait.jpg',
      },
    ],
  };

  return <Layout title={t('question')}>
    <h3>Lorem Ipsum - это текст-"рыба", часто используемый в печати и вэб-дизайне. Lorem Ipsum является стандартной "рыбой" для текстов на латинице с начала XVI века?</h3>
    <Label>{question.date}</Label> by {question.createdBy}
    <Comment.Group>
      {question.answers.map((item, key) => {
        return <Comment key={key}>
          <Comment.Avatar src={item.authorImage} />
          <Comment.Content>
            <Comment.Author as='a'>{item.createdBy}</Comment.Author>
            <Comment.Metadata>
              <div>{item.date}</div>
            </Comment.Metadata>
            <Comment.Text>{item.text}</Comment.Text>
          </Comment.Content>
        </Comment>
      })}

      <Form reply>
        <Form.TextArea />
        <Button content='Add Reply' labelPosition='left' icon='edit' primary />
      </Form>
    </Comment.Group>
  </Layout>;
};
export default ForumList;
