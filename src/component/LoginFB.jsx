/* global FB */
import {useEffect, useState} from "react"
import useStore from "../store/store.js"

const LOGIN_STATUS = {
    UNKNOWN: "unknown",
    CONNECTED: "connected",
    NOT_AUTHORIZED: "not_authorized",
}

function LoginFB({ appId, classLogout }) {
    const [isLogin, setIsLogin] = useState(false)
    const { userData, login, logout } = useStore()

    const handleLogin = (response) => {
        if (response.status === LOGIN_STATUS.CONNECTED) {
            setIsLogin(true)
            if (Object.keys(userData).length === 0) {
                FB.api("/me?fields=id,name,email", function (response) {
                    login(response)
                })
            }
        } else {
            setIsLogin(false)
        }
    }

    useEffect(() => {
        FB.init({
            appId: appId,
            cookie: true,
            xfbml: true,
            version: "v11.0",
        })

        FB.getLoginStatus(function (response) {
            handleLogin(response)
        })
    }, [appId])

    FB.Event.subscribe("auth.statusChange", function (response) {
        handleLogin(response)
    })

    return (
        <div id="fb-root">
            <div
                style={{ display: isLogin ? "none" : "block" }}
                className="fb-login-button"
                data-width="200"
                data-size="medium"
                data-button-type="continue_with"
                data-layout="default"
                data-auto-logout-link="false"
                data-use-continue-as="true"
                scope="public_profile, email"
            ></div>

            <button
                style={{ display: isLogin ? "block" : "none" }}
                className={classLogout}
                onClick={() => {
                    FB.logout()
                    logout()
                }}
            >
                Logout
            </button>
        </div>
    )
}

export default LoginFB
