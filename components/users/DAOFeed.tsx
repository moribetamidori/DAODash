import Link from 'next/link';

interface Props {
    daos:any
}

export default function DAOFeed(props: Props): any {
    const {daos} = props;
    let start = 500;
    return daos ? daos.map((dao:any,i:any) =><PostItem dao={dao} key={dao.walletAddress} count={start+i*200} />) : null;
}

interface PostProps{
    dao:any
    count:number
}


function PostItem(props: PostProps) : any {
    const dao = props.dao;
    const offset = props.count
    // console.log("count", props.count)
    // const createdAt = typeof post?.createdAt === 'number' ? new Date(post.createdAt) : post.createdAt.toDate();

    return (
      <>
      {dao.bountySum>0 && dao.bountySum<2000 &&
        <div className="Plant" style={{left:`${offset}px`}}>
        <img src="img/plant0.png"/>
        <button className="PlantBttn">
        <div className="DAOName">
        {dao.name}
        </div>
        <div className="PlantXP">
        {Math.round(dao.bountySum*10)} XP
        </div>
        </button>
        </div>
    }

    {dao.bountySum>2000 && dao.bountySum<6000 &&
        <div className="Plant" style={{left:`${offset}px`}}>
        <img src="img/plant1.png"/>
        <button className="PlantBttn">
        <div className="DAOName">
        {dao.name}
        </div>
        <div className="PlantXP">
        {Math.round(dao.bountySum*10)} XP
        </div>
        </button>
        </div>
    }

{dao.bountySum>6000 &&
        <div className="Plant" style={{left:`${offset}px`}}>
        <img src="img/plant2.png"/>
        <button className="PlantBttn">
        <div className="DAOName">
        {dao.name}
        </div>
        <div className="PlantXP">
        {Math.round(dao.bountySum*10)} XP
        </div>
        </button>
        </div>
    }

  </>
    );


}