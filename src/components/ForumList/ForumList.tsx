import React, { FC } from 'react';
import { Table } from 'semantic-ui-react';
import {t} from 'common/dictionary';
import { OwnProps } from './types';
import { Link } from 'react-router-dom';
import { ROUTES } from 'common/consts';

const ForumList: FC<OwnProps> = (props) => {
  return <Table celled>
    <Table.Header>
      <Table.Row>
        <Table.HeaderCell>{t('question')}</Table.HeaderCell>
        <Table.HeaderCell/>
        <Table.HeaderCell/>
      </Table.Row>
    </Table.Header>

    <Table.Body>
      {props.items.map((item, key) => {

        return <Table.Row key = {key}>
          <Table.Cell><Link to={ROUTES.FORUM_VIEW.replace(':id', item.id.toString())}>{item.name}</Link></Table.Cell>
          <Table.Cell>{item.answersCount} answers</Table.Cell>
          <Table.Cell> <strong>{item.category}</strong> <br/> by <strong>{item.createdBy}</strong> <br/> {item.date} </Table.Cell>
        </Table.Row>;
      })}
    </Table.Body>
  </Table>
};
export default ForumList;
