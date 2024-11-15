import { listData } from '../../lib/dummydata.js';
import { SavetoLS } from '../Save/SavetoLS.js';
import {Item} from '../../Components/interface/Interface.tsx';

export const EditRecord = (value: Item) =>  {
    const index = listData.findIndex((item) => item.id === value.id);
    if (index !== -1) {
      // Update the item at the found index
      listData[index] = { ...listData[index], ...value };
  
      // Save updated data to localStorage (optional)
      SavetoLS(listData); // Replace this with your localStorage save logic
    }
  };

