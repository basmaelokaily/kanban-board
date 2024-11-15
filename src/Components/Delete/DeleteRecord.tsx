import { listData } from "../../lib/dummydata";
import { SavetoLS } from "../Save/SavetoLS";

export const DeleteRecord = (id: number): void => {
    const index = listData.findIndex((item) => item.id === id);
    if (index !== -1) {
        listData.splice(index, 1); // Remove the item with the given id
    }
    SavetoLS(listData);
};