// Append.ts
import { listData } from '../../lib/dummydata.js';
import { SavetoLS } from '../Save/SavetoLS.js';
import {Item} from '../../Components/interface/Interface.tsx';


// interface Item {
//   id: number;
//   title: string;
//   name: string;
//   age: number;
//   email: string;
//   phone: string;
//   category: string;
// }

export const appendItem = (values: Omit<Item, 'id'| 'category'>): void => {
  const newItem: Item = {
    id: Math.max(...listData.map(item => item.id)) + 1, // Generate a new id based on max(id)
    ...values,
    category: "unclaimed" // Default category
  };

  listData.push(newItem); // This works as long as listData is mutable

  SavetoLS(listData);
  
};
