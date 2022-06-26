import Link from 'next/link'
import {useMoralis} from "react-moralis";
import { useRouter } from 'next/router';
import DAOFeed from '../users/DAOFeed'
//create a plant list, mapping based on bounty size 
// export async function getServerSideProps(context:any) {

// }

interface Props {
  username: any
  daos: any
}

export default function DAODashProfilePage(props:Props): any {
  const {  username, daos} = props;
  const { user, logout } = useMoralis();
  const router = useRouter();
  const bounties = daos.map((d:any)=>d.bountySum)
  const bountiesSum = Math.round(bounties.reduce((partialSum:any, a:any) => partialSum + a, 0));

  const signOut = async () => {
    await logout();
    // console.log("disconnecting")
    router.replace("/")

}
    return <>

<html lang="en" className="h-100">
  <head>
    <meta charSet="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1"/>
    <link href="https://fonts.googleapis.com/css2?family=Roboto+Mono:wght@400;500;600;700&display=swap" rel="stylesheet"/>

    <title>DAO Dash</title>

    <link href="../css/main.css" rel="stylesheet"/>
    <link rel="shortcut icon" href="../img/favico.png"/>
  </head>
  
  <div className="bgContainer"></div>

  <div id="Profile">
    <h1 id="PlayerName">
      {username}
    </h1>
    <div className="ProfileInfo">
    <h3 id="PlayerLevel">Player Level 3</h3>
    <h3>  |  </h3>
    <h3 id="PlayerXP">Player {bountiesSum*10} XP </h3>

  </div>
  <div id="Signout">
  <Link href={'/'}>

    <button onClick={signOut} className="SkillTag stS"> Disconnect </button>
  </Link>
  </div>
    <img src={'/img/bar.png'} id="XPProgressBarFrame" className="Progress"/>
    <img src="/img/sq.png" id="XPProgressBar" className="Progress"/>
  <div style={{height:"40px"}}></div>
  <div id="Tags">
    <button className="SkillTag stY">Javascript</button>
    <button className="SkillTag stR">React</button>
    <button className="SkillTag stB">NextJS</button>
  </div>
  </div>

  <div id="Character">
    <img src="img/character.png" style={{width:"100%"}}/>
  </div>
  <Link href={'/metaverse'}>

<a>
  <div id="Door">
    <img src="img/door.png"/>
  </div>
  </a>
  </Link>
  <div id="Window">
    <img src="img/window.png"/>
  </div>
  <DAOFeed daos={daos}/>

{/* <script src="../js/script.js"></script> */}
</html>
</>

}