import React, { useState } from 'react';
import { addAuctionItem } from '../service/auctionService';

const AddAuctionItemForm = () => {
  const [formData, setFormData] = useState({
    itemName: '',
    startingPrice: '',
    description: '',
    category: '',
    startTime: '',
    limitTime: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addAuctionItem(formData);
      alert('Auction item added successfully');
    } catch (error) {
      console.error('Failed to add auction item', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="itemName" value={formData.itemName} onChange={handleChange} placeholder="Item Name" />
      <input type="number" name="startingPrice" value={formData.startingPrice} onChange={handleChange} placeholder="Starting Price" />
      <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Description" />
      <input type="text" name="category" value={formData.category} onChange={handleChange} placeholder="Category" />
      <input type="datetime-local" name="startTime" value={formData.startTime} onChange={handleChange} />
      <input type="datetime-local" name="limitTime" value={formData.limitTime} onChange={handleChange} />
      <button type="submit">Add Auction Item</button>
    </form>
  );
};

export default AddAuctionItemForm;
