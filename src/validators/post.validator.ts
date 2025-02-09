import joi from "joi";

export class PostValidator {
    private static title = joi.string().trim().min(3).max(40)
    private static body = joi.string().trim().min(10).max(500)

    public static create = joi.object({
        title: this.title.required(),
        body: this.body.required(),
    });

    public static update = joi.object({
        title: this.title,
        body: this.body,
    }).min(1);

}