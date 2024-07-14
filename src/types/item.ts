export interface Item {
    id: number;
    name: string;
    effect: string;
    sprite: string;
    cost: number;
  }
  
  export interface ItemCardProps {
    item: Item;
  }