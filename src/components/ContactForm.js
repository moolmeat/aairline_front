import React, { useState } from 'react';

const ContactForm = ({ onSubmit }) => {
    const [contactData, setContactData] = useState({
        name: '',
        email: '',
        category: '',
        content: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setContactData({
            ...contactData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(contactData);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Name</label>
                <input type="text" name="name" value={contactData.name} onChange={handleChange} />
            </div>
            <div>
                <label>Email</label>
                <input type="email" name="email" value={contactData.email} onChange={handleChange} />
            </div>
            <div>
                <label>Category</label>
                <input type="text" name="category" value={contactData.category} onChange={handleChange} />
            </div>
            <div>
                <label>Content</label>
                <textarea name="content" value={contactData.content} onChange={handleChange} />
            </div>
            <button type="submit">Send</button>
        </form>
    );
};

export default ContactForm;
