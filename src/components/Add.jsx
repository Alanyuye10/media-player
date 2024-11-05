// rafce

import { Modal, Button, Form, FloatingLabel } from 'react-bootstrap'
import React, { useState } from 'react'
import { saveVideoAPI } from '../services/allAPI'

const Add = ({setAddResponseFromHome}) => {

    const [InvalidYoutubeLink, setInvalidYoutubeLink] = useState(false)
    const [videoDetails, setVideoDetails] = useState({
        caption: "", imgUrl: "", youTubeLink: ""
    })
    console.log(videoDetails);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const extractingEmbededLinkFromYoutubeLink = (userInputYoutubeLink) => {
        // steps creating link from youtube links
        if (userInputYoutubeLink.includes("https://www.youtube.com/watch?v=")) {
            console.log(userInputYoutubeLink.split("v=")[1].slice(0, 11));
            const videoId = userInputYoutubeLink.split("v=")[1].slice(0, 11)
            setInvalidYoutubeLink(false)
            setVideoDetails({ ...videoDetails, youTubeLink: `https://www.youtube.com/embed/${videoId}` })
        } else {
            // alert("Invalid Youtube Link, please try with Other Link")
            setInvalidYoutubeLink(true)
            setVideoDetails({ ...videoDetails, youTubeLink: "" })
        }
    }

    const handleUploadVideo = async () => {
        // object destructure : const (key1 ,key2....) = object.name
        const { caption, imgUrl, youTubeLink } = videoDetails
        if (caption && imgUrl && youTubeLink) {
            // store video details permenantly
            // alert("proceed to store video details permenantly")
            try {
                const result = await saveVideoAPI(videoDetails)
                console.log(result);
                if (result.status >= 200 && result.status < 300) {
                    // video added to json file
                    alert("Video uploaded Successfully")
                    handleClose()
                    // pass result to view component
                    setAddResponseFromHome(result)
                } else {
                    console.log(result);
                }
            } catch (err) {
                console.log(err);
            }
        } else {
            alert("Please Fill the Form First")
        }
    }

    return (
        <>
            <div className="d-flex align-items-center">
                <h5>Upload New Video</h5>
                <button onClick={handleShow} className="btn btn-warning ms-3 rounded-circle fw-bolder fs-5">+</button>
            </div>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Uploading video Details</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="border rounded p-3">
                        <FloatingLabel className='mt-2' controlId="floatingCaption" label="Video Caption">
                            <Form.Control onChange={e => setVideoDetails({ ...videoDetails, caption: e.target.value })} type="text" placeholder="Video Caption" />
                        </FloatingLabel>
                        <FloatingLabel className='mt-2' controlId="floatingUrl" label="Video Image Url">
                            <Form.Control onChange={e => setVideoDetails({ ...videoDetails, imgUrl: e.target.value })} type="text" placeholder="Video Image Url" />
                        </FloatingLabel>
                        <FloatingLabel className='mt-2' controlId="floatingLink" label="Video Youtube Link">
                            <Form.Control onChange={e => extractingEmbededLinkFromYoutubeLink(e.target.value)} type="text" placeholder="Video Youtube Link" />
                        </FloatingLabel>
                        {
                            InvalidYoutubeLink &&
                            <div className="text-danger fw-bolder">Invalid Youtube Link, please try with Other Link</div>
                        }
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button onClick={handleUploadVideo} className='btn btn-info' variant="primary">Add</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default Add