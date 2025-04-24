"use client"

export function AuthPage({isSignin}:{
    isSignin:boolean
}){
    return <div className="w-screen h-screen flex justify-center items-center">
        <div className="p-2 m-2 bg-white rounded-md ">
            <div className="p-2">
                <input className="pl-2 bg-blue-500 rounded-md border border-black" type="text" placeholder="Email"></input>
            </div>
            <div className="p-2">
                <input className="pl-2 bg-blue-500 rounded-md border border-black" type="password" placeholder="Password"></input>
            </div>

            <div className="p-2">    
                <button className=" w-full bg-blue-500 rounded-md border border-black" onClick={()=>{

                }}>{isSignin ? "Sign in" : "Sign up"}</button>
            </div>
        </div>
    </div>
}