import { Blog } from "../hooks"
import { Appbar } from "./Appbar"
import { Avatar } from "./BlogCard"

export const FullBlog=({blog}:{blog:Blog})=>{
    return <div>
        <div><Appbar/></div>
        <div className="flex justify-center  ">
        <div className="grid grid-cols-12 pt-11 w-full px-20">
        <div className="grid col-span-8 ">
            <div className="font-bold text-5xl">
                {blog.title}
            </div>
            <div className="text-slate-300 py-4">
                Posted on 11 October 2024
            </div>
            <div className="">
                {blog.content}
            </div> 
            
        </div>
        <div className="grid col-span-4">
            <div className="text-slate-600 text-lg">
            Author-
            </div>
            <div className="flex items-center w-full">
                <div className="">
                    <Avatar name={blog.author.name} size="big"/>
                </div>
                <div className="ml-5 ">
                <div className=" py-3 text-2xl font-bold ">
                {blog.author.name}
                </div>
                <div className="w-full text-slate-400">
                Random catch phrase about the author's ability to attract user
                </div>
                </div>
            </div>
        </div>
    </div>
    </div>
    </div>
}