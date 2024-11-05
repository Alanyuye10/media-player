// rafce

import React from 'react'
import { Link } from 'react-router-dom'
import LandingImg from '../assets/music.gif'
import feature1 from '../assets/1mg1.webp'
import feature2 from '../assets/img2.avif'
import feature3 from '../assets/img3.jpg'
import { Card } from 'react-bootstrap'

const Landing = () => {
  return (
    <div style={{ paddingTop: '100px' }} className='container'>
      <div className="row align-items-center">
        <div className="col lg-5">
          <h3>Welcome to <span className='text-warning'>Media Player</span></h3>
          <p style={{ textAlign: 'justify' }}>Media Player App will allow user to add or remove their uploaded videos from youTube and also allow them to arrange it in different categories by drag and drop. User can also have the provision to manage their watch history as well. What are you waiting for, let starts exploring our site!!!</p>
          <Link to={'/home'} className='btn btn-info'>Get Started</Link>
        </div>
        <div className="col lg-6">
          <img className='img-fluid ms-5' src={LandingImg} alt="noimg" />
        </div>
      </div>
      {/* featuers part */}
      <div className="my-5">
        <h3 className="text-center">Featuers</h3>
        <div className="row mt-5">
          <div className="col-lg-4">
            <Card className='p-2' style={{ width: '22rem' }}>
              <Card.Img height={'250px'} variant="top" src={feature1} />
              <Card.Body>
                <Card.Title>Cate</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the
                  bulk of the card's content.
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className="col-lg-4">
            <Card className='p-2' style={{ width: '22rem' }}>
              <Card.Img height={'250px'} variant="top" src={feature2} />
              <Card.Body>
                <Card.Title>Categorise Videos</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the
                  bulk of the card's content.
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
          <div className="col-lg-4">
            <Card className='p-2' style={{ width: '22rem' }}>
              <Card.Img height={'250px'} variant="top" src={feature3} />
              <Card.Body>
                <Card.Title>Managing Histo</Card.Title>
                <Card.Text>
                  Some quick example text to build on the card title and make up the
                  bulk of the card's content.
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>
      </div>
      {/* last */}
      <div className="my-5 row align-items-center border rounded p-5">
        <div className="col-lg-5">
          <h3 className="text-warning">Simple, Fast and Powerful</h3>
          <p style={{textAlign:'justify'}}> <span className='fs-5 fw-bolder'>Play Everything</span> : Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia possimus aspernatur soluta nemo velit totam ab perspiciatis! Dicta earum ratione dolorem aliquam ullam cum ea enim ipsam fugit, fuga debitis? </p>
          <p style={{textAlign:'justify'}}> <span className='fs-5 fw-bolder'>Categorise Videos</span> : Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia possimus aspernatur soluta nemo velit totam ab perspiciatis! Dicta earum ratione dolorem aliquam ullam cum ea enim ipsam fugit, fuga debitis? </p>
          <p style={{textAlign:'justify'}}> <span className='fs-5 fw-bolder'>Managing History</span> : Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia possimus aspernatur soluta nemo velit totam ab perspiciatis! Dicta earum ratione dolorem aliquam ullam cum ea enim ipsam fugit, fuga debitis? </p>
        </div>
        <div className="col"></div>
        <div className="col-lg-6">
        <iframe width="100%" height="340" src="https://www.youtube.com/embed/ulyrbF6T9yY?si=qMbIshDWMZgo_-3S" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
        </div>
      </div>
    </div>
  )
}

export default Landing