// src/components/Contact.jsx
import React from 'react';

const Contact = () => {
    return (
        <section className="py-8 bg-gray-100 dark:bg-gray-900">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">Contact Us</h2>
                <form className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 dark:text-gray-300">Name:</label>
                        <input
                            type="text"
                            id="name"
                            className="mt-2 p-2 w-full border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 dark:text-gray-300">Email:</label>
                        <input
                            type="email"
                            id="email"
                            className="mt-2 p-2 w-full border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="message" className="block text-gray-700 dark:text-gray-300">Message:</label>
                        <textarea
                            id="message"
                            className="mt-2 p-2 w-full border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Send
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Contact;
