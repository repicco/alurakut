import { useState, useEffect } from 'react'
import nookies from 'nookies'
import jwt from 'jsonwebtoken'
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'

import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'
import ProfileSideBar from '../src/components/ProfileSideBar'
import Profile from '../src/components/Profile'

export default function Home({ login }) {
  const githubUser = login
  const [communities, setCommunities] = useState([])
  const favoriteUsers = ['juunegreiros', 'omariosouto', 'rafaballerini', 'marcobrunodev', 'felipefialho', 'peas', 'guilhermesilveira']
  const [followers, setFollowers] = useState([])

  const connectApi = {
    githubFollowersGet: () => fetch('https://api.github.com/users/peas/followers')
    .then(async (response) => {
      const newResponse = await response.json()
      setFollowers(newResponse)
    }),

    datoCommunityPost: () => fetch('https://graphql.datocms.com/', {
      method: 'POST',
      headers: {
        'Authorization':'204c3ef969b2ce51bcb15ae61c3911',
        'Content-Type':'application/json',
        'Accept':'application/json',
      },
      body: JSON.stringify({ "query" : `query {
          allCommunities {
            id
            title
            imageUrl
            url
            creatorslug
            _status
            _firstPublishedAt
          }
          _allCommunitiesMeta {
            count
          }
        }`})
    })
    .then(async (response) => {
      const newResponse = await response.json()
      setCommunities(newResponse.data.allCommunities)
    }),

    datoPushCommunityPost: (payload) => fetch('api/community', {
      method: 'POST',
      headers: {
        'Content-Type':'application/json',
    }, body: JSON.stringify(payload)})
    .then(async (response) => {
      const newResponse = await response.json()
      setCommunities([...communities, newResponse.createRegister])
    }),
  }

  useEffect(() => {
    connectApi.githubFollowersGet()
    connectApi.datoCommunityPost()
  }, [])

  return (
    <>
      <div className="bg_body"></div>
      <AlurakutMenu githubUser={githubUser}/>
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSideBar gitUser={githubUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem Vindo(a)
            </h1>

            <OrkutNostalgicIconSet recados={2} sexy={3}/>
          </Box>

          <Box>
            <h2 className="subtitle">O que você deseja fazer?</h2>
            <form onSubmit={function handleCreateComunity(ev) {
              ev.preventDefault()
              const dataForm = new FormData(ev.target)
              const payload = {
                /* id: new Date().toISOString(), */
                title: dataForm.get('title'),
                imageUrl: dataForm.get('image'),
                url: dataForm.get('url'),
                creatorslug: githubUser,
              }

              connectApi.datoPushCommunityPost(payload)
            }}>
              <div>
                <input
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?" />
              </div>
              <div>
                <input
                  placeholder="Coloque a URL da sua comunidade?"
                  name="url"
                  aria-label="Coloque a URL da sua comunidade?" />
              </div>
              <div>
                <input
                  placeholder="URL da imagem da sua comunidade?"
                  name="image"
                  aria-label="URL da imagem da sua comunidade?" />
              </div>
              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBoxWrapper>
            <Profile title='Comunidades' arr={communities} tag='community' />
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <Profile title='Seguidores' arr={followers} tag='follower' />
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <Profile title='Pessoas das comunidades' arr={favoriteUsers} tag='user' />
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}

export async function getServerSideProps(context) {
  const token = await nookies.get(context).REKUT_TOKEN
  let githubUser = ''

  if(token === 'notFound'){
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  } else {
    githubUser = 'repicco'
  }
/*   if(token === 'notFound'){
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  } else {
    const decodeToken = await jwt.decode(token)
    login = decodeToken.login
   }*/
  return {
    props: {
      login: githubUser
    },
  }
}