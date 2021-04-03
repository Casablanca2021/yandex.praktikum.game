import React, { FC } from 'react';
import Layout from 'components/Layout';
import { t } from 'common/dictionary';
import ForumList from 'components/ForumList';
import LabelList from 'pages/Forum/components/LabelList/LabelList';
import { useLocation, useParams } from 'react-router';
import { Items as CategoryItems } from './components/LabelList/types';
import { ForumItems } from './types';

const forumItems: ForumItems = [
  {
    id: 1,
    name: 'Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться?',
    answersCount: 2,
    createdBy: 'Micheal',
    date: '24.01.2021',
    category: 'Cat 1',
    categoryId: 'cat-1',
  },
  {
    id: 2,
    name: 'Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться?',
    answersCount: 2,
    createdBy: 'Micheal',
    date: '24.01.2021',
    category: 'Cat 2',
    categoryId: 'cat-2',
  },
  {
    id: 3,
    name: 'Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться?',
    answersCount: 2,
    createdBy: 'Micheal',
    date: '24.01.2021',
    category: 'Cat 1',
    categoryId: 'cat-1',
  },
  {
    id: 4,
    name: 'Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться?',
    answersCount: 2,
    createdBy: 'Micheal',
    date: '24.01.2021',
    category: 'Cat 3',
    categoryId: 'cat-3',
  },
];
let activeItems: ForumItems = [];

const categories: CategoryItems = [
  {
    name: 'Cat 1',
    path: '/forum/category/cat-1',
  },
  {
    name: 'Cat 2',
    path: '/forum/category/cat-2',
  },
  {
    name: 'Cat 3',
    path: '/forum/category/cat-3'
  },
];

const Forum: FC = () => {
  const location = useLocation();
  const { category } = useParams<{category: string}>();

  for (let categoryItem of categories) {
    categoryItem.active = categoryItem.path === location.pathname;
  }

  if (category) {
    activeItems = forumItems.filter((item) => category === item.categoryId)
  } else {
    activeItems = forumItems;
  }

  return (
    <Layout title={t('forumTitle')}>
      {t('categories') + ':'}
      <LabelList items={categories} />
      <ForumList items={activeItems} />
    </Layout>
  );
};

export default Forum;
