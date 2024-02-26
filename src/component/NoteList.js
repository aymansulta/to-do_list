import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import { Avatar, Button, Checkbox, Icon, IconButton, InputAdornment } from '@mui/material';
import { AccountCircle, DeleteOutline } from '@mui/icons-material';
import { blue, green, pink, red, yellow } from '@mui/material/colors';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import LaptopChromebookOutlinedIcon from '@mui/icons-material/LaptopChromebookOutlined';
import AlarmOutlinedIcon from '@mui/icons-material/AlarmOutlined';
import DriveEtaOutlinedIcon from '@mui/icons-material/DriveEtaOutlined';



export default function NoteList({ note, handleDelete, handleStatusChange, expanded, onNoteExpand }) {

    const handleExpand = () => {
        onNoteExpand(note.id);
    };


    // const initialStatus = localStorage.getItem(`note_${note.id}_status`) || 'new' || 'deleted' || 'checked';
    const [status, setStatus] = useState('');


    const handleCheckboxChange = (e) => {
        const newStatus = e.target.checked ? 'checked' : 'new';
        setStatus(newStatus)
        handleStatusChange(note.id, newStatus)
        // Update status in local storage
        localStorage.setItem(`note_${note.id}_status`, newStatus);
    }

    const handleDeleteIcon = (e) => {
        const newStatus = 'deleted';
        setStatus(newStatus)
        handleDelete(note.id, newStatus)
        // Update status in local storage
        localStorage.setItem(`note_${note.id}_status`, newStatus);
    }


    function getIcon(category) {
        switch (category) {
            case 'work':
                return <LaptopChromebookOutlinedIcon  sx={{ paddingTop: '15px', fontSize: 45, marginRight: '10px', color: yellow[700], alignItems:'center' }} />; // URL for work category image
            case 'shopping':
                return <AddShoppingCartOutlinedIcon color='primary' sx={{ paddingTop: '15px', fontSize: 45, marginRight: '10px', color: blue[700] }} />; // URL for shopping category image
            case 'car':
                return <DriveEtaOutlinedIcon color='primary' sx={{ paddingTop: '15px', fontSize: 45, marginRight: '10px', color: red[500] }} />; // URL for car category image
            case 'reminder':
                return <AlarmOutlinedIcon color='primary' sx={{ paddingTop: '15px', fontSize: 45, marginRight: '10px', color: green[700] }} />; // URL for reminder category image
            default:
                return '../assets/ayman_photo.jpg'; // Default image URL if category doesn't match
        }
    }

    const handleRestore = () => {
        const newStatus = 'new';
        setStatus(newStatus)
        handleStatusChange(note.id, newStatus)
        // Update status in local storage
        localStorage.setItem(`note_${note.id}_status`, newStatus);
    }


    return (
        <div>
            <Accordion expanded={expanded} onChange={handleExpand} sx={{
                alignItems: 'center'
            }}>
                {status === 'checked' && (
                    <div style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        background: 'rgba(20, 100, 200, 0.15)',
                        // zIndex: 1,
                    }} />
                )}
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    // id="panel1bh-header"
                    sx={{
                        height: '5px',
                    }}
                >
                    {getIcon(note.category)}

                    <Typography sx={{
                        width: '33%',
                        flexShrink: 0,
                        paddingTop: '17px',
                    }}>
                        {status === 'checked' ? <span style={{ textDecoration: 'line-through' }}>{note.title}</span> : note.title}
                    </Typography>
                    <Typography sx={{ color: 'text.secondary', paddingTop: '17px', flexGrow: 1 }}>
                        Date: {note.date}
                    </Typography>
                    <div>
                        {status === 'deleted' ? (
                            <Button size='small' onClick={handleRestore} color='primary' sx={{alignItems: 'center'}}>
                                Restore
                            </Button>) : (
                            <>
                                <IconButton aria-label="add to favorites">
                                    {/* <Checkbox {...label} /> */}
                                    <Checkbox
                                        checked={status === 'checked'}
                                        onChange={handleCheckboxChange}
                                        inputProps={{ 'aria-label': 'Checkbox demo' }}
                                    />
                                </IconButton>
                            </>
                        )}
                        <IconButton
                            onClick={() => handleDeleteIcon(note.id)}
                        >
                            <DeleteOutline sx={{ color: pink[300] }} />
                        </IconButton>
                    </div>

                </AccordionSummary>

                <AccordionDetails>
                    <Typography color='textSecondary'>
                        {note.details}
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </div>
    );
}