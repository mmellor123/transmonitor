import {useRef, useState, useEffect} from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from './auth';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Logo } from "../scenes/global/flower.svg";
import {BASE_URL} from "../common/functions"
import {Box} from '@mui/material';
import axios from "../api/axios";

const USER_REGEX = /^[a-zA-Z0-9_]{5,}[a-zA-Z]+[0-9]*$/;
const PWD_REGEX = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;


export const Login = () => {
    const userRef = useRef();
    const errRef = useRef();
    
    const { setToken} = useAuth();
    const navigate = useNavigate();


    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    // const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState(false);
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() =>{
        const result = USER_REGEX.test(user);
        setValidName(result);
    }, [user])

    useEffect(() =>{
        const result = PWD_REGEX.test(pwd);
        setValidPwd(result);
    }, [pwd])

    useEffect(() =>{
        setErrMsg('');
    }, [user, pwd]);


    const handleSubmit = async (e) => {
        console.log(setToken)
        e.preventDefault();
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if(!v1 || !v2){
            setErrMsg("Invalid Entry");
            return;
        }
        await fetch(BASE_URL+"/login-jwt", {method: 'POST', headers: {'content-type': 'application/json'}, body: JSON.stringify({username: user, password: pwd})})
          .then(res => res.json())
          .then(
            (results) => {
                    if(true){
                        console.log("Logging in: ", results['access_token']);
                        setSuccess(true);
                        setToken(results['access_token']);

                        // setRefresh(results['refresh_token']);
                        navigate('/', {replace: true});
                    }
                    else{
                        setErrMsg(results['message'])
                        errRef.current.focus();
                    }
            },
            (error) => {
              console.log(error)
            }
          )
    }

    const height = window.innerHeight;
    const width = window.innerWidth;

    return (
        <>
            {success ? (
                <section>
                    <h1>Success!</h1>
                    <p>
                        <a href="/login">Sign In</a>
                    </p>
                </section>
            ) : (
        
        <div className="login-div">
            <section>
                <p ref={errRef} className={errMsg ? "errmsg": "offscreen"} aria-live="assertive">{errMsg}</p>
                <Box sx={{textAlign: "center"}}>
                    <Logo/>
                </Box>
                <div>
                    <p className="login-title">KogoPay Transaction Monitoring</p>
                </div>
                <form onSubmit={handleSubmit}>
                    {/* <label htmlFor="username">
                        <span className={validName ? "valid": "hide"}>
                            <FontAwesomeIcon icon={faCheck}/>
                        </span>
                        <span className={validName || !user ? "hide": "invalid"}>
                            <FontAwesomeIcon icon={faTimes}/>
                        </span>
                    </label> */}
                    <input
                        className="height-login"
                        placeholder="Username"
                        height="30px"
                        type="text"
                        id="username"
                        ref={userRef}
                        autoComplete="false"
                        onChange={(e) => setUser(e.target.value)}
                        required
                        aria-invalid={validName ? "false": "true"}
                        aria-describedby="uidnote"
                        onFocus={() => setUserFocus(true)}
                        onBlur={() => setUserFocus(false)}
                    />
                    <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle}/>
                        4 to 24 characters. <br/>
                        Must begin with a letter. <br />
                        Letters, numbers, underscores, hyphens allowed.
                    </p>

                    {/* <label htmlFor="password">
                        <span className={validPwd ? "valid": "hide"}>
                            <FontAwesomeIcon icon={faCheck}/>
                        </span>
                        <span className={validPwd || !pwd ? "hide": "invalid"}>
                            <FontAwesomeIcon icon={faTimes}/>
                        </span>
                    </label> */}
                    <input
                        className="height-login"
                        placeholder="Password"
                        type="password"
                        id="password"
                        onChange={(e) => setPwd(e.target.value)}
                        required
                        aria-invalid={validPwd ? "false": "true"}
                        aria-describedby="pwdnote"
                        onFocus={() => setPwdFocus(true)}
                        onBlur={() => setPwdFocus(false)}
                    />
                    {/* <p id="pwdnote" className={pwdFocus && !validPwd? "instructions" : "offscreen"}>
                        <FontAwesomeIcon icon={faInfoCircle}/>
                        8 to 24 characters. <br/>
                        Must include uppercase and lowercase letters, a number and a special character. <br />
                        Allowed special characters: <span aria-label="exclamation mark">!</span><span aria-label="at symbol">@</span><span aria-label="hashtag">#</span><span aria-label="dollar sign">$</span><span aria-label="percent">%</span>
                    </p> */}

                    <button className="login-button" disabled={!validName || !validPwd ? true : false}>
                        Log In
                    </button>
                </form>
            </section>
        </div>
        )}
         </>
    )
}
