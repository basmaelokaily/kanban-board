import React, { ChangeEvent, useEffect, useState } from 'react';
import { RiseLoader } from 'react-spinners';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Toaster } from 'react-hot-toast';
import toast from "react-hot-toast";
import { listData } from "../../lib/dummydata.js";
import { appendItem } from '../Add/Append.js';
import Cols from "../Cols/Fields.tsx";
import { Item } from "../interface/Interface.tsx";
import { EditRecord } from "../Edit/EditRecord.tsx"
import {DeleteRecord} from "../Delete/Deleterecord.tsx";

const TITLE_REGEX = /^(Mr|Mrs|Ms|mr|mrs|ms)$/;
const NAME_REGEX = /^[A-Za-z\s]{2,50}$/;
const AGE_REGEX = /^(?:[1-9][0-9]?|1[0-4][0-9]|150)$/;
const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PHONE_REGEX = /^\d{10,15}$/;


function Editpu(props: any) {


    const [formData, setFormData] = useState<Omit<Item, 'id' | 'category'>>({
        title: props.selectedItem.title,
        name: props.selectedItem.name,
        age: props.selectedItem.age,
        email: props.selectedItem.email,
        phone: props.selectedItem.phone,
    });

    const [validformData, setvalidFormData] = useState({
        title: false,
        name: false,
        age: false,
        email: false,
        phone: false,
    });

    const [focusformData, setfocusFormData] = useState({
        title: false,
        name: false,
        age: false,
        email: false,
        phone: false,
    });

    const [selectedCategory, setSelectedCategory] = useState<string>('unclaimed'); // Default category

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory(event.target.value); // Update the selected category
    };


    const [loading, setloading] = useState(false);

    useEffect(() => {
        setvalidFormData((prevvalues) => ({
            ...prevvalues,
            title: TITLE_REGEX.test(formData.title)
        }))
    }, [formData.title]);

    useEffect(() => {
        setvalidFormData((prevValues) => ({
            ...prevValues,
            name: NAME_REGEX.test(formData.name)
        }))
    }, [formData.name])

    useEffect(() => {
        setvalidFormData((prevValues) => ({
            ...prevValues,
            age: AGE_REGEX.test(String(formData.age))
        }))
    }, [formData.age])

    useEffect(() => {
        setvalidFormData((prevValues) => ({
            ...prevValues,
            email: EMAIL_REGEX.test(formData.email)
        }))
    }, [formData.email])

    useEffect(() => {
        setvalidFormData((prevValues) => ({
            ...prevValues,
            phone: PHONE_REGEX.test(formData.phone)
        }))
    }, [formData.phone])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevValues) => ({
            ...prevValues,
            [name]: name === "age" || name === "phone" ? Number(value) : value, // Convert `age` to a number
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Start loading immediately
        setloading(true);

        // Introduce a slight delay for validation feedback
        setTimeout(() => {
            if (
                !validformData.title ||
                !validformData.name ||
                !validformData.age ||
                !validformData.email ||
                !validformData.phone
            ) {
                // Stop loading if validation fails
                setloading(false);

                // Show error toast for incorrect inputs
                toast.error("Please correct the invalid fields!", {
                    position: "top-center",
                    duration: 3000, // Proper toast duration for visibility
                    className: "text-white rounded-5",
                    style: { backgroundColor: "#3AB2A6" },
                });

                console.log("Validation failed");
                return;
            }

            // If validation passes, simulate API call or submission process
            setTimeout(() => {
                console.log(formData);
                EditRecord({
                    id: props.selectedItem.id,
                    title: formData.title,
                    name: formData.name,
                    age: formData.age,
                    email: formData.email,
                    phone: formData.phone,
                    category: selectedCategory });

            // Reset form data after submission
            setFormData({ title: '', name: '', age: 0, email: '', phone: '' });

            // Stop loading and display success toast
            setloading(false);

            toast.success("Form submitted successfully!", {
                position: "top-center",
                duration: 2000,
                className: "text-white rounded-5",
                style: { backgroundColor: "#3AB2A6" },
            });
        }, 2000); // Simulate a 2-second submission process
    }, 500); // Small delay before validation to allow loading spinner to display
};


return (
    <div>
        <form>
            <div className="flex flex-col gap-2">
                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    className={`p-1 border rounded-md ${formData.title === "" ? "" : validformData.title ? "" : "border-rose-600"}`}
                    placeholder='type your title'
                    value={formData.title}
                    onChange={handleChange}
                    aria-invalid={validformData.title ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setfocusFormData((prevValues) => ({ ...prevValues, title: true }))}
                    onBlur={() => setfocusFormData((prevValues) => ({ ...prevValues, title: false }))}
                />
                <p
                    id="uidnote"
                    className={`mb-2 block ${focusformData.title && formData.title && !validformData.title
                        ? "instructions"
                        : "offscreen"}`}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Title must be one of the following: Mr, Mrs, or Ms.
                </p>
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    className={`p-1 border rounded-md ${formData.name === "" ? "" : validformData.name ? "" : "border-rose-600"}`}
                    placeholder='type your full name'
                    value={formData.name}
                    onChange={handleChange}
                    aria-invalid={validformData.name ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setfocusFormData((prevValues) => ({ ...prevValues, name: true }))}
                    onBlur={() => setfocusFormData((prevValues) => ({ ...prevValues, name: false }))}
                />
                <p
                    id="uidnote"
                    className={
                        focusformData.name && formData.name && !validformData.name
                            ? "instructions"
                            : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Name must only contain letters and spaces, and be between 2 and 50 characters.
                </p>
                <label htmlFor="age">Age:</label>
                <input
                    type="text"
                    id="age"
                    name="age"
                    className={`p-1 border rounded-md ${formData.age === 0 ? "" : validformData.age ? "" : "border-rose-600"}`}
                    placeholder="type your age"
                    value={formData.age}
                    onChange={handleChange}
                    aria-invalid={validformData.age ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setfocusFormData((prevValues) => ({ ...prevValues, age: true }))}
                    onBlur={() => setfocusFormData((prevValues) => ({ ...prevValues, age: false }))}
                />
                <p
                    id="uidnote"
                    className={
                        focusformData.age && formData.age && !validformData.age
                            ? "instructions"
                            : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Age must be a valid number between 1 and 999.
                </p>
                <label htmlFor="email">Email:</label>
                <input
                    type="text"
                    id="email"
                    name="email"
                    className={`p-1 border rounded-md ${formData.email === "" ? "" : validformData.email ? "" : "border-rose-600"}`}
                    placeholder='type your email'
                    value={formData.email}
                    onChange={handleChange}
                    aria-invalid={validformData.email ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setfocusFormData((prevValues) => ({ ...prevValues, email: true }))}
                    onBlur={() => setfocusFormData((prevValues) => ({ ...prevValues, email: false }))}
                />
                <p
                    id="uidnote"
                    className={
                        focusformData.email && formData.email && !validformData.email
                            ? "instructions"
                            : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Please enter a valid email address (e.g., example@mail.com).
                </p>
                <label htmlFor="phone">Phone:</label>
                <input
                    type="text"
                    id="phone"
                    name="phone"
                    placeholder='+2001111258479'
                    className={`p-1 border rounded-md ${formData.phone === "" ? "" : validformData.phone ? "" : "border-rose-600"}`}
                    value={formData.phone}
                    onChange={handleChange}
                    aria-invalid={validformData.phone ? "false" : "true"}
                    aria-describedby="uidnote"
                    onFocus={() => setfocusFormData((prevValues) => ({ ...prevValues, phone: true }))}
                    onBlur={() => setfocusFormData((prevValues) => ({ ...prevValues, phone: false }))}
                />
                <p
                    id="uidnote"
                    className={
                        focusformData.phone && formData.phone && !validformData.phone
                            ? "instructions"
                            : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Phone number must be between 10 and 15 digits, with no spaces or special characters.
                </p>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
                <select
                    id="category"
                    name="category"
                    value={selectedCategory}
                    onChange={handleCategoryChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                >
                    <option value="unclaimed">Unclaimed</option>
                    <option value="first contact">First Contact</option>
                    <option value="preparing work offer">Preparing Work Offer</option>
                    <option value="send to therapist">Send to Therapist</option>
                </select>
            </div>
            <div className="flex flex-row gap-2">
            <button
                    className="bg-white border-2 border-black text-black w-full p-2 rounded-md mt-8 hover:bg-teal-800"
                    onClick={()=> DeleteRecord(props.selectedItem.id)}>
                    {loading ? <RiseLoader color='white' size='10' /> : 'Delete'}
                </button>
                <button
                    type="submit"
                    className="bg-gray-800 text-white w-full p-2 rounded-md mt-8 hover:bg-teal-800">
                    {loading ? <RiseLoader color='white' size='10' /> : 'Edit'}
                </button>
            </div>
        </form>
    </div>
)
}

export default Editpu
