import { useSession } from "next-auth/react"
import { useEffect, useMemo, useState } from "react";
import Layout from '../components/Layout'
import Login from "../components/login";

const IndexPage = () => {
    const { status } = useSession();
    const [isAuthenticated, setIsAuthenticated] = useState(status === 'authenticated');
    useEffect(() => {
        setIsAuthenticated(status === 'authenticated');
        console.log({isAuthenticated})
    }, [status])
    // console.log({isAuthenticated})
    // console.log(typeof status)
    // console.log({status})
    // console.log(`${status} === 'authenticated' : ${status.toString() === 'authenticated'}`)

    const authenticatedView = () => {
        return (
            <>
                <h1>Finkita home</h1>
            </>
        )
    }
    return (
      <Layout title="Home | Finkita">
        {
            isAuthenticated
            ? authenticatedView
            : <Login/>
        }
      </Layout>
    )
}

export default IndexPage
