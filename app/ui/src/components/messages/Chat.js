import React, { useState } from 'react'
import firebase from 'firebase/app'
import { makeStyles, TextField } from '@material-ui/core'
import 'firebase/firestore'
import 'firebase/auth'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useCollectionData } from 'react-firebase-hooks/firestore'
//import { messages } from '../../api-client/api'

firebase.initializeApp({
    apiKey: "AIzaSyAFTuPh1eWfctjZMcAl28F6oVyAT-NhJZ0",
    authDomain: "upnextchat.firebaseapp.com",
    projectId: "upnextchat",
    storageBucket: "upnextchat.appspot.com",
    messagingSenderId: "415249808264",
    appId: "1:415249808264:web:9ee5b0d6192c80e0ea583d",
    measurementId: "G-4VQWZPV028"
})
firebase.analytics()

const auth = firebase.auth()
const firestore = firebase.firestore()
const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        height: '100%'
    },
    textField: {
        bottom: '0px',
        backgroundColor: 'white',
        marginLeft: '30px',
        color: 'black'
    }
}))

function ChatRoom() {
    const messagesRef = firestore.collection('messages')
    const query = messagesRef.orderBy('createdAt').limit(25)

    const [messages] = useCollectionData(query, {idField: 'id'})
    const [formValue, setFormValue] = useState('')

    const sendMessage = async(e) => {
        e.preventDefault()
        const { uid } = auth.currentUser

        await messagesRef.add({
            text: formValue,
            createdAt: firebase.firestore.FieldValue.serverTimestamp(),
            uid
        })

        setFormValue('')
    }

    return (
        <>
            <div>
                {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
            </div>

            <form onSubmit={sendMessage}>
                <input value={formValue} onChange={(e) => setFormValue(e.target.value)}/>

                <button type="submit">Send</button>
            </form>

        </>
    )

}

function ChatMessage(props) {
    const { text, uid } = props.message

    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received'
    return (
        <div className={'message ${messageClass}'}>
            <p>{text}</p>
        </div>
    )
}

export default function Chat() {
    const classes = useStyles()
    return (
        <>
            <div>
                <ChatRoom />
            </div>
        </>
    )
}