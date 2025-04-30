import React, { useState, useEffect } from "react";

function Navbar({
  activeCategory,
  setActiveCategory,
  showOnlyCompleted,
  setShowOnlyCompleted,
  onAddNote,
  onUpdateNote,
  editingNote,
  setEditingNote,
  searchTerm,
  setSearchTerm
}) {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    id: 0,
    title: "",
    description: "",
    category: "Personal",
    due: new Date().toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    }),
    checked: false
  });

  // Initialize form when editingNote changes
  useEffect(() => {
    if (editingNote) {
      setFormData(editingNote);
      setShowModal(true);
    }
  }, [editingNote]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Format the date properly
    const formattedNote = {
      ...formData,
      due: formData.due || new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    };

    if (editingNote) {
      onUpdateNote(formattedNote);
    } else {
      onAddNote({
        ...formattedNote,
        id: Date.now() // Generate new ID for new notes
      });
    }

    resetForm();
    setShowModal(false);
  };

  const resetForm = () => {
    setFormData({
      id: 0,
      title: "",
      description: "",
      category: "Personal",
      due: new Date().toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      checked: false
    });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingNote(null);
    resetForm();
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-white py-3 px-5">
        <div className="container">
          <form className="d-flex w-100" role="search">
            <div className="input-group">
              <span className="input-group-text rounded-start-2">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="search"
                className="form-control border-start-0 rounded-end-2 me-3"
                placeholder="Search by title"
                aria-label="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button 
                className="btn add-btn fw-semibold rounded-pill fs-5" 
                type="button"
                onClick={() => {
                  setEditingNote(null);
                  setShowModal(true);
                }}
              >
                +<span className="mx-2">Add</span>
              </button>
            </div>
          </form>
        </div>
      </nav>

      {/* Add/Edit Note Modal */}
      <div className={`modal fade ${showModal ? 'show' : ''}`} 
           style={{ display: showModal ? 'block' : 'none' }} 
           tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                {editingNote ? "Edit Note" : "Add New Note"}
              </h5>
              <button 
                type="button" 
                className="btn-close" 
                onClick={handleCloseModal}
              ></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="noteTitle" className="form-label">Title *</label>
                  <input
                    type="text"
                    className="form-control"
                    id="noteTitle"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="noteDescription" className="form-label">Description *</label>
                  <textarea
                    className="form-control"
                    id="noteDescription"
                    name="description"
                    rows="3"
                    value={formData.description}
                    onChange={handleInputChange}
                    required
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="noteDueDate" className="form-label">Due Date</label>
                  <input
                    type="date"
                    className="form-control"
                    id="noteDueDate"
                    name="due"
                    value={formData.due ? new Date(formData.due).toISOString().split('T')[0] : ""}
                    onChange={(e) => {
                      const selectedDate = e.target.value 
                        ? new Date(e.target.value).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })
                        : "";
                      setFormData({...formData, due: selectedDate});
                    }}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Category *</label>
                  {["Personal", "Home", "Business"].map(cat => (
                    <div className="form-check" key={cat}>
                      <input
                        className="form-check-input"
                        type="radio"
                        name="category"
                        id={`${cat.toLowerCase()}Category`}
                        value={cat}
                        checked={formData.category === cat}
                        onChange={handleInputChange}
                        required
                      />
                      <label className="form-check-label" htmlFor={`${cat.toLowerCase()}Category`}>
                        {cat}
                      </label>
                    </div>
                  ))}
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="noteCompleted"
                    name="checked"
                    checked={formData.checked}
                    onChange={(e) => setFormData({...formData, checked: e.target.checked})}
                  />
                  <label className="form-check-label" htmlFor="noteCompleted">
                    Mark as completed
                  </label>
                </div>
              </div>
              <div className="modal-footer">
                <button 
                  type="button" 
                  className="btn btn-secondary" 
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {editingNote ? "Save Changes" : "Add Note"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {showModal && <div className="modal-backdrop fade show"></div>}

      <div className="container">
        <h4 className="my-3">Your notes</h4>

        <div className="d-flex justify-content-between align-items-center mb-3 flex-wrap">
          <ul className="nav nav-tabs mb-2">
            {["ALL", "Personal", "Home", "Business"].map((cat) => (
              <li className="nav-item" key={cat}>
                <button
                  className={`nav-link ${activeCategory === cat ? "active" : ""}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat.toUpperCase()}
                </button>
              </li>
            ))}
          </ul>

          <div className="form-check ms-3">
            <input
              className="form-check-input"
              type="checkbox"
              id="show-completed"
              checked={showOnlyCompleted}
              onChange={(e) => setShowOnlyCompleted(e.target.checked)}
            />
            <label className="form-check-label" htmlFor="show-completed">
              Show only completed notes
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;