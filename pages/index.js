import { useState } from 'react'
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import {ProfileRelationsBoxWrapper} from '../src/components/ProfileRelations'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'

function ProfileSideBar({gitUser}) {
  return(
    <Box as='aside'>
      <img src={`https://github.com/${gitUser}.png`} style={{ borderRadius: '8px' }} />
      <hr />
      <a className="boxLink" href={`https://github.com/${gitUser}`} target="blank">
        @{gitUser}
      </a>
      <hr/>
      <AlurakutProfileSidebarMenuDefault/>
    </Box>
  )
}

function Profile({title, arr, tag}) {
  return (
  <>
    <h2 className="smallTitle">
      {title} ({arr.length})
    </h2>
    
    <ul>
      {
        arr.map( (item, index) => 
          {
            if(index < 6){
              return tag === 'user' ?
                <li key={item}>
                  <a href={`https://github.com/${item}`} target="blank" >
                    <img src={`https://github.com/${item}.png`} />
                    <span>{item}</span>
                  </a>
                </li>
              :
                <li key={item.id}>
                  <a href={item.url} target="blank" >
                    <img src={item.img} />
                    <span>{item.title}</span>
                  </a>
                </li>
            }
          }       
        )
      }
    </ul>
  </>
  )
}

export default function Home() {
  const githubUser = 'repicco'
  const [communities, setCommunities] = useState([
    {
    id: '125463',
    title: 'Eu odeio acordar cedo',
    img: 'https://alurakut.vercel.app/capa-comunidade-01.jpg',
    url: 'https://www.orkut.br.com/MainCommunity?cmm=10000'
    },
    {
      id: '2255463',
      title: 'Mulher não se pega se conquista',
      img: 'https://img10.orkut.br.com/community/2e54711655562955dab78403845600cc.jpg',
      url: 'https://www.orkut.br.com/MainCommunity?cmm=82906'
    },
    {
      id: '4525463',
      title: 'Novo MSN',
      img: 'https://img10.orkut.br.com/community/eb494c868dc3962a5152b58037b5aca4.jpeg',
      url: 'https://www.orkut.br.com/MainCommunity?cmm=14540'
    },
    {
      id: '25205463',
      title: 'Facebook me estressou',
      img: 'https://img10.orkut.br.com/community/473b293d68dd8a9032d5489fd706c781.jpg',
      url: 'https://www.orkut.br.com/MainCommunity?cmm=10391'
    },
    {
      id: '66352463',
      title: 'Eu odeio cagar fora de casa',
      img: 'https://img10.orkut.br.com/community/d2b004325da1d5a16af6c5303446f3d5.jpg',
      url: 'https://www.orkut.br.com/MainCommunity?cmm=10011'
    },
    {
      id: '52132463',
      title: 'Queremos o Buddy Poke no orkut',
      img: 'https://img10.orkut.br.com/community/2e46a72e57c4d1503622fbe12c2a78ef.png',
      url: 'https://www.orkut.br.com/MainCommunity?cmm=13359'
    },
  ])
  const favoriteUsers = ['juunegreiros', 'omariosouto', 'rafaballerini', 'marcobrunodev', 'felipefialho', 'peas', 'guilhermesilveira']

  return (
    <>
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
              const community = {
                id: new Date().toISOString(),
                title: dataForm.get('title'),
                img: dataForm.get('image'),
              }
              setCommunities([...communities, community])
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
                  name="image"
                  aria-label="Coloque a URL da sua comunidade?" />
              </div>
              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBoxWrapper>
            <Profile title='Comunidades' arr={communities} tag='comunidades' />
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <Profile title='Pessoas das comunidades' arr={favoriteUsers} tag='user' />
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  )
}
