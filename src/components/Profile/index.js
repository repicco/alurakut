

export default function Profile({title, arr, tag}) {
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
                : tag === 'community' ?
                  <li key={item.id}>
                    <a href={item.url} target="blank" >
                      <img src={item.imageUrl} />
                      <span>{item.title}</span>
                    </a>
                  </li>
                : <li key={item.id}>
                    <a href={item.url} target="blank" >
                      <img src={item.avatar_url} />
                      <span>{item.login}</span>
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