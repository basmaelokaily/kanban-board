import React, { ChangeEvent, useState } from 'react';
import {RiseLoader} from 'react-spinners';

type FormData = {
    title: string;
    name: string;
    age: number;
    email: string;
    phone: string;
};
type loading = boolean;

const Form = () => {
    const [formData, setFormData] = useState<FormData>({
        title: '',
        name: '',
        age: 0,
        email: '',
        phone: '',
    });

    const [loading, setloading] = useState<loading>(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevValues) => ({
            ...prevValues,
            [name]: name === "age" ? Number(value) : value, // Convert `age` to a number
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setloading(true); // Start loading before timeout

        setTimeout(() => {
            console.log(formData);
            setFormData({ title: '', name: '', age: 0, email: '', phone: '' });
            setloading(false); // Stop loading after timeout
        }, 2000);

    };

    return (
        <div className="bg-skyblue_light min-h-screen p-5">
            <header className="flex flex-col items-center justify-center text-2xl mb-8">
                <b>Kanban Board</b>
            </header>

            <div className="flex flex-row">
                {/* Form Section */}
                <div className="p-8 border-2 border-white rounded-lg">
                    <b className="">Add New Booking</b>
                    <form onSubmit={handleSubmit}>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="title">Title:</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                className="p-1 border rounded-md"
                                value={formData.title}
                                onChange={handleChange}
                            />
                            <label htmlFor="name">Name:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                className="p-1 border rounded-md"
                                value={formData.name}
                                onChange={handleChange}
                            />
                            <label htmlFor="age">Age:</label>
                            <input
                                type="text"
                                id="age"
                                name="age"
                                className="p-1 border rounded-md"
                                value={formData.age}
                                onChange={handleChange}
                            />
                            <label htmlFor="email">Email:</label>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                className="p-1 border rounded-md"
                                value={formData.email}
                                onChange={handleChange}
                            />
                            <label htmlFor="phone">Phone:</label>
                            <input
                                type="text"
                                id="phone"
                                name="phone"
                                className="p-1 border rounded-md"
                                value={formData.phone}
                                onChange={handleChange}
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-gray-800 text-white w-full p-2 rounded-md mt-4"
                        >
                            {loading ? <RiseLoader color='white' size='10'/> : 'Submit'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Form;



{/* <nav className="flex items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1">
                    <a href="#" className="-m-1.5 p-1.5">
                        <img className="h-8 w-auto" src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600" alt=""/>
                    </a>
                </div>
                <div className="flex lg:hidden">
                    <button type="button" className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
                        <span className="sr-only">Open main menu</span>
                        <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-12">
                    <a href="#" className="text-sm/6 font-semibold text-gray-900">Product</a>
                </div>
            </nav> */}