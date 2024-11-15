import React, { ChangeEvent, useEffect, useState } from 'react';
import { RiseLoader } from 'react-spinners';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { Toaster } from 'react-hot-toast';
import toast from "react-hot-toast";
import { listData } from "../../lib/dummydata.js";
import { appendItem } from '../Add/Append.js';
import "./Form.css";
import Cols from "../Cols/Fields.tsx";
import {Item} from "../interface/Interface.tsx";

const TITLE_REGEX = /^(Mr|Mrs|Ms|mr|mrs|ms)$/;
const NAME_REGEX = /^[A-Za-z\s]{2,50}$/;
const AGE_REGEX = /^(?:[1-9][0-9]?|1[0-4][0-9]|150)$/;
const EMAIL_REGEX = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
const PHONE_REGEX = /^\d{10,15}$/;

const Form = () => {
    const [formData, setFormData] = useState<Omit<Item, 'id' | 'category'>>({
        title: '',
        name: '',
        age: 0,
        email: '',
        phone: '',
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

    const [loading, setloading] = useState(false);
    // let [max_id, setMaxId] = useState<number>(() => {
    //     const ids = listData.map(item => item.id);
    //     return ids.length > 0 ? Math.max(...ids) : 0; // Default to 0 if listData is empty
    //   });

    // useEffect(() => {
    //     setMaxId(() => {
    //         const ids = listData.map(item => item.id);
    //         return ids.length > 0 ? Math.max(...ids) : 0; // Default to 0 if listData is empty
    //       });
    // }, [listData]);


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
                appendItem(formData);

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
        <div className="bg-skyblue_light min-h-screen p-5">
            <Toaster />
            <header className="flex flex-col items-center justify-center text-2xl mb-8">
                <b>Kanban Board</b>
            </header>

            <div className="flex flex-row gap-2">
                {/* Form Section */}
                <div className="p-8 border-2 border-white rounded-lg" style={{ width: "20%" }}>
                    <b className="mb-4 block">Add New Booking</b>
                    <form onSubmit={handleSubmit}>
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
                        </div>
                        <button
                            type="submit"
                            className="bg-gray-800 text-white w-full p-2 rounded-md mt-8 hover:bg-teal-800"
                        // disabled={
                        //     !validformData.title ||
                        //     !validformData.name ||
                        //     !validformData.age ||
                        //     !validformData.email ||
                        //     !validformData.phone 
                        //   }
                        >
                            {loading ? <RiseLoader color='white' size='10' /> : 'Submit'}
                        </button>
                    </form>

                </div>

                <Cols />
            </div>


        </div>
    );
};

export default Form;
