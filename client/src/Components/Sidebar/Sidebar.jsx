import React, { useState, useEffect } from 'react';
import axios from 'axios';



const Sidebar = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState({ topic: '', content: '' });
  const [isAdding, setIsAdding] = useState(false);
  const [activeNoteIndex, setActiveNoteIndex] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editNoteIndex, setEditNoteIndex] = useState(null);

  const token = localStorage.getItem('token'); // Get JWT token from local storage

  // Fetch notes when component mounts or token changes
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get('http://localhost:4000/notes', {
          headers: { Authorization: token }
        });
        setNotes(response.data); // Update notes state with fetched notes
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchNotes();
  }, [token]); // Dependency array includes token, refetch notes if token changes

  // Handle adding or updating a note
  const handleSaveNote = async () => {
    if (newNote.topic.trim()) {
      try {
        if (isEditing) {
          // Update note if editing
          await axios.put(`http://localhost:4000/notes/${notes[editNoteIndex].note_id}`, {
            title: newNote.topic,
            content: newNote.content
          }, { headers: { Authorization: token } });
        } else {
          // Add a new note
          await axios.post('http://localhost:4000/notes', {
            title: newNote.topic,
            content: newNote.content
          }, { headers: { Authorization: token } });
        }

        // Refetch notes after adding or updating
        const response = await axios.get('http://localhost:4000/notes', {
          headers: { Authorization: token }
        });
        setNotes(response.data); // Update notes state

        // Reset form and state
        setNewNote({ topic: '', content: '' });
        setIsAdding(false);
        setIsEditing(false);
        setEditNoteIndex(null);
      } catch (error) {
        console.error('Error saving note:', error);
      }
    }
  };

  // Handle view note toggle
  const handleViewNote = (index) => {
    setActiveNoteIndex(index === activeNoteIndex ? null : index);
  };

  // Handle add note action
  const handleAddNote = () => {
    setIsAdding(true);
    setNewNote({ topic: '', content: '' });
  };

  // Handle editing a note
  const handleEditNote = (index) => {
    setNewNote(notes[index]);
    setIsAdding(true);
    setIsEditing(true);
    setEditNoteIndex(index);
  };

  return (
    <div className="sidebar bg-gray-100 shadow-md h-screen p-4 sticky top-0" style={{ width: '300px' }}>
      
      <div className="notes-section mt-4">
        <h2 className="text-lg font-semibold mb-2">Notes</h2>
        <ul>
          {notes.map((note, index) => (
            <li key={index} className="mb-2">
              <div 
                className="font-semibold cursor-pointer flex justify-between" 
                onClick={() => handleViewNote(index)}
              >
                {note.title}
                {activeNoteIndex === index && (
                  <button 
                  onClick={(e) => {
                                e.stopPropagation();
                                handleEditNote(index);
                              }}
                 className="p-2 rounded bg-transparent hover:bg-gray-100">
            ✎
               </button>
                )}
              
              </div>
              {activeNoteIndex === index && (
                <div className="mt-2 text-sm text-gray-700">
                  {note.content}
                </div>
              )}
            </li>
          ))}
        </ul>

        {isAdding && (
          <div className="add-note-form mt-2">
            <input
              type="text"
              placeholder="Topic"
              value={newNote.topic}
              onChange={(e) => setNewNote({ ...newNote, topic: e.target.value })}
              className="border p-2 w-full mb-2"
            />
            <textarea
              placeholder="Write your note here..."
              value={newNote.content}
              onChange={(e) => setNewNote({ ...newNote, content: e.target.value })}
              className="border p-2 w-full"
            />
            <button onClick={handleSaveNote} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold  py-2 px-4 border border-blue-500 hover:border-transparent rounded">
              {isEditing ? 'Update Note' : 'Save Note'}
            </button>
        
          </div>
        )}

        {!isAdding && (
          <button onClick={handleAddNote} className="p-2 rounded bg-transparent text-black hover:bg-gray-100">
            + Add Note
          </button>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
