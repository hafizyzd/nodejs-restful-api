import { registerUserValidation, getUserValidation } from "../validation/user-validation.js";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { validate } from "../validation/validation.js";
import { loginUserValidation } from "../validation/user-validation.js";
import bcrypt from "bcrypt";
import {v4 as uuid} from "uuid";
import { updateUserValidation } from "../validation/user-validation.js";

const register = async (request) => {
   const user = validate(registerUserValidation, request);
    
   const countUser = await prismaClient.user.count({
       where: {
           username: user.username
       }
   });

   if(countUser === 1){
    throw new ResponseError(400, "Username already exists");
   }

   user.password = await bcrypt.hash(user.password, 10);

   return prismaClient.user.create({
       data: user,
       select: {
        username: true,
        name: true
       }
    })
};


const login = async (request) => {
   const LoginRequest = validate(loginUserValidation, request);
   const user = await prismaClient.user.findUnique({  //select dulu ke database dengna username
    where: {
        username: LoginRequest.username
    },
    select: {
        username: true,
        password: true
    }
    });

    if(!user){  //jika user tidak ditemukan
        throw new ResponseError(401, "Invalid username or password");
    }

    const isPasswordValid = await bcrypt.compare(LoginRequest.password, user.password);
    if(!isPasswordValid){ //jika passwordnya tidak valid
        throw new ResponseError(401, "Invalid username or password");
    }

    const token = uuid().toString(); //bikin token baru disimpan dalam database

    return prismaClient.user.update({ //simpan ke database
        data: {
            token: token
        },
        where: {
            username: user.username
        },
        select: {   
            token: true
        }
    });
};

const get = async (username) => {
    username = validate(getUserValidation, username);
    const user = await prismaClient.user.findUnique({
        where: {
            username: username
        },
        select: {
            username: true,
            name: true
        }
    });
    if(!user){
        throw new ResponseError(404, "User not found");
    }

    return user;
};

const update = async (request) => {
    const user = validate(updateUserValidation, request);

    const totalUserInDb = await prismaClient.user.count({
        where: {
            username: user.username
        }
    });

    if(totalUserInDb === 0){
        throw new ResponseError(404, "User not found");
    }

    const data = {};
    if(user.name){
        data.name = user.name;
    }

    if(user.password){
        data.password = await bcrypt.hash(user.password, 10);
    }

    return prismaClient.user.update({
        where: {
            username: user.username 
        },
        data : data,
        select: {
            username: true,
            name: true
        }
    });
}


const logout = async (username) => {
    username = validate(getUserValidation, username);
    const user = await prismaClient.user.findUnique({
        where: {
            username: username
        }
    });

    if(!user){
        throw new ResponseError(404, "User not found");
    }

    return prismaClient.user.update({
        where: {
            username: username
        },
        data: {
            token: null
        },
        select: {
            username: true,
        }
    });
}   



export default { 
    register,
    login,
    get,
    update,
    logout
};