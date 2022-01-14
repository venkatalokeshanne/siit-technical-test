import './users.css'
import React, { useState, useEffect } from "react";
import getData, { getUsers } from "../api/APIsiit";


function Users() {
    const [userDetails, setUserDetails] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(async () => {
        const data = await getUsers()
        if (data.length > 0) {
            setUserDetails(data)
            setLoading(false)
        }
    }, [])

    return (
        <div className="text-center">
            <h1 className='color-y'>Siit Employees</h1>
            {!loading &&
                <table className='margin-auto'>
                    <thead>
                        <tr>
                            <td>Avatar</td>
                            <td>Employee Name</td>
                            <td>Position</td>
                        </tr>
                    </thead>
                    <tbody>
                        {userDetails.map((user) =>
                            <tr key={user.id}>
                                <td><img className='avatar' src={user.avatar_url}></img></td>
                                <td>{user.name}</td>
                                <td>{user.position}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            } {loading && <p>Loading employee details...</p>}
        </div>
    )
}

export default Users;