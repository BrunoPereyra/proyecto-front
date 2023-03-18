import { useEffect, useState } from "react"

import { useNavigate, useSearchParams } from "react-router-dom"


import Post_service from "../../services/service"
import "../../static/styles/Profile.css"


import { Search_Result_show } from "../../components/Search_Result_show"
import { FeedbackService } from "../../components/FeedbackService"

export function ProfileUserOther() {
    const [ProfileData, setProfileData] = useState()
    const [idUserProfile, setidUserProfile] = useSearchParams()

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
            Post_service.setToken(userStorage.token)
            let idUserProfilev2 = idUserProfile.get("idUserProfile")


            Post_service.ProfileGetOther({idUserProfile:idUserProfilev2})
                .then(res => {
                    setProfileData(res.data.res)
                }).catch(err => {
                    setProfileData(err)
                    if (err.response.data.error === "token invalid or user not exist") {
                        navigate("/login")
                    }
                })
        } else {
            navigate("/login")
        }
    }
    useEffect(() => {
        profileReq()
    }, [])

    function dateDifferences(unitedfrom) {
        let Dateunitedfrom = new Date(unitedfrom);

        let DateunitedfromReturn = `
        ${Dateunitedfrom.getDay()}/
        ${Dateunitedfrom.getMonth()}/
        ${Dateunitedfrom.getFullYear()} 
        `
        return DateunitedfromReturn
    }

    function showProfileUser() {
        return typeof (ProfileData) == "object" ?
            <div id="Profile_Show_dataUser">
                <div id="Profile_Show_dataUser_section1">
                    <img id="avatar" src={ProfileData.avatar.url} alt="avatar del usuario" />
                    <div id="Profile_Show_dataUser_nameUser_otherData">
                        <h2>{ProfileData.nameUser}</h2>
                        <div id="Profile_contact_otherData_otherDatadiv">
                            <h5>{ProfileData.fullName}</h5>
                            <h5>{dateDifferences(ProfileData.date)}</h5>
                        </div>
                    </div>
                </div>
                <div id="Profile_description_user">
                    <h5>Lorem, ipsum dolor sit amet consectetur
                        adipisicing elit. Porro dignissimos et
                        corrupti veniam, quis reprehenderit asper
                        iores vel? Quos nostrum ipsa deleniti sunt
                        , sapiente voluptatem, rerum ipsam expedita
                        nobis explicabo dolorum?
                    </h5>
                </div>
                <div id="Profile_contact">
                    <div id="Profile_contact_contactdiv">
                        <div className="Profile_contact_contactdiv_specific Profile_contact_contactdiv_specific_Number">
                            <h3>Number:</h3>
                            <h4>{ }</h4>
                        </div>
                        <div className="Profile_contact_contactdiv_specific Profile_contact_contactdiv_specific_Gmail">
                            <h3>Email:</h3>
                            <h4>{ProfileData.Email}</h4>
                        </div>
                    </div>
                </div>
                <div id="profile_user_services">
                    {ProfileData.servicesSoldUser.map(Service => {
                        return <div id="ServiceTheUser" key={Service._id} onClick={() => navigate(`/services?id=${Service._id}`)}>
                            <Search_Result_show average={calculateAverage(Service.stars)} Service={Service} />
                        </div>
                    })}
                </div>
                <div>
                    <FeedbackService FeedbackServiceData={ProfileData.FeedbackService} />
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