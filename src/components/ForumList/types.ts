export type Item = {
  id: number,
  name: string,
  answersCount: number,
  createdBy: string,
  date: string,
  category: string,
};

export type Items = Item[];

export type OwnProps = {
  items: Items
}