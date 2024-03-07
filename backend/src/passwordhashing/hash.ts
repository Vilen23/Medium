import bcrypt from "bcryptjs"

export const hashpass = async(pass:string)=>{
    return await bcrypt.hash(pass,10);
}

export const checkpass = async (bodypass:string,userpass:string)=>{
    return await bcrypt.compare(bodypass,userpass);
}