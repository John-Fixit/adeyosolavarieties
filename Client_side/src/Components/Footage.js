import React from 'react'
import { FaFacebook, FaInstagram, FaLinkedin, FaTelegram, FaWhatsapp} from 'react-icons/fa'
function Footage() {
    return (
        <footer className="page-footer font-small sticky-bottom">
            <div className="container">
                <hr className="rgba-white-light" />
                <div className="row pb-2">
                    <div className="col-md-12">
                        <div className="mb-2 text-center">
                            <a href='' className="me-4 textColor">
                                <FaFacebook size='4vh' />
                            </a>
                            <a href='https://wa.me/message/U27MOKYLZN6NC1' className="me-4 textColor">
                                <FaWhatsapp size='4vh' />
                            </a>
                            <a href='https://t.me/joinchat/Y86z3PxwI1s0ZDNk' className="me-4 textColor">
                                <FaTelegram size='4vh' />
                            </a>

                            <a href='' className="me-4 textColor">
                                <FaInstagram size='4vh' />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-copyright text-center py-3">© 2022 Adeyosola varieties 
            </div>
        </footer>
    )
}

export default Footage