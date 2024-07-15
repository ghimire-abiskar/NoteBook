import React from 'react'
import Notes from './Notes'
import Addnote from './Addnote'
const Home = (props) => {

  return (
    <>
      <Addnote showalert={props.showAlert}></Addnote>
      <Notes showalert={props.showAlert}></Notes>
    </>
  )
}

export default Home
