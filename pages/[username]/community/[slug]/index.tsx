import { getCommunityWithSlug, communityToJSON, memberToJSON, postToJSON } from '../../../../lib/firebaseConfig/init';
import { doc, startAfter, collection, collectionGroup, addDoc, getDoc, getDocs, query, where, limit, orderBy} from 'firebase/firestore';
import {firestore} from '../../../../lib/firebaseConfig/init';
import { useDocumentData } from 'react-firebase-hooks/firestore';
import CommunityProfilePage from '../../../../components/communities/CommunityProfilePage';
import PostFeed from '../../../../components/users/PostFeed';
import Link from 'next/dist/client/link';
import MemberStack from '../../../../components/members/MemberStack';
import { useState, useEffect, useContext} from 'react';
import { fromMillis } from '../../../../lib/firebaseConfig/init';
import Loader from '../../../../components/misc/loader';

const LIMIT = 10;

export async function getStaticProps(context:any) {
    const {params} = context;
    const {slug, username} = params; // grab the slug from the url parameters
    // console.log("----", slug);
    const communityDoc = await getCommunityWithSlug(slug);
    let community;
    let path;
    let members;

    if (!communityDoc) {
        return {
            notFound: true,
        };
    }

    if (communityDoc) {
        const communityRef = doc(firestore, "communities", slug);
        const communityQuery= query(collection(firestore, "communities", slug, "members"));
        const membersSnapshot = await getDocs(communityQuery);
        members = membersSnapshot.docs.map(d => d.id);
        community = communityToJSON(await getDoc(communityRef));
        path = communityRef.path;
    }

    const postsQuery  = query(collectionGroup(firestore, "posts"), where("uid", "in", members), orderBy("createdAt", "desc"), limit(LIMIT));
    const posts = (await getDocs(postsQuery)).docs.map(postToJSON);
    const fetchedMembers = members;


    return {
      props: { community, path, posts, username, fetchedMembers},
      revalidate: 5000,
    };
  }

  //find out which community doc to render
export async function getStaticPaths() {
    // Improve my using Admin SDK to select empty docs
    const snapshot = await getDocs(collection(firestore, 'communities'));

    const paths = snapshot.docs.map((doc) => {
        const { slug } = doc.data();
        const username = "123";
        return {
        params: {slug, username},
        };
    });

    return {
        paths,
        fallback: 'blocking',
    };
}

export default function Community(props:any) {
    const username = props.username;
    const communityRef = doc(firestore, props.path);
    const fetchedMembers = props.fetchedMembers;
    const [realtimeCommunity] = useDocumentData(communityRef);
    const community = realtimeCommunity || props.community;
    const [posts, setPosts] = useState(props.posts);
    const [loading, setLoading] = useState(false);
    const [postsEnd, setPostsEnd] = useState(false);
    const cSlug:string = community.slug;
    const realUsername:string = username!;

    // console.log(fetchedMembers);
    // console.log("check", community.slug)
    const slug = community.slug;
    const [membersInfo, setMembersInfo] = useState<any>();
    let membersSnapshot;
    let communityQuery;
    let members;
    useEffect (() => {
        const getMember = async () => {
            communityQuery= query(collection(firestore, "communities", slug, "members"));
            membersSnapshot = await getDocs(communityQuery);
            if(membersSnapshot){
                members = membersSnapshot.docs.map(d => d.id);

                const membersQuery = query(collection(firestore, "users"), where("uid", "in", members))
                const newMembersInfo = (await getDocs(membersQuery)).docs.map(memberToJSON);
                if(newMembersInfo){
                    setMembersInfo(newMembersInfo);
                }
            }
        }
        getMember();
    }, [communityQuery]);
        
    const getMorePosts = async () => {
        setLoading(true);
        const last = posts[posts.length - 1];
        // console.log(last)
        // console.log('++++++')
    
        const cursor = typeof last?.createdAt === 'number' ? fromMillis(last.createdAt) : last.createdAt;
        // console.log("cursor", cursor)
        const postsQuery = query(
            collectionGroup(firestore, "posts"), 
            where("uid", "in", fetchedMembers), 
            orderBy("createdAt", "desc"), 
            startAfter(cursor),
            limit(LIMIT));
    
        const newPosts = (await getDocs(postsQuery)).docs.map((doc) => doc.data());
        // console.log(newPosts);
        setPosts(posts.concat(newPosts));
        setLoading(false);
    
        if (newPosts.length < LIMIT) {
          setPostsEnd(true);
        }
      };

    return (
        <main>
            <div className="min-h-full">

            <CommunityProfilePage community={community}/>

            <div className="ml-10">
            <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-pink-500 to-purple-600">Members</p>
            
            <Link href={`/${realUsername}/community/${cSlug}/members`}>
                <a>
                <MemberStack slug={community.slug} membersInfo={membersInfo} />
                </a>
            </Link>


            </div>


            <br></br>
            <div className="ml-10">
            <p className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-purple-600 to-blue-500">Member Posts</p>
            <PostFeed posts={posts} admin={false} />
            
            </div>
           
            </div>
            <div className="mt-8 min-h-full">
          {/* <div className="mt-8 max-w-3xl mx-auto px-4 sm:px-6 md:flex md:items-center md:justify-between md:space-x-5 lg:max-w-7xl lg:px-8"> */}
            {/* <div className="flex items-center space-x-5"> */}
                {!loading && !postsEnd && posts.length > 0 && 
                <button 
                    className="w-full relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"

                    onClick={getMorePosts}>
                         <span className="w-full relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              Load More Posts
              </span>
                        </button>}

                <Loader show={loading} />

                {(postsEnd || posts.length === 0 )&& 
              <button className="w-full relative inline-flex items-center justify-center p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
              <span className="w-full relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
              You have reached the end!
              </span>
               </button>
                }
            </div>
        {/* </div> */}
        {/* </div> */}
        </main>
    );
}