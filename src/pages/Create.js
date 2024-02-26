import React, { useState } from 'react'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined';
import { styled } from '@mui/material/styles';      //custome style
import { deepOrange, orange, red } from '@mui/material/colors';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { TextField, InputAdornment } from '@mui/material';





export default function Create() {

    const [title, setTitle] = useState('');
    const [details, setDetails] = useState('');
    const [date, setDate] = useState(null);
    const [titleError, setTitleError] = useState(false);
    const [detailsError, setDetailsError] = useState(false);
    const [dateError, setDateError] = useState(false);
    const [category, setCategory] = useState('work');
    const navigate = useNavigate();


    const handleSubmit = (e) => {
        e.preventDefault();
        setTitleError(false);
        setDetailsError(false);
        setDateError(false);

        if (title === '') {
            setTitleError(true)
        }
        if (details === '') {
            setDetailsError(true)
        }
        if (date === '') {
            setDateError(true)
        }
        if (title && details && date) {
            const note = {
                title,
                details,
                category,
                date,
                status: "new" // Add the "status" property with the initial value "new"
            };
            // console.log(title + details + category)
            fetch('http://localhost:3004/notes', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                body: JSON.stringify(note)
            }).then(() => navigate('/'))
        }
    }

    /* custome style */
    const TestButton = styled(Button)(() => ({
        color: 'red',
        backgroundColor: orange[200],
        fontSize: 26,
        textTransform: 'none',
        borderRadius: '80px',
        "&:hover": {
            background: deepOrange[800]
        },
    }));



    return (
        <Container
            sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
            }}
        >
            <Typography
                variant='h6'
                component='h2'
                color='textSecondary'
                gutterBottom
            >
                Creat a New Note
            </Typography>
            <form onSubmit={handleSubmit} noValidate autoComplete='off'>
                <TextField
                    onChange={(e) => setTitle(e.target.value)}
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2
                    }}
                    label='Note Title'
                    variant='outlined'
                    color='primary'
                    fullWidth
                    required
                    error={titleError}
                />
                <TextField
                    type="date"
                    value={date ? format(date, 'yyyy-MM-dd') : ''}
                    // onChange={(event) => {
                    //     const { value } = event.target;
                    //     setDate(value ? new Date(value) : null);
                    // }}
                    onChange={(e) => setDate(e.target.value)}
                    label="Note Date"
                    variant="outlined"
                    color="primary"
                    fullWidth
                    required
                    error={dateError}
                    sx={{
                        marginTop: 2,
                        marginBottom: 2,
                    }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position=""></InputAdornment>
                        ),
                    }}
                />

                <TextField
                    onChange={(e) => setDetails(e.target.value)}
                    sx={{
                        marginTop: 2,
                        marginBottom: 2,
                    }}
                    label='Details'
                    variant='outlined'
                    color='primary'
                    fullWidth
                    multiline
                    rows={6}
                    required
                    error={detailsError}
                />
                <FormControl
                    sx={{
                        marginTop: 2,
                        marginBottom: 2,
                    }}
                >
                    <FormLabel>Note Category</FormLabel>
                    <RadioGroup value={category} onChange={(e) => setCategory(e.target.value)}>
                        <FormControlLabel value='work' label='work' control={<Radio />} />
                        <FormControlLabel value='reminder' label='reminder' control={<Radio />} />
                        <FormControlLabel value='car' label='car' control={<Radio />} />
                        <FormControlLabel value='shopping' label='shopping' control={<Radio />} />
                    </RadioGroup>
                </FormControl>
                <div>
                    <Button
                        sx={{
                            marginTop: 2,
                            marginBottom: 2,
                        }}
                        // onClick={() => console.log('clicked')}
                        type='submit'
                        variant='outlined'
                        color='primary'
                        endIcon={<KeyboardArrowRightOutlinedIcon />}
                    >
                        SUBMIT
                    </Button>
                </div>
            </form>
        </Container>
    )
}
