import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Post_service from "../services/service"
import "../static/styles/Profile.css"

export function Profile() {
    const [ProfileData, setProfileData] = useState()

    const navigate = useNavigate()

    async function profileReq() {
        let loggedUser = window.localStorage.getItem("loggedAppUser")
        if (loggedUser) {
            const userStorage = JSON.parse(loggedUser)
            await Post_service.setToken(userStorage.token)

            Post_service.ProfileGet()
                .then(res => {
                    setProfileData(res.data.res)
                }).catch(err => {
                    setProfileData(err)
                    console.log("Error");
                })
        } else {
            navigate("/login")
        }
    }
    useEffect(() => {
        profileReq()
    }, [])
    function showProfileUser() {
        console.log(ProfileData)
        return typeof (ProfileData) == "object" ?
            <div id="Profile_div">
                <div id="profile_user">
                    <span>avatar</span>
                    <h2>{ProfileData.nameUser}</h2>
                    <h3>{ProfileData.fullName}</h3>
                </div>

            </div>
            :
            <div>

            </div>
    }

    return (
        <section id="Profile_section">
            {
                showProfileUser()
            }
        </section>
    )
}