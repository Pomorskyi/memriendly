import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useNavigate  } from 'react-router-dom'
import { useAuth } from '../../../Services/Contexts/AuthContext'

function SignUp() {
    const [isSignUp, setIsSignUp] = useState(false);
    const [isForgotPassword, setIsForgotPassword] = useState(false);
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const passwordConfirmRef = useRef()
    const { signup, login, resetPassword } = useAuth()
    const [error, setError] = useState('')
    const [info, setInfo] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate  = useNavigate()

    async function handleSubmitSignUp(e){
        e.preventDefault()

        if(password !== passwordConfirmRef.current.value){
            return setError('Passwords do not match')
        }

        try {
            setError('')
            setLoading(true)
            await signup(email, password)
            navigate("/")
        } catch(e) {
            setError('Failed to create an account. Try again')
        }
        setLoading(false)
    }

    async function handleSubmitLogIn(e){
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            await login(email, password)
            navigate("/")
        } catch(e) {
            setError(`${e.code === 'auth/user-not-found'? 'User not found. Create an account first' : 
                    e.code === 'auth/wrong-password' ? 'Wrong password' : 'Failed to log in. Unknown error. Try again'
                }`)
        }
        setLoading(false)
    }

    async function handleSubmitForgotPassword(e){
        e.preventDefault()

        try {
            setError('')
            setLoading(true)
            await resetPassword(email)
                .then(res => { setInfo('Email has been sent') })
                .catch(err => { setError('Email has not been sent. Try again') })
        } catch(e) {
            setError(`${e}`)
        }
        setLoading(false)
    }

    function handleToggleState(isChangeToLogIn){
        setInfo('')
        if(isChangeToLogIn){
            setIsSignUp(false)
        } else {
            setIsSignUp(true)
        }
    }

    function handleEmailChange(event){
        setEmail(event.target.value)
    }

    function handlePasswordChange(event){
        setPassword(event.target.value)
    }


  return (
    <>
    {/*TODO: Change card for new styles from Telegram own messages */}
        <Card className="w-100">
            {isForgotPassword && 
                <Card.Body>
                <h2 className="text-center mb-4">Password Reset</h2>
                {error && <Alert variant="danger">{error}</Alert>}
                {info && <Alert variant="primary">{info}</Alert>}
                <Form onSubmit={handleSubmitForgotPassword}>
                    <Form.Group id="email">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" value={email} onChange={handleEmailChange} required />
                    </Form.Group>
                    <Button disabled={loading} className="w-100 mt-4" type="submit">
                        Reset Password
                    </Button>
                </Form>
                <div className="w-100 text-center mt-2">
                    <button onClick={() => {setIsForgotPassword(false); setInfo('')}}>Log In</button>
                </div>
            </Card.Body>
            }
            { !isForgotPassword && isSignUp && 
                <Card.Body>
                    <h2 className="text-center mb-4">Sign Up</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmitSignUp}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" value={email} onChange={handleEmailChange} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" value={password} onChange={handlePasswordChange} required />
                        </Form.Group>
                        <Form.Group id="password-confirmation">
                            <Form.Label>Password Confirmation</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} required />
                        </Form.Group>
                        <Button disabled={loading} className="w-100 mt-4" type="submit">
                            Sign Up
                        </Button>
                    </Form>
                    <div className="w-100 text-center mt-2">
                        Already have an account? <button onClick={() => {handleToggleState(true)}}>Log In</button>
                    </div>
                </Card.Body>
            }
            { !isForgotPassword && !isSignUp && 
                <Card.Body>
                    <h2 className="text-center mb-4">Log In</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmitLogIn}>
                        <Form.Group id="email">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" value={email} onChange={handleEmailChange} required />
                        </Form.Group>
                        <Form.Group id="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" value={password} onChange={handlePasswordChange} required />
                        </Form.Group>
                        <Button disabled={loading} className="w-100 mt-4" type="submit">
                            Log In
                        </Button>
                    </Form>
                    <div className="w-100 text-center mt-2">
                        <button onClick={() => {setIsForgotPassword(true); setInfo('')}}>Forgot password?</button>
                    </div>
                    <div className="w-100 text-center mt-2">
                        Need an account? <button onClick={() => {handleToggleState(false)}}>Sign Up</button>
                    </div>
                </Card.Body>
            }
        </Card>
    </>
  )
}

export default SignUp