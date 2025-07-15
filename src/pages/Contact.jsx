import React, { useState, useEffect } from 'react';
import '../App.css';

const API = 'http://localhost/Project_Perweb_Kelompok6-main/api';

const Contact = () => {
  const [contacts, setContacts] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    fullName: '',
    email: '',
    message: '',
  });
  const [isEdit, setIsEdit] = useState(false);

  // Fetch data (Read)
  const fetchContacts = () => {
    fetch(`${API}/read_contact.php`)
      .then((res) => res.json())
      .then((data) => setContacts(data))
      .catch((err) => console.error('Gagal mengambil data:', err));
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // Submit form (Create or Update)
  const handleSubmit = (e) => {
    e.preventDefault();
    const url = isEdit
      ? `${API}/update_contact.php`
      : `${API}/submit_contact.php`;

    const formBody = new FormData();
    if (isEdit) formBody.append('id', formData.id);
    formBody.append('fullName', formData.fullName);
    formBody.append('email', formData.email);
    formBody.append('message', formData.message);

    fetch(url, {
      method: 'POST',
      body: formBody,
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message);
        resetForm();
        fetchContacts();
      })
      .catch((err) => {
        console.error('Gagal mengirim data:', err);
        alert('Gagal mengirim data');
      });
  };

  // Edit
  const handleEdit = (item) => {
    setFormData(item);
    setIsEdit(true);
  };

  // Delete
  const handleDelete = (id) => {
    if (window.confirm('Yakin ingin menghapus pesan ini?')) {
      fetch(`${API}/delete_contact.php`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id }),
      })
        .then((res) => res.json())
        .then((data) => {
          alert(data.message);
          setContacts((prev) => prev.filter((item) => item.id !== id));
        })
        .catch((err) => {
          console.error('Gagal menghapus:', err);
          alert('Gagal menghapus');
        });
    }
  };

  // Reset form
  const resetForm = () => {
    setFormData({
      id: null,
      fullName: '',
      email: '',
      message: '',
    });
    setIsEdit(false);
  };

  return (
    <div className="page contact-page" style={{ backgroundColor: '#fce4ec' }}>
      <h1>Contact Us</h1>

      <div className="contact-container">
        <form className="contact-form" onSubmit={handleSubmit}>
          <label htmlFor="fullName">Full Name</label>
          <input
            id="fullName"
            type="text"
            value={formData.fullName}
            onChange={handleChange}
            required
          />

          <label htmlFor="email">Email address</label>
          <input
            id="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            value={formData.message}
            onChange={handleChange}
            required
          />

          <button type="submit">
            {isEdit ? 'Update Pesan' : 'Kirim Pesan'}
          </button>
        </form>
      </div>
      <hr />
      <div className="contact-list">
        <h2>Pesan Masuk</h2>

        {contacts.length === 0 ? (
          <p>Belum ada pesan masuk.</p>
        ) : (
          <div className="card-grid">
            {contacts.map((item) => (
              <div key={item.id} className="contact-card">
                <div className="contact-header">
                  <h3>{item.fullName}</h3>
                  <span className="contact-email">{item.email}</span>
                </div>
                <p className="contact-message">{item.message}</p>
                <div className="card-actions">
                  <button className="btn-edit" onClick={() => handleEdit(item)}>✏️ Edit</button>
                  <button className="btn-delete" onClick={() => handleDelete(item.id)}>🗑️ Delete</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Contact;
