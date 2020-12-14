import {Field, Form, Formik} from "formik";
import React, { useState} from "react";
import './style.css';
import SuccessLogged from "./SuccessLogged";



const LoginForm: React.FC = () => {
    const [isLogged, setIsLogged] = useState<boolean>(false);
    const [emailState, setEmailState] = useState<string>('');
    const [passwordState, setPasswordState] = useState<string>('');
    const [responseToken, setResponseToken] = useState<any>('');
    const [userInfo, setUserInfo] = useState<any>('');

    const getUserInfo = async (accessToken: string) => {
        const auth = `Bearer ${accessToken}`;

        let result = await fetch('https://tager.dev.ozitag.com//api/tager/user/profile', {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Authorization": auth
            }
        }).then(response => {
            return response.json();
        })
        setUserInfo(result);
    }

    const handleSubmit = () => {

        let user = {
            "clientId": 1,
            "email": emailState,
            "password": passwordState
        }

        fetch('https://tager.dev.ozitag.com/api/auth/user', {
            method: 'POST',
            mode: 'cors',
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
            })
            .then(infoFetch => {
                setResponseToken(infoFetch.data.accessToken);
                getUserInfo(infoFetch.data.accessToken)
            })
            .catch(err => {
                console.log(err)
            })

        setEmailState('');
        setPasswordState('');
        setIsLogged(true);
    }

    const changeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmailState(event.target.value);
    }
    const changePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordState(event.target.value);
    }

    const handleExit = () => {
        const auth = `Bearer ${responseToken}`;

        fetch('https://tager.dev.ozitag.com/api/tager/user/profile/logout', {
            method: 'POST',
            headers: {
                "Accept": "application/json",
                "Authorization": auth
            }
        })
            .then(response => {
                if (response.ok) {
                    setIsLogged(false);
                    setUserInfo('');
                    setResponseToken('');
                }
            })
    }

    const form = () =>
        <Formik
            initialValues={{email: emailState, password: passwordState}}
            onSubmit={handleSubmit}
        >

            {({errors, touched}) => (
                <Form>

                    <label htmlFor="email">Email</label>
                    <Field onChange={changeEmail} name="email" type="email" value={emailState} placeholder="email"/>
                    {errors.email && touched.email ? <div>{errors.email}</div> : null}

                    <label htmlFor="email">Password</label>
                    <Field onChange={changePassword} value={passwordState} name="password" placeholder="password"/>

                    <button type="submit" className="waves-effect waves-light btn-large">Submit</button>
                </Form>
            )}
        </Formik>


    return (
        <div>
            <h3>Login form</h3>
            {isLogged && userInfo ? <SuccessLogged {...userInfo} onExit={handleExit}/> : form()}
        </div>

    )
}

export default LoginForm;