import { SiteClient } from 'datocms-client'

export default async function receivedRequests(request, response) {
    if(request.method === 'POST') {
        const TOKEN = 'ab0a2e86e6c7a94b3271d374784b2d';
        const client = new SiteClient(TOKEN)

        const createRegister = await client.items.create({
            itemType: '975864',
            ...request.body,
        })
        response.json({
            dados: 'Algum dado qualquer',
            createRegister: createRegister,
        })
        return
    }
    response.status(404).json({
        message: 'Favor utilizar o método POST...'
    })
}