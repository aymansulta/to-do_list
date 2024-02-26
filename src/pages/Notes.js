import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Container, Typography } from '@mui/material';
import NoteCard from '../component/NoteCard';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import axios from 'axios'; // Import axios for making HTTP requests
import NoteList from '../component/NoteList';



export default function Notes({ viewMode }) {


    const [notes, setNotes] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3004/notes')
            .then((res) => res.json())
            .then((data) => {
                setNotes(data);
            });
    }, []);


    const handleDelete = async (id, newStatus) => {
        // Update the status of the note to 'deleted'
        const updatedNotes = notes.map((note) => {
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

        setNotes(updatedNotes);
    };

    const handleStatusChange = async (id, newStatus) => {
        // Update the status of the note
        const updatedNotes = notes.map((note) => {
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

        setNotes(updatedNotes);
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

    const itemStyle = {
        margin: '6px', // Adjust the margin as needed
    };

    const renderGridView = () => {
        return (
            <ResponsiveMasonry>
                <Masonry>
                    {notes
                        .filter((note) => note.status !== 'deleted') // Filter out notes with status 'deleted'
                        .map((note) => (
                            <div key={note.id} style={itemStyle}>
                                <Paper>
                                    <NoteCard
                                        note={note}
                                        handleDelete={handleDelete}
                                        handleStatusChange={handleStatusChange}
                                    />
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
                {notes
                    .filter((note) => note.status !== 'deleted') // Filter out notes with status 'deleted'
                    .map((note, index) => (
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
                variant="h6"
                component="h2"
                color="textSecondary"
                sx={{
                    marginBottom: 3,
                }}
            >
                All Notes
            </Typography>
            {viewMode === 'grid' ? renderGridView() : renderListView()}
        </Container>
    );
}