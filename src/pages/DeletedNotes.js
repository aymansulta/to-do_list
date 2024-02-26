import { Container, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import NoteCard from '../component/NoteCard'
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import axios from 'axios'; // Import axios for making HTTP requests
import NoteList from '../component/NoteList';

export default function DeletedNotes({ viewMode }) {

  const [deletedNotes, setDeletedNotes] = useState([]);


  // Effect to fetch deleted notes from the database
  useEffect(() => {
    // Function to fetch deleted notes
    const fetchDeletedNotes = async () => {
      try {
        // Make GET request to fetch notes with status 'deleted'
        const response = await axios.get('http://localhost:3004/notes/', {
          params: {
            status: 'deleted'
          }
        });
        // Set the deleted notes in state
        setDeletedNotes(response.data);
      } catch (error) {
        console.error('Error fetching deleted notes:', error);
      }
    };

    // Call fetchDeletedNotes function
    fetchDeletedNotes();
  }, []); // Empty dependency array to run the effect only once

  const itemStyle = {
    margin: "6px", // Adjust the margin as needed
  };

  const handleDelete = async (id) => {
    await fetch('http://localhost:3004/notes/' + id, {
      method: 'DELETE'
    })

    const newNotes = deletedNotes.filter(note => note.id != id)
    setDeletedNotes(newNotes);
  }

  const handleStatusChange = async (id, newStatus) => {
    const updatedNotes = deletedNotes.map((note) => {
      if (note.id === id) {
        return { ...note, status: newStatus };
      }
      return note;
    });

    await fetch('http://localhost:3004/notes/' + id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...updatedNotes.find((note) => note.id === id),
        status: newStatus
      }),
    });

    // setCheckedNotes(updatedNotes);
    setDeletedNotes(prevNotes => prevNotes.filter(note => note.id !== id));
  };

  const [expandedNoteId, setExpandedNoteId] = useState(null);

  const handleNoteExpand = (noteId) => {
    if (expandedNoteId === noteId) {
      // Collapse the note if it's already expanded
      setExpandedNoteId(null);
    } else {
      // Expand the selected note
      setExpandedNoteId(noteId);
    }
  };

  const renderGridView = () => {
    return (
      <ResponsiveMasonry>
        <Masonry>
          {deletedNotes.map(note => (
            <div key={note.id} style={itemStyle}>
              <Paper>
                <NoteCard note={note} handleDelete={handleDelete} handleStatusChange={handleStatusChange} />
              </Paper>
            </div>
          ))}
        </Masonry>
      </ResponsiveMasonry>
    )
  }

  const renderListView = () => {
    return (
      <>
        {deletedNotes.map((note, index) => (
          <div key={note.id} style={itemStyle}>
            <Paper>
              <NoteList
                key={index}
                note={note}
                expanded={expandedNoteId === note.id}
                onNoteExpand={handleNoteExpand}
                handleDelete={handleDelete}
                handleStatusChange={handleStatusChange} />
            </Paper>
          </div>
        ))}
      </>
    )
  }


  return (
    <Container>
      <Typography
        variant='h6'
        component='h2'
        color='textSecondary'
        sx={{
          marginBottom: 3
        }}
      >
        Deleted Notes
      </Typography>
      {viewMode === 'grid' ? renderGridView() : renderListView()}
    </Container>
  )
}
