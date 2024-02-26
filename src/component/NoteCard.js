import React, { useState } from 'react'
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import { Avatar, IconButton, Typography, Checkbox, Button } from '@mui/material';
import { blue, green, pink, red, yellow } from '@mui/material/colors';
import { DeleteOutline } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';


const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));




export default function NoteCard({ note, handleDelete, handleStatusChange }) {


  const [expanded, setExpanded] = React.useState(false);

  const initialStatus = localStorage.getItem(`note_${note.id}_status`) || 'new' || 'deleted' || 'checked';
  const [status, setStatus] = useState(initialStatus);


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

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  function getImageUrl(category) {
    switch (category) {
      case 'work':
        return '../assets/work.jpg'; // URL for work category image
      case 'shopping':
        return '../assets/shopping.avif'; // URL for shopping category image
      case 'car':
        return '../assets/car.webp'; // URL for car category image
      case 'reminder':
        return '../assets/alarm.PNG'; // URL for reminder category image
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
    <>
    <Card elevation={status === 'checked' ? 0 : 3} sx={{ position: 'relative' }}>
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
      <CardHeader
        avatar={
          <Avatar
            sx={{
              // bgcolor: yellow[700]
              bgcolor: () => {
                if (note.category == 'work') {
                  return yellow[700]
                }
                if (note.category == 'reminder') {
                  return green[700]
                }
                if (note.category == 'car') {
                  return red[500]
                }
                if (note.category == 'shopping') {
                  return blue[700]
                }
              }
            }}>
            {note.category[0].toUpperCase()}
          </Avatar>
        }
        action={
          <IconButton
            onClick={() => handleDeleteIcon(note.id)}
          >
            <DeleteOutline sx={{ color: pink[300] }} />
          </IconButton>
        }
        // title={note.title}
        title={status === 'checked' ? <span style={{ textDecoration: 'line-through' }}>{note.title}</span> : note.title}
        subheader={note.category}
      />
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <CardMedia
          component="img"
          image={getImageUrl(note.category)}
          image-fluid
          alt="Note photo"
          // style={{ objectFit: 'contain' }}
          style={{
            width: '50%',
            height: '50%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        />
      </div>

      <CardContent>
        <Typography
          variant='body2'
          color='textSecondary'
        >
          Date: {note.date}
        </Typography>
      </CardContent>

      <CardActions disableSpacing>
        {status === 'deleted' ? (
          <Button size='small' onClick={handleRestore}>
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
            <Typography>{status === 'checked' ? 'Uncheck' : 'Check'}</Typography>
          </>
        )}
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>{note.details}</Typography>
        </CardContent>
      </Collapse>
    </Card>
    </>
  );
}
