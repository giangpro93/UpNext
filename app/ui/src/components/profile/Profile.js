import React, { Component } from 'react'
import {useState} from 'react'
import '../App.css'
import { useSelector } from 'react-redux'
import { Edit } from './Edit'

const api = require('../../api-client/api.js');
const user = 'User';
const email = 'user@user.com';


export default function Profile() {
    
    //to get user info
    const currentUser = useSelector(state => state.users.currentUser);
    var userId = currentUser['id'];

    //upload icon
    const [icon] = useState('https://cdn1.iconfinder.com/data/icons/rounded-black-basic-ui/139/Photo_Add-RoundedBlack-512.png')
    //blank profile pic
    const [profileImg, setProfileImg] = useState('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png')
    //bio message
    const [message, setMessage] =
         useState('This is a default bio. Click on Edit Bio to change it. The text will wrap around like this automatically. All you have to do is enter your description. Thanks!')
    
    const messageHandler = () => {

    }

    //image preview
    const imageHandler = (e) => {
        const reader = new FileReader();
        reader.onload = () => {
            if(reader.readyState === 2)
            {
                setProfileImg(reader.result)
            }
        }
        reader.readAsDataURL(e.target.files[0])
    }

    //render
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
                        <Edit />
                    </p>
                </div>
            </div>
        </div>
    )
}
