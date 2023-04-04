import axios from "axios";
import React, { useState } from "react";
import {toast } from 'react-toastify';

const Basket = ({isBasketActive, setIsBasketActive, basket, setBasket})=>{
    const [order, setOrder] = useState(false);
    const [name, setName] = useState('');
    const [tel, setTel] = useState('');

    const submitOrder = ()=>{
        axios.post('http://localhost:3000/order', {
            name,
            tel,
            "order": basket
        }).then(()=>{
            toast.success('Заказ выполняется!', {
                position: "top-center",
                autoClose: 1000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }).catch(()=>{
            toast.error('Произошла ошибка!', {
                position: "top-center",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        })

        setIsBasketActive(false);
        setBasket([]);
        setOrder(false);
    }

    let price = 0;

    basket.forEach(el => {
        price+=el.price
    })
    
    let tax = price*0.05;
    return(
        <div style={{display: isBasketActive ? 'block' : 'none'}} className="container-bs" onClick={()=>setIsBasketActive(false)}>
            <div className="basket" onClick={(e)=>e.stopPropagation()}>
                <h2 className="basket__title">Корзина</h2>
                <div className="basket__products">
                    {basket.length > 0 ? basket.map((el, i)=>(
                        <div key={i+1} className="product">
                            <div className="product__left">
                                <img src={el.img} alt="" />
                            </div>
                            <div className="product__center">
                                <h4>{el.name}</h4>
                                <b>{el.price}$</b>
                            </div>
                            <button onClick={()=>{
                                setBasket(basket.filter((item)=>item.id !== el.id));
                                basket.length <= 1 && setIsBasketActive(false);
                            }} className="product__right" type="button">x</button>
                        </div>
                    )) : <h2 className="empty" >Пусто</h2>}
                </div>
                <div className="basket__price">
                    <div className="basket__price-result">
                        <span>Итого:</span>
                        <b>{price}$</b>
                    </div>
                    <div className="basket__price-tax">
                        <span>Налог 5%:</span>
                        <b>{Math.round(tax)}$</b>
                    </div>
                </div>
                <form className="basket__order">
                    <div style={{display: !order && 'none'}}>
                        <input onChange={(e)=>setName(e.target.value)} className="basket__order-name" placeholder="name..." type="text" />
                        <input onChange={(e)=>setTel(e.target.value)} className="basket__order-tel" placeholder="tel..." type="tel" />
                    </div>
                    <button onClick={()=>{
                        if(order){
                            submitOrder();
                        }else if(!order && basket.length > 0){
                            setOrder(true);
                        }else{
                            setIsBasketActive(false);
                            setBasket([]);
                            setOrder(false);

                            toast.error('Добавьте что нибудь в корзину!', {
                                position: "top-center",
                                autoClose: 2000,
                                hideProgressBar: true,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "light",
                            });
                        }
                    }} type="button" className="basket__order-btn">{order ? 'Заказать' : 'Оформить заказ'}</button>
                </form>
            </div>
        </div>
    )
}

export default Basket;