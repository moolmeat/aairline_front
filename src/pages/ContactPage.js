import React, { useState } from 'react';
import { sendContact } from '../service/contactService';
import ContactForm from '../components/ContactForm';

const ContactPage = () => {
    const [message, setMessage] = useState('');

    const handleFormSubmit = async (contactData) => {
        try {
            await sendContact(contactData);
            setMessage('Contact sent successfully!');
        } catch (error) {
            setMessage('Failed to send contact: ' + error.message);
        }
    };

    return (
        <div>
            <h1>Contact Us</h1>
            <ContactForm onSubmit={handleFormSubmit} />
            {message && <p>{message}</p>}
        </div>
    );
};

export default ContactPage;
