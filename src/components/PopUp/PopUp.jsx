import axios from "axios";
import React from "react";
import {toast } from 'react-toastify';

const PopUp = ({openPop, setOpenPop, getProducts})=>{
    const submitProduct = (e)=>{
        e.preventDefault();

        axios.post('http://localhost:3000/check', {
            "name": e.target[1].value,
            "price": e.target[2].value > 0 ? Number(e.target[2].value) : e.target[2].value,
            "img": e.target[3].value
        }).then(()=>{
            getProducts();
            setOpenPop(false);

            e.target[1].value = '';
            e.target[2].value = '';
            e.target[3].value = '';

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
        }).catch(()=>{
            setOpenPop(false);

            e.target[1].value = '';
            e.target[2].value = '';
            e.target[3].value = '';

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

    return (
        <div onClick={()=>setOpenPop(false)} style={{display: !openPop && "none"}} className="pop-up">
            <form onClick={((e)=>e.stopPropagation())} onSubmit={(e)=>submitProduct(e)}>
                <button onClick={()=>setOpenPop(false)} className="exit" type="button">x</button>
                <label className="name">
                    Название:
                    <input type="text" required />
                </label>
                <label className="price">
                    Цена:
                    <input type="text" required/>
                </label>
                <label className="img">
                    Картинка:
                    <input type="text" required/>
                </label>
                <button className="send" type="submit">Send</button>
            </form>
        </div>
    )
}

export default PopUp;