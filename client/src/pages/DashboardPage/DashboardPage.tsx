import axios from "axios"
import React, { Fragment, useState, useEffect } from "react"
import { AuthPageProps } from "../LoginPage/LoginPage.interface"

function DashboardPage({setAuth}: AuthPageProps){
    const [name, setName] = useState("")

    async function getName() {
        try {
            const response = await axios.get("http://localhost:8000/dashboard/",{headers:{token: localStorage.token}})
            setName(response.data.user_name)
        } catch (err: unknown) {
            if (err instanceof Error) {
              console.error(err.message);
              //toast.error("An error occurred during login. Please try again.")
            } else {
              console.error('An unknown error occurred', err);
            }
          }
    }

    const logout = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault()
        localStorage.removeItem("token")
        setAuth(false)
    }

    useEffect(() => {
        getName()
    },[])
    return(
        <Fragment>
            <h1>Dashboard {name}</h1>
            <button
                className="btn btn-primary"
                onClick={e => logout(e)}
            >Log out</button>

        </Fragment>
    )
}
export default DashboardPage