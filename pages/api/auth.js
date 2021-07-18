import jwt from 'jsonwebtoken'

export default async function receivedRequests(request, response) {
    if(request.method === 'POST') {
        const baseUrl = 'https://api.github.com/users/'
        const githubUser = request.body
        const date = new Date().toISOString()

        const resultGit = await fetch(baseUrl + githubUser)
            .then(async (response) => {
                const data = await response.json()
                if(data.name !== null) {
                    const Token = data.node_id;
                    const Login = data.login
                    return { token: Token, login: Login }
                }
                if( data.message === 'Not Found'  || data.name === null ){
                    return 'User não existe'
                }  
            })        
        if(resultGit === 'User não existe') {
            response.status(404).json({
                message: 'Usuário não localizado...'
            })
        } else {
            const token = { date: date, token: resultGit.token, login: resultGit.login }
            const jwtToken = jwt.sign( token, 'secret', { expiresIn: '1d' })
            response.json({
                token: jwtToken
            })
        }       
        return
    }
    response.status(404).json({
        message: 'Favor utilizar o método POST...'
    })
}