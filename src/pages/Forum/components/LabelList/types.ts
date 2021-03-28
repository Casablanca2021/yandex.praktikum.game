export type Item = {
  name: string,
  path: string,
  active?: boolean
}

export type Items = Item[];

export type OwnProps = {
  items: Items
}