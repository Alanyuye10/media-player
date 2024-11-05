// rafce

import React, { useEffect, useState } from 'react'
import { Modal, Form, FloatingLabel, Button } from 'react-bootstrap'
import { deleteCategoryAPI, getAllCategoryAPI, removeVideoAPI, saveCategoryAPI, updateCategoryAPI } from '../services/allAPI';
import VideoCard from './videoCard';

const Category = ({ setDeleteResponseFromCategory }) => {
  const [allCategories, setAllCategories] = useState([])
  const [categoryName, setCategoryName] = useState("")
  const [show, setShow] = useState(false);

  useEffect(() => {
    getAllCategory()
  }, [])

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSaveCategory = async () => {
    if (categoryName) {
      const categoryDetails = { categoryName, allVideos: [] }
      try {
        const result = await saveCategoryAPI(categoryDetails)
        if (result.status >= 200 && result.status < 300) {
          alert("Category created Successfully")
          getAllCategory()
          handleClose()
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("Please provide a name to your Category")
    }
  }

  const getAllCategory = async () => {
    try {
      const result = await getAllCategoryAPI()
      if (result.status >= 200 && result.status < 300) {
        setAllCategories(result.data)
      }
    } catch (err) {
      console.log(err);
    }
  }

  console.log(allCategories);

  const removeCategory = async (id) => {
    try {
      await deleteCategoryAPI(id)
      getAllCategory()
    } catch (err) {
      console.log(err);
    }
  }

  const dragOverCategory = (e) => {
    e.preventDefault()
  }

  const VideoCardDropOverCategory = async (e, categoryDetails) => {
    console.log("Inside VideoCardDropOverCategory");
    const videoDetails = JSON.parse(e.dataTransfer.getData("videoDetails"))
    console.log(videoDetails);
    // update category by add video to its allVideos
    categoryDetails.allVideos.push(videoDetails)
    console.log(categoryDetails);
    // api call to make update the category
    await updateCategoryAPI(categoryDetails)
    const result = await removeVideoAPI(videoDetails.id)
    setDeleteResponseFromCategory(result)
  }

  return (
    <>
      <div className="d-flex justify-content-around">
        <h3>All Categories</h3>
        <button onClick={handleShow} className="btn btn-warning ms-3 rounded-circle fw-bolder fs-5">+</button>
      </div>

      {/* display all category */}
      <div className="container-fluid mt-3">
        {/* single category view */}
        {
          allCategories?.length > 0 ?
            allCategories?.map(categoryDetails => (
              <div droppable="true" onDragOver={dragOverCategory} onDrop={e => VideoCardDropOverCategory(e, categoryDetails)} key={categoryDetails?.id} className="border rounded p-3 mb-3">
                <div className="d-flex justify-content-between">
                  <h5>{categoryDetails?.categoryName}</h5>
                  <button onClick={() => removeCategory(categoryDetails?.id)} className="btn"><i className="fa-solid fa-trash text-danger"></i></button>
                </div>
                {/* display category videos */}
                <div className="row row mt-2">
                  {
                    categoryDetails?.allVideos?.length > 0 &&
                    categoryDetails?.allVideos?.map(video => (
                      <div key={video?.id} className="col-lg-4">
                        {/* video card */}
                        <VideoCard insideCategory={true} displayData={video} />
                      </div>
                    ))
                  }
                </div>
              </div>
            ))
            :
            <div className='fw-bolder text-danger fs-5'>No Categories are added yet</div>
        }
      </div>

      <Modal centered show={show} onHide={handleClose} backdrop="static" keyboard={false}  >
        <Modal.Header closeButton>
          <Modal.Title> Add Category Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FloatingLabel className='mt-2' controlId="floatingCategoryName" label="Category Name">
            <Form.Control onChange={e => setCategoryName(e.target.value)} type="text" placeholder="Category Name" />
          </FloatingLabel>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSaveCategory} variant="primary">Add</Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Category