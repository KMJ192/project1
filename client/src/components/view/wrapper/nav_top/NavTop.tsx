import React, { useState } from 'react';
import './NavTop.css';
import { login_page, main_page, user_register_page } from '../../../../info_manage/page_url';
import { 
    NavBar,
    LogoContainer,
    MenuUl,
    MenuLi,
    MenuA,
    SearchContainer, 
    SearchBox,
    SearchButton,
    UserButton,
    NavToggle, 
    CircleButton, 
} from './NavTopStyle';


function NavTop() {
    const [open, setOpen] = useState(false);
    const onToggle = () => setOpen(!open);

    return (
        <NavBar>
            <LogoContainer>
                <a href={main_page}>
                    <i className="fab fa-rust logo"></i>
                    Logo
                </a>
            </LogoContainer>
            <MenuUl open={open} {...open}>
                <MenuLi><MenuA href="#">menu1</MenuA></MenuLi>
                <MenuLi><MenuA href="#">menu2</MenuA></MenuLi>
                <MenuLi><MenuA href="#">menu3</MenuA></MenuLi>
            </MenuUl>
            <SearchContainer>
                <SearchBox/>
                <SearchButton>search</SearchButton>
            </SearchContainer>
            <div>
                <a href={login_page}>
                    <UserButton>
                        로그인
                    </UserButton>
                </a>
                <a href={user_register_page}>
                    <UserButton>
                        회원가입
                    </UserButton>
                </a>
            </div>
            <NavToggle>
                <CircleButton onClick={onToggle} open={open} {...open}>
                    +
                </CircleButton>
            </NavToggle>
        </NavBar>
    );
}

export default NavTop