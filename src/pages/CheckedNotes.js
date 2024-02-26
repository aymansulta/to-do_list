import { Container, Paper, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import NoteCard from '../component/NoteCard'
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import axios from 'axios'; // Import axios for making HTTP requests
import NoteList from '../component/NoteList';



export default function CheckedNotes({ viewMode }) {

  const [checkedNotes, setCheckedNotes] = useState([]);


  // Effect to fetch checked notes from the database
  useEffect(() => {
    // Function to fetch checked notes
    const fetchCheckedNotes = async () => {
      try {
        // Make GET request to fetch notes with status 'checked'
        const response = await axios.get('http://localhost:3004/notes/', {
          params: {
            status: 'checked'
          }
        });
        // Set the checked notes in state
        setCheckedNotes(response.data);
      } catch (error) {
        console.error('Error fetching checked notes:', error);
      }
    };

    // Call fetchCheckedNotes function
    fetchCheckedNotes();
  }, [checkedNotes]); // Empty dependency array to run the effect only once

  const itemStyle = {
    margin: "6px", // Adjust the margin as needed
  };

  const handleDelete = async (id, newStatus) => {
    // Update the status of the note to 'deleted'
    const updatedNotes = checkedNotes.map((note) => {
      if (note.id === id) {
        return { ...note, status: 'deleted' };
      }
      return note;
    });

    // Make PUT request to update the note in the database
    await fetch('http://localhost:3004/notes/' + id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...updatedNotes.find((note) => note.id === id),
        status: newStatus
      }),
    });

    setCheckedNotes(updatedNotes);
  };

  const handleStatusChange = async (id, newStatus) => {
    // Update the status of the note
    const updatedNotes = checkedNotes.map((note) => {
      if (note.id === id) {
        return { ...note, status: newStatus };
      }
      return note;
    });

    // Make PUT request to update the note in the database
    await fetch('http://localhost:3004/notes/' + id, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...updatedNotes.find((note) => note.id === id),
        status: newStatus
      }),
    });

    setCheckedNotes(updatedNotes);
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
          {checkedNotes.map(note => (
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
        {checkedNotes.map((note, index) => (
          <div key={note.id} style={itemStyle}>
            <Paper>
              <NoteList
                key={index}
                note={note}
                expanded={expandedNoteId === note.id}
                onNoteExpand={handleNoteExpand}
                handleDelete={handleDelete}
                handleStatusChange={handleStatusChange}
              />
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
        Checked Notes
      </Typography>
      {viewMode === 'grid' ? renderGridView() : renderListView()}
    </Container>
  )
}
