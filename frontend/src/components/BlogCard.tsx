import { Link } from "react-router-dom";
interface BlogCardProps{
    authorName:string;
    title:string;
    content:string;
    publishedDate:string;
    id:string;
}

export const BlogCard=({authorName,title,content,publishedDate,id}:BlogCardProps)=>{
    return  <Link to={`/blog/${id}`}><div className=" border-b-2 flex  flex-col mb-5 cursor-pointer">
            <div className="flex">
                <div className="pl-2 flex justify-center flex-col">
                    <Avatar name={authorName}/>
                </div>
                <div className="pl-2 font-light text-sm">
                {authorName}
                </div>
                <div className="flex justify-center flex-col pl-2">
                {<Circle/>} 
                </div>
                <div className="pl-2 font-semibold text-sm">
                {publishedDate}
                </div>
            </div>

            <div className="pl-2 ">
            <div className="font-bold text-xl">
                {title}
            </div>

            <div className="text-lg">
                {content.slice(0,100)+`${content.length>100 ? " ..." : ""} `}
            </div>

            <div className="text-sm font-extralight my-2">
                {Math.ceil(content.length/100)+"  Minute(s) of read"}
            </div>
            
            </div>
        </div>
        </Link>    
}

export function Circle(){
    return <div className="w-1 h-1 rounded-sm bg-slate-500">

    </div>
}

export function Avatar({name,size="small"}:{name:string,size?:"small" | "big"}){
    return <div>
        
<div className={`relative inline-flex items-center justify-center ${size==="small"? "w-6 h-6":"w-10 h-10"} overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600`}>
    <span className={`${size==="small"?"text-xs":"text-lg"} text-gray-500 dark:text-gray-300`}>{name[0]}</span>
</div>

    </div>
}