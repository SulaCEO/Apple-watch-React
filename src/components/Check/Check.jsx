import axios from "axios";
import React, { useEffect, useState } from "react";
import PopUp from "../PopUp/PopUp";
import {toast } from 'react-toastify';
import Switch from '@mui/material/Switch';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

const Check = ({isDark, setIsDark, basket, setBasket})=>{
    const [more, setMore] = useState(4);
    const [search, setSearch] = useState('');
    const [products, setProducts] = useState([]);
    const [openPop, setOpenPop] = useState(false);
    const [sort, setSort] = useState('');

    const getProducts = ()=>{
        axios('http://localhost:3000/check')
            .then(({data})=>setProducts(data.reverse()))
    }

    useEffect(()=>{
        getProducts();
    }, [])

    const deleteProducts = (id)=>{
        axios.delete(`http://localhost:3000/check/${id}`)
            .then(()=>{
                getProducts();
                
                toast.success('Успешно удалено!', {
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
                getProducts();

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
    }

    let productsFilterSearch = products.filter((el)=>el.name.toLowerCase().includes(search.toLowerCase())).length;
    
    return(
        <div className="container">
            <div className="check" style={{backgroundColor: isDark ? '#444444' : 'white'}}>
                <div className="check__top">
                    <h2>Check also</h2>
                    <div className="check__top-right">
                        <Switch onClick={()=>setIsDark(!isDark)} {...label} />
                        <select onChange={(e)=>setSort(e.target.value)} name="select" id="select">
                            <option value="">Cортировка по:</option>
                            <option value="toBig">К большему</option>
                            <option value="toSmall">К меньшему</option>
                        </select>
                        <input onChange={(e)=>setSearch(e.target.value)} type="text" name="" id="" />
                        <button onClick={()=>setOpenPop(true)} type="button">ADD</button>
                        <a href="">See all &gt;</a>
                    </div>
                </div>
                <div className="check__products">
                    {products.sort((a,b)=>{
                        if(sort === 'toBig'){
                            return a.price-b.price;
                        }else if(sort === 'toSmall'){
                            return b.price-a.price;
                        }
                        return 0;
                    }).filter((el)=>el.name.toLowerCase().includes(search.toLowerCase())).filter((el, i)=> i < more).map((el, i)=>(
                        <div className="product" key={i+1}>
                            <img className="product__img" src={el.img} alt=""/>
                            <h3 className="product__name">{el.name}</h3>
                            <span className="product__price" style={{color: isDark ? 'white' : '#515759'}}>{el.price > 0 ? `$${el.price}.00` : `Free*`}</span>
                            <div className="product__btns">
                                <button disabled={basket.filter((item)=>item.id === el.id) >= 0 ? false : true} onClick={()=>{
                                    setBasket([...basket, el]);
                                    toast.success('Успешно добавлено!', {
                                        position: "top-center",
                                        autoClose: 1000,
                                        hideProgressBar: true,
                                        closeOnClick: true,
                                        pauseOnHover: true,
                                        draggable: true,
                                        progress: undefined,
                                        theme: "light",
                                    });
                                }} className="buy-btn" type="button">{el.price > 0 ? "Buy" : "Apply"}</button>
                                <button onClick={()=>deleteProducts(el.id)} className="delete-btn" type="button">Delete</button>
                            </div>
                        </div>
                    ))}
                    {!productsFilterSearch && <h1>Ничего не найдено</h1>}
                </div>
                <button style={{display: (more >= productsFilterSearch && productsFilterSearch <= 4) ? "none" : "inline-block"}} className="check__more" onClick={()=> more >= productsFilterSearch ? setMore(4) : setMore(more+4)} type="button">{more >= productsFilterSearch ? "Back" : "Show more"}</button>
                {productsFilterSearch ? <span>Показано {more >= productsFilterSearch ? productsFilterSearch : more} из {productsFilterSearch}</span> : ''}
            </div>
            <PopUp openPop={openPop} setOpenPop={setOpenPop} getProducts={getProducts}/>
        </div>
    )
}

export default Check;