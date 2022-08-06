import React, { useEffect, useState } from "react";
import axios from 'axios';
// import { ethers } from 'ethers ';

import emailCSS from './email.module.css';
import Drag from '../drag/drag';
import { useFormik } from 'formik';
import Head from '../header2/head';

const App = () => {
  // const [message, setMessage] = useState('');
  // const [sender, setSender] = useState('');
  // const [name, setName] = useState('');
  // const [reciever, setReciever] = useState('');
  const [file, setFile] = useState();

  function handleChange(event) {
    setFile(event.target.files[0])
  }

  function handleSubmit(event) {
    event.preventDefault()
    const url = 'http://localhost:5000/uploadInfo';
    const formData = new FormData();
    formData.append('file', file);
    formData.append('fileName', file.name);
    formData.append('sender', "arrjun@gmail");
    formData.append('reciever', "vaibhav@gmail.com");
    formData.append('name', "name");
    formData.append('subject', "subject");
    formData.append('message', "message");
    // setMessage(event.target.value)
    // setName(event.target.value)
    // setReciever(event.target.value)
    // setSender(event.target.value)


    const config = {
      headers: {
        'content-type': 'multipart/form-data',
      },
    };
    axios.post(url, formData, config).then((response) => {
      console.log(response);
    });

  }
  {/* <form className={form} onSubmit={handleSubmit}>
<div>
  <input
  type="email"
  
  />
</div>
 <input type="file" onChange={handleChange}/>

 <button type="submit">Upload</button>
</form> */}
  return (
    <div className={emailCSS.parent}>
      <form className={emailCSS.form} onSubmit={handleSubmit}>
        <div>
          <span className={emailCSS.divSpans}>Welcome</span>
        </div>
        <div className={emailCSS.divv}>
          <input className={emailCSS.input}
            name="sender"
            type="email"
            placeholder="sender address"
            // value={sender}
            // onChange={event => handleChange(event)}
          />
        </div>
        <div className={emailCSS.divv}>
          <input className={emailCSS.input}
            name="reciever"
            type="email"
            placeholder="reciever address"
            // value={reciever}
            // onChange={event => handleChange(event)}
          />
        </div>
        <div className={emailCSS.divv}>
          <input className={emailCSS.input}
            name="name"
            type="text"
            placeholder="name"
            // value={name}
            // onChange={event => handleChange(event)}
          />
        </div>
        <div className={emailCSS.divv}>
          <input className={emailCSS.input}
            type="text"
            name="message"
            placeholder="Message"
            // value={message}
            // onChange={event => handleChange(event)}
          />
        </div>
        <div className={emailCSS.drag}>
          <input type="file" onChange={handleChange} />
        </div>
        <button type="submit">Upload</button>
      </form>
    </div>
  );

}

export default App;
