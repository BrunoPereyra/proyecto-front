import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

import "../static/styles/Notes.css"

import Post_service from "../services/service"

export function Notes() {
    const [Notes, setNotes] = useState([])
    const navigate = useNavigate()

    const getNote = async () => {

        Post_service.GetNotes()
            .then(async d => {
                setNotes(d.data.res)
            }).catch(
                setNotes("error")
            )
    }
    useEffect(() => {
        let loggedUser = window.localStorage.getItem("loggedAppUser")
        if (loggedUser) {
            const userStorage = JSON.parse(loggedUser)
            Post_service.setToken(userStorage.token)
            getNote()
        } else {
            navigate("/login")
        }
    }, [])

    function showNotes() {
        if (Notes[0] == undefined || Notes == "error") {
            return (
                <div>
                    <h2>no content</h2>
                </div>
            )
        }
        else {
            return Notes.map(d => {
                return (
                    <div id="showNotes" key={d._id}>
                        <h3>{d.title}</h3>
                        <span><p>{d.description}</p></span>
                    </div>
                )
            })
        }
    }

    return (
        <section id="Notes_section">
            {
                showNotes()
            }
        </section>
    )
}