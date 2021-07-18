import { useState } from 'react'
import { useRouter } from 'next/router'
import nookies from 'nookies'

import Alert from '../src/components/Alert'

export default function LoginScreen() {
    const router = useRouter()
    const [newAlert, setNewAlert] = useState({visible: false, message: '', type: ''})

    const [githubUser, setGithubUser] = useState('')
    const connectApi = {
        validateGithubLogin: (payload) => fetch('api/auth', {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
            },
            body: JSON.stringify(payload)
        })
        .then( async (response) => {
            const newResponse = await response.json()
            
            if(newResponse?.message === 'Usuário não localizado...') {
                nookies.set(null, 'REKUT_TOKEN', 'notFound', {
                    path: '/',
                    maxAge: 86400
                })
                throw new Error (newResponse.message)
            }

            nookies.set(null, 'REKUT_TOKEN', newResponse.token, {
                path: '/',
                maxAge: 86400
            })
            setNewAlert({visible: true, message: 'Login efetuado com sucesso...', type: 'success'})
            setTimeout(() => router.push('/'), 3000)
        })
        .catch(err => {
            console.log(err)
            setNewAlert({visible: true, message: 'Favor validar o login Github...', type: ''})
        })
    }

    return (
        <>
            <div className="bg_body"></div>
            <main style={{ display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <div className="loginScreen">
                    <section className="logoArea">
                    <img src="https://alurakut.vercel.app/logo.svg" />

                    <p><strong>Conecte-se</strong> aos seus amigos e familiares usando recados e mensagens instantâneas</p>
                    <p><strong>Conheça</strong> novas pessoas através de amigos de seus amigos e comunidades</p>
                    <p><strong>Compartilhe</strong> seus vídeos, fotos e paixões em um só lugar</p>
                    </section>

                    <section className="formArea">
                    <form className="box" onSubmit={ async (ev) => {
                            ev.preventDefault()
                            if(githubUser.length > 0){
                                connectApi.validateGithubLogin(githubUser)
                            } else {
                                setNewAlert({visible: true, message: 'Digite seu usuário Github', type: ''})
                            }
                        }
                    }>
                        <p>
                        Acesse agora mesmo com seu usuário do <strong>GitHub</strong>!
                    </p>
                        <input
                            placeholder="Usuário"
                            value={githubUser}
                            onChange={(ev) => {
                                setGithubUser(ev.target.value)
                            }}
                        />
                        <button type="submit">
                        Login
                        </button>
                    </form>

                    <footer className="box">
                        <p>
                        Ainda não é membro? <br />
                        <a href="/login">
                            <strong>
                            ENTRAR JÁ
                        </strong>
                        </a>
                        </p>
                    </footer>
                    </section>

                    <footer className="footerArea">
                    <p>
                        © 2021 alura.com.br - <a href="/">Sobre o Orkut.br</a> - <a href="/">Centro de segurança</a> - <a href="/">Privacidade</a> - <a href="/">Termos</a> - <a href="/">Contato</a>
                    </p>
                    </footer>
                </div>
            </main>
            <Alert visible={newAlert.visible} setVisible={setNewAlert} type={newAlert.type}>
                <p>{newAlert.message}</p>
            </Alert>
        </>
    )
} 