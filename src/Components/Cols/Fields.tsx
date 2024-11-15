import React, { useEffect, useState } from 'react'
// import { listData } from '../../lib/dummydata'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import EditpuModal from '../popup/EditpuModal';
import { Item } from '../interface/Interface.tsx';
import { listData } from '../../lib/dummydata.tsx';
import "./Fields.css";

function Fields() {
    // const [listData, setListData] = useState<Item[]>([]);

    // useEffect(() => {
    //     // Retrieve and parse the data from localStorage
    //     const storedData = localStorage.getItem('listData');
    //     if (storedData) {
    //         setListData(JSON.parse(storedData)); // Set state with the parsed data
    //     }
    // }, [listData]);

    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    const [selectedItem, setSelectedItem] = useState<Item | null>(null);  // State to store the selected item

    const handleOpen = (item: Item) => {
        setSelectedItem(item);  // Set the selected item when the item is clicked
        setOpen(true);  // Open the modal
    };

    const filterAccordingtoCol = (col_name: string) => {
        let count = 0; // Declare counter here

        // Filter listData and return JSX for each matching item
        const filteredItems = listData.map((item) => {
            if (item.category === col_name) {
                count++; // Increment the counter when item matches
                return (
                    <div className="ps-2 bg-white border-2 border-white mt-2 rounded-lg" key={item.id} onClick={() => handleOpen(item)}>
                        <div className="flex flex-row justify-between items-center">
                            <b>{`${item.title} ${item.name}`}</b>
                            {/* <button className='pe-2'>      
                                <FontAwesomeIcon icon={faBars} />
                            </button> */}
                            <p className='text-gray-500 pe-2'>{item.age}</p>
                        </div>
                        <h3>{item.email}</h3>
                    </div>
                );
            }
            return null; // Return null if the condition is not met
        });
        // Optionally, you can return the counter if you want to display it somewhere else.
        // You can store it in a state or pass it as a prop depending on your use case.

        return filteredItems; // Return the filtered JSX items
    }

    const setCount = () => {
        const counter = [0, 0, 0, 0];
        listData.forEach((item) => {
            switch (item.category) {
                case 'unclaimed':
                    counter[0]++;
                    break;
                case 'first contact':
                    counter[1]++;
                    break;
                case 'preparing work offer':
                    counter[2]++;
                    break;
                case 'send to therapist':
                    counter[3]++;
                    break;
                default:
                    break;
            }
        });
        return counter;
    };

    const [counter, setCounter] = useState<number[]>([0, 0, 0, 0]);

    useEffect(() => {
        const newCounter = setCount(); // Compute counts
        setCounter(newCounter); // Update state
    }, [listData]); // Re-run whenever `listData` changes



    return (
        <div>
            <div className="">
                <div className="grid grid-cols-4 gap-2"> {/* Set height here */}
                    <div className="bg-skyblue_deep border-2 border-white mt-2 p-4 rounded-lg" style={{ height: "500px" }}>
                        <div className="flex flex-row justify-between items-center">
                            <b>Unclaimed</b>
                            <p className="px-2 text-right bg-white rounded-3xl">{counter[0]}</p>
                        </div>

                        <div className="scrollable-container flex-grow overflow-y-auto" style={{ maxHeight: "calc(100% - 60px)" }}>
                            {filterAccordingtoCol('unclaimed')}
                        </div>
                    </div>


                    <div className="bg-skyblue_deep border-2 border-white mt-2 p-4 rounded-lg " style={{ height: "500px" }}>
                        <div className="flex flex-row justify-between items-center">
                            <b>First Contact</b>
                            <p className="px-2 text-right bg-white rounded-3xl">{counter[1]}</p>
                        </div>
                        <div className="scrollable-container flex-grow overflow-y-auto" style={{ maxHeight: "calc(100% - 60px)" }}>
                            {filterAccordingtoCol('first contact')}                     
                        </div>
                    </div>
                    <div className="bg-skyblue_deep border-2 border-white mt-2 p-4 rounded-lg " style={{ height: "500px" }}>
                        <div className="flex flex-row justify-between items-center">
                            <b>Preparing Work Offer</b>
                            <p className="px-2 text-right bg-white rounded-3xl">{counter[2]}</p>
                        </div>
                        <div className="scrollable-container flex-grow overflow-y-auto" style={{ maxHeight: "calc(100% - 60px)" }}>
                            {filterAccordingtoCol('preparing work offer')}
                        </div>
                    </div>
                    <div className="bg-skyblue_deep border-2 border-white mt-2 p-4 rounded-lg " style={{ height: "500px" }}>
                        <div className="flex flex-row justify-between items-center">
                            <b>Send to Therapists</b>
                            <p className="px-2 text-right bg-white rounded-3xl">{counter[3]}</p>
                        </div>
                        <div className="scrollable-container flex-grow overflow-y-auto" style={{ maxHeight: "calc(100% - 60px)" }}>
                            {filterAccordingtoCol('send to therapist')}
                        </div>
                    </div>
                </div>
            </div>
            <EditpuModal
                open={open}
                handleOpen={handleOpen}
                handleClose={handleClose}
                selectedItem={selectedItem} // Pass selectedItem as prop to the modal
            />
        </div>
    )
}

export default Fields
