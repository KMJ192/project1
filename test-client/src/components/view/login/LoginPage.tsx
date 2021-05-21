import React, { useState, useEffect } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { Link, Redirect } from 'react-router-dom';
import { user_register_page } from '../../../path/PagePath';
import Wrapper from '../../wrapper/Wrapper';
import './LoginPage.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux-module/RootReducer';

function LoginPage() {
    document.title="로그인";
    const [winWidth, setWinWidth] = useState(window.innerWidth);
    const [winHeight, setWinHeight] = useState(window.innerHeight);
    const [redirect, setRedirect] = useState(false);
    const [loginData, setLoginData] = useState({
        email : "",
        password : ""
    });
    const windowSize = useSelector((state : RootState) => state.screen_size);

    useEffect(() => {
        setWinWidth(windowSize.width);
        setWinHeight(windowSize.height);
        console.log(windowSize);
    }, [winWidth, winHeight, windowSize]);

    const tryLogin = async (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(loginData.email === "") {
            alert("이메일을 입력해주세요.");
            return;
        }
        if(loginData.password === "") {
            alert("비밀번호를 입력해주세요.");
            return;
        }

        const response = await axios.post('/login', loginData)
            .then((response : AxiosResponse) => response.data)
            .catch((err : AxiosError) => err);

        if(response) {
            if(response["login"] === true) setRedirect(true);
            else{
                if(response["message"] === "E-P-00")
                    alert("비밀번호가 틀렸습니다.");
                else if(response["message"] === "E-P-01")
                    alert("등록된 이메일이 아닙니다.");
                else
                    alert("오류가 발생했습니다. 오류내용 : [" + response + "]");
            }
        }else{
            alert("알수없는 오류가 발생했습니다.");
        }
    }

    if(redirect === true){
        return <Redirect to="/"/>
    }

    return (
        <Wrapper>
            <form className="user-login-form" onSubmit={tryLogin}>
                <div className="login-container">
                    <div className="login-des">
                        로그인
                    </div>
                    <br/>
                    <div className="input-login-des">이메일</div>
                    <input className="input-box email-input" placeholder="이메일 입력" autoFocus
                        onChange={(e : React.ChangeEvent<HTMLInputElement>) => setLoginData({...loginData, email : e.target.value})}
                    />
                    <div className="input-login-des">비밀번호</div>
                    <input className="input-box password-input" type="password" placeholder="비밀번호 입력"
                        onChange={(e : React.ChangeEvent<HTMLInputElement>) => setLoginData({...loginData, password : e.target.value})}
                    />
                    <br/>
                    <input className="remember-box" type="checkbox"/>기억하기
                    <br/>
                    <button className="user-page-btn sign-btn" type="submit">로그인</button>
                    <br/>
                    <Link to={user_register_page}>
                        <button className="user-page-btn sign-btn sign-up" type="button">회원가입</button>
                    </Link>
                </div>
            </form>
        </Wrapper>
    );
}

export default React.memo(LoginPage);
