import React, { Component } from 'react'
import {useState} from 'react'
import '../App.css'
import { useSelector } from 'react-redux'
import { Edit } from './Edit'

const api = require('../../api-client/api.js');
const user = 'User User';
const email = 'user@user.com';


export default function Profile() {
    
    //to get user info
    const currentUser = useSelector(state => state.users.currentUser);
    var userId = currentUser['id'];
    const dauser = api.users.getById(userId);

    //upload icon
    const [icon] = useState('https://cdn1.iconfinder.com/data/icons/rounded-black-basic-ui/139/Photo_Add-RoundedBlack-512.png')
    //blank profile pic
    const [profileImg, setProfileImg] = useState('https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png')

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
                        {email} <br /><br />
                    </h2>
                    <div className="container2">
                        <h3 className="friends">- - - - - - - - Friends - - - - - - - -</h3>
                    </div>
                    <h4>
                        <br />
                        Bio:
                    </h4>
                    <p>
                        <Edit />
                    </p>
                </div>
            </div>
        </div>
    )
}
