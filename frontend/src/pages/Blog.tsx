import { useParams } from "react-router-dom";
import { FullBlog } from "../components/FullBlog";
import { useBlog } from "../hooks"
import { BlogSkeleton } from "../components/BlogSkeleton";
import { Appbar } from "../components/Appbar";

export const Blog=function(){
    const {id}=useParams();
    const {loading,blog}=useBlog({id:id || ""});
    
    if(loading){
        return <div>
            <div>
                <Appbar/>
            </div>
            <div className="px-24 pt-14">
            <BlogSkeleton/>
            
            </div>
            
        </div>
    }

    return <div>
        <FullBlog blog={blog}/> 

    </div>
}