import React, { useEffect, useState } from "react";
import axios from "axios";

const Footer = ({isDark})=>{
    const [links, setLinks] = useState([]);

    useEffect(()=>{
        axios('http://localhost:3000/footer')
            .then(({data})=>setLinks(data))
    }, [])

    return(
        <div className="container">
            <footer className="footer" style={{backgroundColor: isDark ? '#444444' : 'white'}}>
                <div className="follow">
                    <h3 className="footer__title">Follow Us.</h3>
                    <span className="footer__text" style={{color: isDark ? 'white' : '#515759'}}>We are always looking for new projects and collaborations. Feel free to contact us.</span>
                    <div className="follow__links">
                        {links.map((el, i)=>(
                            <React.Fragment key={i}>
                                <a href=""><img src={el} alt="" /></a>
                            </React.Fragment>
                        ))}
                    </div>
                </div>
                <div className="contact">
                    <h3 className="footer__title">Contact Us.</h3>
                    <span className="footer__text">One Apple Park Way Cupertino, CA 95014</span>
                    <span className="contact__number" style={{color: isDark ? 'white' : '#515759'}}>(408) 996-1010</span>
                    <a href="" className="contact__email">support@apple.com</a>
                </div>
            </footer>
        </div>
    )
}

export default Footer;