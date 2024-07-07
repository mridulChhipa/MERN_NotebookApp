import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [credentials, setCredentials] = useState({ email: '', password: '' })

    let navigate = useNavigate()


    const handleSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch('http://localhost:8000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: credentials.email,
                password: credentials.password
            })
        })
        const json = await response.json()

        if (json.success) {
            localStorage.setItem('token', json.authToken)
            navigate("/")
        }

    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value })
    }
    return (
        <form onSubmit={handleSubmit}>
            <h1>Log in</h1>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" value={credentials.email} name='email' onChange={onChange} className="form-control" id="email" />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="Password1" className="form-label">Password</label>
                <input type="password" value={credentials.password} name='password' onChange={onChange} className="form-control" id="Password1" />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
        </form>
    )
}
