import joi from "joi";
import {regexConstant} from "../constants/regex.constants";

export class UserValidator {
    private static name = joi.string().regex(regexConstant.NAME).trim();
    private static email = joi.string().regex(regexConstant.EMAIL).trim();
    private static password = joi.string().regex(regexConstant.PASSWORD).trim();

    public static create = joi.object({
        name: this.name.required(),
        email: this.email.required(),
        password: this.password.required(),
    });

    public static update = joi.object({
        name: this.name.required(),
    });

    public static filterByName = joi.object({
        name: this.name.required(),
    });

    public static login = joi.object({
        email: this.email.required(),
        password: joi.string().required()
    });

    public static getUser= joi.object({
        id: joi.string().trim(),
        email: this.email,
    }).min(1);
}