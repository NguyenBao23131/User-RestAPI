import express from "express";

import { getUserByEmail, createUser } from "../db/user";
import { authentication, random } from "../helpers";


export const register = async (req: express.Request, res: express.Response) => {
    try {
        const { email, password, username } = req.body;

        if(!email || !password || !username) {
            return res.sendStatus(400);
        }

        const existingUser = await getUserByEmail(email);

        if(existingUser === undefined){
            return res.sendStatus(400);
        }

        const salt = random();

        const user = await createUser({
            email,
            username,
            authentication: {
                salt,
                password: authentication(salt, password),
            }
        });

        console.log(user);
        return res.status(200).json({user}).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};


export const login = async(req: express.Request, res: express.Response) => {
    try {
        const { email, password } = req.body;

        if(!email || !password) {
            return res.sendStatus(400);
        }

        const user = await getUserByEmail(email);

        if(user === undefined) {
            return res.sendStatus(400);
        }

        const salt = 'REST_API_TS'; // declare and initialize salt variable
        const expectedHash = authentication(salt, password);
        
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
