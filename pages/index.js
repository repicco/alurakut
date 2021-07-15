import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import {ProfileRelationsBoxWrapper} from '../src/components/ProfileRelations'
import { AluraKutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'

function ProfileSideBar({gitUser}) {
  return(
    <Box>
      <img src={`https://github.com/${gitUser}.png`} style={{ borderRadius: '8px' }} />
    </Box>
  )
}

export default function Home() {
  const githubUser = 'repicco'
  const favoriteUsers = ['juunegreiros', 'omariosouto', 'rafaballerini', 'marcobrunodev', 'felipefialho', 'peas']

  return (
    <>
      {/* <AluraKutMenu /> */}
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSideBar gitUser={githubUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">
              Bem Vindo(a)
            </h1>

            <OrkutNostalgicIconSet/>
          </Box>
        </div>
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({favoriteUsers.length})
            </h2>
            
            <ul>
              {
                favoriteUsers.map( user => (
                  <li>
                    <a href={`/users/${user}`} key={user}>
                      <img src={`https://github.com/${user}.png`} />
                      <span>{user}</span>
                    </a>
                  </li>
                ))
              }
            </ul>
            
          </ProfileRelationsBoxWrapper>
          <Box>
            Comunidades
          </Box>
        </div>
      </MainGrid>
    </>
  )
}
