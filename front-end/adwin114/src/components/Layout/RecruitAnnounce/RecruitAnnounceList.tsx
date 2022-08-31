import React, {useEffect, useState} from "react";
import axios from "axios"
import RecruitAnnounceCard from "./RecruitAnnounceCard";

const API_URI = 'http://localhost:8000/posts?post_type=CounselorRecruit'

export default function RecruitAnnounceList() {
    const [posts, setposts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetctPosts = async () => {
            try {
                setError(null);
                setposts([]);
                setLoading(true);
                const response = await axios.get(API_URI);
                setposts(response.data);
            } catch (e : any) {
                setError(e);
            }
            setLoading(false);
        };

        fetctPosts();
    }, []);

    if (loading) 
        return <div>로딩중..</div>;
    if (error) 
        return <div>에러가 발생했습니다</div>;
    if (!posts) 
        return null;
    return (<> {
        posts.map(
            (post : any) =>
                (<React.Fragment key={post._id}>
                    <RecruitAnnounceCard post={post}/>
                    <hr className="border-[#06113C] w-full opacity-30"/>
                </React.Fragment>)
        )
    } </>);
    // 
}
