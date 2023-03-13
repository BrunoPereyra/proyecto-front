import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import Post_service from "../services/service"
import "../static/styles/Profile.css"
import { Search_Result_show } from "../components/Search_Result_show"

export function Profile() {
    const [ProfileData, setProfileData] = useState()

    const navigate = useNavigate()

    function calculateAverage(arr) {
        let suma = 0
        for (let i = 0; i < arr.length; i++) {
            suma += arr[i]
        }
        const Average = suma / arr.length
        return Average
    }

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
            <div id="Profile_Show_dataUser">
                <div id="Profile_Show_dataUser_section1">
                    <img id="avatar" src={ProfileData.avatar.url} alt="avatar del usuario" />
                    <div id="Profile_Show_dataUser_nameUser_otherData">
                        <h2>{ProfileData.nameUser}</h2>
                        <div id="Profile_contact_otherData_otherDatadiv">
                            <h5>{ProfileData.fullName}</h5>
                            <h5>unido desde</h5>
                        </div>
                    </div>
                </div>
                <div id="Profile_contact">
                    <div id="Profile_contact_contactdiv">
                        <h3>contact</h3>
                    </div>
                </div>
                <div id="profile_user_services">
                    <div id="ServiceTheUser">
                        {ProfileData.servicesSoldUser.map(Service => {
                            return <Search_Result_show key={Service.id} average={calculateAverage(Service.stars)} Service={Service} />
                        })}
                    </div>
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