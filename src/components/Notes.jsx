function Notes({ notes, onToggle, onEdit, onDelete }) {
  return (
    <section className="container py-5">
      <div className="row">
        {notes.length > 0 ? (
          notes.map((note) => (
            <div className="col-12 col-md-6 col-lg-4 mb-4" key={note.id}>
              <div className="card border-0 h-100 p-2 shadow rounded-5 d-flex flex-column">
                <div className="card-header d-flex justify-content-between align-items-center bg-white">
                  <span className={`badge-${note.category.toLowerCase()} text-white p-2 rounded-5 fw-semibold`}>
                    {note.category}
                  </span>
                  <form className="d-flex align-items-center gap-2">
                    <div className="form-check form-switch">
                      <input
                        type="checkbox"
                        id={`completedSwitch-${note.id}`}
                        checked={note.checked}
                        onChange={() => onToggle(note.id)}
                      />
                    </div>
                    <button 
                      type="button" 
                      className="btn btn-outline-secondary" 
                      aria-label="Edit"
                      onClick={() => onEdit(note)}
                    >
                      <i className="bi bi-pencil-square"></i>
                    </button>
                    <button 
                      type="button" 
                      className="btn btn-outline-danger" 
                      aria-label="Delete"
                      onClick={() => onDelete(note.id)}
                    >
                      <i className="bi bi-trash-fill"></i>
                    </button>
                  </form>
                </div>
                <div className="card-body flex-grow-1">
                  <h3 className="card-title fs-5 fw-bold">{note.title}</h3>
                  <p className="card-text text-muted">{note.description}</p>
                </div>
                <div className="card-footer bg-white border-0 pt-0">
                  <small className="text-muted">Due: {note.due}</small>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center py-5">
            <h4>No notes found</h4>
            <p>Try changing your filters or add a new note</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Notes;