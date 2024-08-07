

import React, { useState } from 'react';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [errors, setErrors] = useState({});
    const [successMessage, setSuccessMessage] = useState('');

    const validate = () => {
        const newErrors = {};
        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.message) newErrors.message = 'Message is required';
        return newErrors;
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        // Handle form submission here (e.g., send data to an API)
        setSuccessMessage('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' }); // Clear form fields
    };

    return (
        <section className="py-8 bg-gray-100 dark:bg-gray-900">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">Contact Us</h2>
                <form className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg" onSubmit={handleSubmit}>
                    {successMessage && (
                        <div className="mb-4 p-3 bg-green-100 text-green-700 border border-green-300 rounded">
                            {successMessage}
                        </div>
                    )}
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-gray-700 dark:text-gray-300">Name:</label>
                        <input
                            type="text"
                            id="name"
                            value={formData.name}
                            onChange={handleChange}
                            className={`mt-2 p-2 w-full border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 ${
                                errors.name ? 'border-red-500' : ''
                            }`}
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-gray-700 dark:text-gray-300">Email:</label>
                        <input
                            type="email"
                            id="email"
                            value={formData.email}
                            onChange={handleChange}
                            className={`mt-2 p-2 w-full border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 ${
                                errors.email ? 'border-red-500' : ''
                            }`}
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="message" className="block text-gray-700 dark:text-gray-300">Message:</label>
                        <textarea
                            id="message"
                            value={formData.message}
                            onChange={handleChange}
                            className={`mt-2 p-2 w-full border rounded dark:bg-gray-700 dark:border-gray-600 dark:text-gray-200 ${
                                errors.message ? 'border-red-500' : ''
                            }`}
                        />
                        {errors.message && <p className="text-red-500 text-sm">{errors.message}</p>}
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
