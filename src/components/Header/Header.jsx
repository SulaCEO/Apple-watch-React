import axios from "axios";
import React, { useEffect, useState } from "react";
import Basket from "../basket/basket";

const Header = ({isDark, basket, setBasket})=>{
    const [img, setImg] = useState([]);
    const [isBasketActive, setIsBasketActive] = useState(false);

    useEffect(()=>{
        axios('http://localhost:3001/header')
            .then(({data})=>setImg(data))
    }, [])

    return(
        <div className="container">
            <header className="header" >
                <div className="header__logo" style={{backgroundColor: isDark ? '#444444' : 'white'}}>
                    <svg style={{fill: isDark ? 'white' : 'black'}} xmlns="http://www.w3.org/2000/svg" width="118" height="26" viewBox="0 0 118 26">
                        <g clip-path="url(#clip0_1_205)">
                            <path d="M42.2482 19.6701H42.194L38.8785 6.4236H34.9799L31.6782 19.6701H31.6239L28.5538 6.4236H24.4507L29.6136 24.9687H33.4847L36.8954 12.2924H36.9634L40.3732 24.9687H44.2727L49.4219 6.4236H45.3191L42.2482 19.6701ZM91.2527 6.12433C86.3623 6.12433 83.4413 9.28997 83.4413 14.6015V16.8434C83.4413 22.2101 86.3489 25.2802 91.2401 25.2802C96.1447 25.2802 98.5895 22.2911 98.5895 18.9493V18.6099H94.9071C94.9071 20.525 93.9559 22.0198 91.3062 22.0198C88.6443 22.0198 87.3395 20.3752 87.3395 16.8434V14.6015C87.3395 11.1103 88.6573 9.3576 91.2794 9.3576C93.7384 9.3576 94.9067 10.988 94.9067 12.8221H98.5887V12.6318C98.5895 9.01824 95.8446 6.12433 91.2527 6.12433ZM55.6308 6.4236L49.6527 24.9683H53.4975L54.8399 20.2946H60.7063L62.0285 24.9683H66.1455L60.1811 6.4236H55.6308ZM55.6608 17.442L57.7772 10.0776H57.8181L59.9016 17.442H55.6608ZM114.104 6.4236V13.8681H106.524V6.4236H102.678V24.9687H106.524V17.0613H114.104V24.9687H117.963V6.4236H114.104ZM66.0782 9.62974H71.5943V24.9687H75.4257V9.62974H80.9548V6.4236H66.0782V9.62974Z" fill="#0C1014"/>
                            <path d="M15.3424 6.11179C13.2592 5.95831 11.4928 7.27567 10.5071 7.27567C9.5072 7.27567 7.96508 6.145 6.32901 6.17496C4.18227 6.20817 2.20319 7.42348 1.09641 9.34789C-1.13416 13.2198 0.527021 18.9554 2.69927 22.0951C3.76191 23.632 5.02865 25.3608 6.69348 25.2976C8.29635 25.2348 8.90177 24.2601 10.8383 24.2601C12.7737 24.2601 13.32 25.2976 15.0144 25.2648C16.7383 25.2344 17.8313 23.7004 18.8859 22.155C20.1069 20.3744 20.6082 18.6504 20.6382 18.5569C20.5997 18.5435 17.2765 17.2662 17.2433 13.4381C17.2134 10.2384 19.8558 8.69873 19.9765 8.62462C18.476 6.41633 16.1584 6.17253 15.3424 6.11179ZM14.0566 4.03754C14.9411 2.97004 15.5368 1.47935 15.3728 0C14.0996 0.0494062 12.5599 0.84841 11.6471 1.9155C10.829 2.86232 10.1106 4.37731 10.3054 5.82912C11.7256 5.93846 13.1726 5.10747 14.0566 4.03754Z" fill="#0C1014"/>
                        </g>
                        <defs>
                            <clipPath id="clip0_1_205">
                                <rect width="118" height="25.2992"/>
                            </clipPath>
                        </defs>
                    </svg>
                </div>
                <ul className="header__list" style={{backgroundColor: isDark ? 'gray' : '#444444'}}>
                    <li><a style={{color: isDark ? 'black' : 'white'}} href="">Design</a></li>
                    <li><a style={{color: isDark ? 'black' : 'white'}} href="">Health</a></li>
                    <li><a style={{color: isDark ? 'black' : 'white'}} href="">Workout</a></li>
                    <li><a style={{color: isDark ? 'black' : 'white'}} href="">Activity</a></li>
                    <li><a style={{color: isDark ? 'black' : 'white'}} href="">Connect</a></li>
                    <li><a onClick={(e)=>{
                        e.preventDefault();
                        setIsBasketActive(true);
                    }}href="">
                        <img src={img[1]} alt="" />
                        <div style={{display: basket.length>0 ? 'block' : 'none'}} className="basket-add">{basket.length}</div>
                        </a></li>
                </ul>
            </header>
            <Basket isBasketActive={isBasketActive} setIsBasketActive={setIsBasketActive} img={img} basket={basket} setBasket={setBasket}/>
        </div>
    )
}

export default Header;