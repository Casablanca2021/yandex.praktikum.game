import React, { FC } from 'react';
import { OwnProps } from 'pages/Forum/components/LabelList/types';
import './LabelList.css';
import { Link } from 'react-router-dom';

const LabelList: FC<OwnProps> = (props) => {
  return (
    <div className="label-list">
      {/* eslint-disable-next-line react/destructuring-assignment */}
      {props.items.map((item, key) => <Link to={item.path} key={key} className={`label-list__item ${item.active ? 'label-list__item_active' : ''}`}>{item.name}</Link>)}
    </div>
  );
};

export default LabelList;
