import { Link } from "react-router-dom"
import { Avatar } from "./BlogCard"

export const Appbar=()=>{
    return <div className="flex justify-between px-10 border-b mb-10 py-4">
        <Link to={'/blogs'} className="flex items-center">
            Medium
        </Link>
        <div className="flex">
            <Link to={'/Publish'}>
            <button type="button" className="mr-4 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300
             font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700
              dark:focus:ring-green-800">Add New</button>
            </Link>
            <Avatar name="Om" size="big"/>
        </div>
    </div>
}