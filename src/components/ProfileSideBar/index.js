import Box from '../Box'
import { AlurakutProfileSidebarMenuDefault } from '../../lib/AlurakutCommons'

export default function ProfileSideBar({gitUser}) {
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