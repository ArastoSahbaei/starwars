import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Modal from '@material-ui/core/Modal'
import Backdrop from '@material-ui/core/Backdrop'
import Fade from '@material-ui/core/Fade'
import './Modal.css'

const useStyles = makeStyles((theme) => ({
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}))

export default function TransitionsModal(props) {
    const classes = useStyles()
    const [open, setOpen] = useState(false)
    const [people, setPeople] = useState([])

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    const openModal = () => {
        if (!open) handleOpen()
    }

    useEffect(() => {
        const promiseArray = []
        props.choosenMovie.characters.forEach(c => {
            promiseArray.push(fetch(c).then(res => res.json()))
            Promise.all(promiseArray).then(res => {
                setPeople(res)
            })
        })
    }, [props.choosenMovie.characters])

    return (
        <div onClick={openModal}>
            {props.children}
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className="modal"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    <div className={classes.paper}>
                        <div className="exitModal" onClick={() => handleClose()}>Close</div>
                        <p className="title" id="transition-modal-title">{props.choosenMovie.title}</p>
                        <p className="characters">Characters</p>
                        <div className="characterNameList">
                            {people.map((p, i) => {
                                return <div className="titleName" key={i}>{p.name}</div>
                            })}
                        </div>
                    </div>
                </Fade>
            </Modal>
        </div>
    )
}