import React, { FC } from 'react';
import Layout from 'components/Layout';
import { t } from 'common/dictionary';
import ForumList from 'components/ForumList';
import LabelList from 'pages/Forum/components/LabelList/LabelList';
import { Items as CategoryItems } from './components/LabelList/types';
import { Item as ForumItem } from 'components/ForumList/types';
import { useLocation, useParams } from 'react-router';

const Forum: FC = () => {
  const location = useLocation();
  const { category } = useParams<{category: string}>();

  let categories: CategoryItems = [
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

  categories.map((item) => {
    if (item.path === location.pathname) {
      item.active = true;
    }
  });

  let forumItems: (ForumItem & {categoryId?: string})[] = [
    {
      id: 1,
      name: 'Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться?',
      answersCount: 2,
      createdBy: 'Micheal',
      date: '24.01.2021',
      category: 'Cat 1',
      categoryId: 'cat-1'
    },
    {
      id: 2,
      name: 'Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться?',
      answersCount: 2,
      createdBy: 'Micheal',
      date: '24.01.2021',
      category: 'Cat 2',
      categoryId: 'cat-2'
    },
    {
      id: 3,
      name: 'Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться?',
      answersCount: 2,
      createdBy: 'Micheal',
      date: '24.01.2021',
      category: 'Cat 1',
      categoryId: 'cat-1'
    },
    {
      id: 4,
      name: 'Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться?',
      answersCount: 2,
      createdBy: 'Micheal',
      date: '24.01.2021',
      category: 'Cat 3',
      categoryId: 'cat-3'
    },
  ];

  if (category) {
    forumItems = forumItems.filter((item) => category === item.categoryId)
  }

  return (
    <Layout title={t('forumTitle')}>
      {t('categories')}:
      <LabelList items={categories} />
      <ForumList items={forumItems} />
    </Layout>
  );

};

export default Forum;