import axios from "axios";
import { SignupInput } from "om74202_medium2";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { Backend } from "../config";

export const Auth=({type}:{type:"signup" |"signin"})=>{
    const [postInputs,setPostInputs]=useState<SignupInput>({
        name:"",
        username:"",
        password:""
    })
    const navigate=useNavigate();

    async function sendRequest(){
        try{
            const response=await axios.post(`${Backend}/api/v1/user/${type==="signup"?"signup":"signin"}`,postInputs);
            const jwt=response.data;
            localStorage.setItem("token",jwt);
            navigate("/blogs");
        }catch(e){
            alert("Incorrect inputs");
        }
    }

    return <div className="h-screen flex-col flex justify-center">
        <div className=" flex justify-center">
            <div>
            <div className="text-3xl font-bold">
                Create an account
            </div>
            <div className="font-light text-slate-400 text-md">
                {type==="signup" ? "Already have an account" : "Don't have an account"}
                <Link className="underline pl-2" to={type==="signin" ? "/signup" : "/signin"}>
                {type==="signup" ? "Signin" : "Signup"}</Link>
            </div>

            <div className="mt-3 w-full">

            {type==="signup" ?<LabelInput label="Name" placeholder="Om Mishra" onchange={(e)=>{
                setPostInputs({
                    ...postInputs,
                    name:e.target.value
                })
            }}/> : null}

<LabelInput label="Email" placeholder="ommishra@gmail.com" onchange={(e)=>{
                setPostInputs({
                    ...postInputs,
                    username:e.target.value
                })
            }}/>

<LabelInput label="Password" placeholder="MINIMUM 6 CHARACTERS" type="password" onchange={(e)=>{
                setPostInputs({
                    ...postInputs,
                    password:e.target.value
                })
            }}/>
            
            </div>
            <div className="mt-6">
            <button onClick={sendRequest} type="button" className="text-white w-full bg-gray-800 hover:bg-gray-900 focus:outline-none
             focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800
              dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type==="signin" ? "Sign In" : "Sign Up"}</button>
            </div>

            </div>
            
        </div>
    </div>
}

interface LabelInputType{
    label:string;
    placeholder:string;
    onchange:(e:ChangeEvent<HTMLInputElement>)=>void;
    type?:string;
}


function LabelInput({label,placeholder,onchange,type}:LabelInputType){
    return <div>
    <label className="mt-3 block mb-2 text-sm font-medium text-black dark:text-black">{label}</label>
    <input  onChange={onchange} type={type || "text"}className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder={placeholder} required />
</div>
}