import Link from 'next/link'
import { useAuth,signOut } from '../../lib/authContext'
import {useMoralis} from "react-moralis";
import { useRouter } from 'next/router';

//create a plant list, mapping based on bounty size 
// export async function getServerSideProps(context:any) {

// }

interface Props {
  username: any
}
export default function DAODashProfilePage(props:Props): any {
  const {  username} = props;
  const { user, logout } = useMoralis();
  const router = useRouter();

  const signOut = async () => {
    await logout();
    console.log("disconnecting")
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
    <h3 id="PlayerLevel">Player Level</h3>
    <h3>  |  </h3>
    <h3 id="PlayerXP">Player XP</h3>
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

  <div id="Door">
    <img src="img/door.png"/>
  </div>

  <div id="Window">
    <img src="img/window.png"/>
  </div>

  <div className="Plant" style={{left:"500px"}}>
    <img src="img/plant2.png"/>
    <button className="PlantBttn">
    <div className="DAOName">
      CityDAO
    </div>
    <div className="PlantXP">
      4060 XP
    </div>
  </button>
  </div>

  <div className="Plant" style={{left:"750px"}}>
    <img src="img/plant1.png"/>
    <button className="PlantBttn">
    <div className="DAOName">
      Gitcoin
    </div>
    <div className="PlantXP">
      1050 XP
    </div>
  </button>
  </div>
  <Link href={'/'}>
<button onClick={signOut}> <a className="mt-8 inline-flex items-left px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-indigo-600 bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">Signout</a></button>
</Link>
<script src="../js/script.js"></script>
</html>
</>

}