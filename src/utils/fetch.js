const API = 'http://localhost/project_perweb_kelompok6-main/api';

// =====================
// 📚 Buku / Lukisan
// =====================

export const fetchBooks = async () => {
  const res = await fetch(`${API}/read_book.php`);
  return await res.json();
};

export const addBook = async (formData) => {
  const res = await fetch(`${API}/submit_book.php`, {
    method: 'POST',
    body: formData,
  });
  return await res.json();
};

export const updateBook = async (formData) => {
  const res = await fetch(`${API}/update_book.php`, {
    method: 'POST',
    body: formData,
  });
  return await res.json();
};

export const deleteBook = async (id) => {
  const res = await fetch(`${API}/delete_book.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  });
  return await res.json();
};


// =====================
// 💬 Komentar
// =====================

export const submitComment = async (commentData) => {
  try {
    const res = await fetch(`${API}/submit_comment.php`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(commentData),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! Status: ${res.status}`);
    }

    return await res.json();
  } catch (err) {
    console.error('🔥 Gagal submit komentar:', err);
    throw err;
  }
};

export const fetchCommentsByBookId = async (bookId) => {
  const res = await fetch(`${API}/read_comment.php?book_id=${bookId}`);
  return await res.json();
};

// =====================
// 📨 Contact
// =====================

export const fetchContacts = async () => {
  const res = await fetch(`${API}/read_contact.php`);
  return await res.json();
};

export const submitContact = async (formData) => {
  const res = await fetch(`${API}/submit_contact.php`, {
    method: 'POST',
    body: formData,
  });
  return await res.json();
};

export const updateContact = async (formData) => {
  const res = await fetch(`${API}/update_contact.php`, {
    method: 'POST',
    body: formData,
  });
  return await res.json();
};

export const deleteContact = async (id) => {
  const res = await fetch(`${API}/delete_contact.php`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id }),
  });
  return await res.json();
};
