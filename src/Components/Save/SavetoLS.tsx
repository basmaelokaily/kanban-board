// interface Item {
//     id: number;
//     title: string;
//     name: string;
//     age: number;
//     email: string;
//     phone: string;
//     category: string;
//   }
import {Item} from '../../Components/interface/Interface.tsx';

export const SavetoLS = (listData: Item[]) => {
    // Convert the listData array into a JSON string
    localStorage.setItem('listData', JSON.stringify(listData));
}