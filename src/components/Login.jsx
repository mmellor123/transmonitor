import {useRef, useState, useEffect} from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth } from './auth';
import { useNavigate } from 'react-router-dom';

const USER_REGEX = /^[a-zA-Z0-9_]{5,}[a-zA-Z]+[0-9]*$/;
const PWD_REGEX = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

export const Login = () => {
    const BASE_URL = "https://s2.transactionmonitor.co.uk";

    const userRef = useRef();
    const errRef = useRef();
    
    const auth = useAuth();
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
        e.preventDefault();
        const v1 = USER_REGEX.test(user);
        const v2 = PWD_REGEX.test(pwd);
        if(!v1 || !v2){
            setErrMsg("Invalid Entry");
            return;
        }
        await fetch(BASE_URL+"/login", {method: 'POST', headers: {'content-type': 'application/json', 'token':'mytoken'}, body: JSON.stringify({username: user, password: pwd})})
          .then(res => res.json())
          .then(
            (results) => {
                    if(results['status'] === "success"){
                        setSuccess(true);
                        auth.login(user);
                        navigate('/', {replace: true})
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
        
        <section>
            <p ref={errRef} className={errMsg ? "errmsg": "offscreen"} aria-live="assertive">{errMsg}</p>
            <h5>KogoPay Transaction Monitoring</h5>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">
                    Username:
                    <span className={validName ? "valid": "hide"}>
                        <FontAwesomeIcon icon={faCheck}/>
                    </span>
                    <span className={validName || !user ? "hide": "invalid"}>
                        <FontAwesomeIcon icon={faTimes}/>
                    </span>
                </label>
                <input 
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

                <label htmlFor="password">
                    Password:
                    <span className={validPwd ? "valid": "hide"}>
                        <FontAwesomeIcon icon={faCheck}/>
                    </span>
                    <span className={validPwd || !pwd ? "hide": "invalid"}>
                        <FontAwesomeIcon icon={faTimes}/>
                    </span>
                </label>
                <input 
                    type="password"
                    id="password"
                    onChange={(e) => setPwd(e.target.value)}
                    required
                    aria-invalid={validPwd ? "false": "true"}
                    aria-describedby="pwdnote"
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                />
                <p id="pwdnote" className={pwdFocus && !validPwd? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle}/>
                    8 to 24 characters. <br/>
                    Must include uppercase and lowercase letters, a number and a special character. <br />
                    Allowed special characters: <span aria-label="exclamation mark">!</span><span aria-label="at symbol">@</span><span aria-label="hashtag">#</span><span aria-label="dollar sign">$</span><span aria-label="percent">%</span>
                </p>

                <button disabled={!validName || !validPwd ? true : false}>
                    Sign In
                </button>
            </form>
        </section>
        )}
         </>
    )
}
