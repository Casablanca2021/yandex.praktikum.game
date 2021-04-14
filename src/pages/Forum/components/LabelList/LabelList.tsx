import './LabelList.css';

import { OwnProps } from 'pages/Forum/components/LabelList/types';
import React, { FC } from 'react';
import { Link } from 'react-router-dom';

const LabelList: FC<OwnProps> = ({ items }: OwnProps) => (
  <div className="label-list">
    {items.map((item, key) => (
      <Link to={item.path} key={key} className={`label-list__item ${item.active ? 'label-list__item_active' : ''}`}>
        {item.name}
      </Link>
    ))}
  </div>
);

export default LabelList;
