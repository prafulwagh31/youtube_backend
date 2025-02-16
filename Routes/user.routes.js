import { getSingleUser, userLogin, userRegistration } from "../Controller/user.controller.js";

export function userRoute(app){
    app.post("/youtube/register",userRegistration);
    app.post("/youtube/login", userLogin);
    //app.get("/youtube/:id", getSingleUser);
}