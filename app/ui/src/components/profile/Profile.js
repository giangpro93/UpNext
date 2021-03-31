import React, { Component } from 'react'
import {useState} from 'react'
import '../App.css'

const user = 'John Doe';
const email = 'johndoe@themostjoe.org';
export default function Profile() {

    const [icon] = useState('https://cdn1.iconfinder.com/data/icons/rounded-black-basic-ui/139/Photo_Add-RoundedBlack-512.png')
    //state={
    //    profileImg: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png' //default pic
    //}
    const [profileImg, setProfileImg] = useState('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png')
    const [message, setMessage] =
         useState('This is a default bio. Click on Edit Bio to change it. The text will wrap around like this automatically. All you have to do is enter your description. Thanks!')
    
    const messageHandler = () => {

    }

    const imageHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if(reader.readyState === 2)
            {
                //this.setState({profileImg: reader.result})
                setProfileImg({profileImg: reader.result})
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }

    //const {profileImg} = this.state
    return (
        <div>
            <div className="page">
                <div className="container">
                    <h1 className="heading">{user}</h1>
                    <div className="img-holder">
                        <img src={profileImg} alt="" id="img" className="img" />
                    </div>
                    <input type="file" name="image-upload" id="input" accept="image/*" onChange={imageHandler}/>
                    <div className="label">
                        <label htmlFor="input" className="image-upload">
                            <img src={icon} alt="" id="icon" className="icon" />
                            Update Profile Picture
                        </label>
                    </div>
                    <br />
                    <h2 className="email">
                        {email}
                    </h2>
                    <h3>
                        <br />
                        Bio:
                    </h3>
                    <p>
                        {message}<br /><br />
                        <button onClick={e => setMessage(e.target.value)}>Edit Bio</button>
                    </p>
                </div>
            </div>
        </div>
    )
}
