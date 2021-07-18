import styled from 'styled-components'
import { FiAlertCircle } from "react-icons/fi";
import { useCallback, useEffect, useState } from 'react';

export default function Alert({visible, setVisible, type, children}){
    const [handleModal, setHandleModal] = useState(false)

    const openModal = useCallback(() => {
        if(visible){
            setHandleModal(true)
        }
    }, [setHandleModal, visible])

    const closeModal = useCallback((handle) => {
        const close = () => {
            setHandleModal(false)
            setVisible({visible: false, message: '', type: ''})
        }
        handle === 'firstOpen' ? setTimeout(() => close(), 2500) : close()
    }, [setHandleModal, setVisible])

    useEffect(() => {
        openModal()
        closeModal('firstOpen')
    }, [visible, openModal, closeModal])

    if(handleModal) {
        return(
            <StyleAlert onClick={closeModal} className={ type === 'success' ? '' : 'alert'} >
                <section>
                    <div>
                        <FiAlertCircle className="icon" />
                        {
                            type === 'success' ? <h3>Sucesso</h3> : <h3>Alerta</h3>
                        } 
                    </div>
                    {children}
                </section>
            </StyleAlert>
        )
    } else {
        return(
            <>
            </>
        )
    }

}



const StyleAlert = styled.div`
    position: fixed;
    right: 0;
    top: 0;
    display: flex;
    justify-content: flex-end;
    z-index: 99;
    cursor: pointer;
    color: green;
    &.alert {
        color: orange;
    }
    section {
        margin: 2rem 0 2rem;
        border-top-left-radius: 8px;
        border-bottom-left-radius: 8px;
        background: #FFEFD5;
        box-shadow: 1px 1px 1px 1px black;
        padding: 1rem;
        height: 80px;
        width: 300px;
        div {
            display: flex;
            align-items: center;
            font-size: 1rem;
            .icon {
                font-size: 1.5rem;
                margin-right: 1rem;
            }
        }
        p {
            font-size: 0.9rem;
            margin-top: 0.5rem;
            color: black;
        }
    }
`