import { Hono } from "hono";
import {kindeClient,sessionManager} from '../kinde'
import { getUser } from '../kinde'


export const authRoute = new Hono()


  .get("/login", async (c) => {
    const loginUrl = await kindeClient.login(sessionManager(c));
    return c.json({ url: loginUrl.toString() });
  })
  .get("/register", async (c) => {
    const registerUrl = await kindeClient.register(sessionManager(c));
    // return c.redirect(registerUrl.toString());
    return c.json({ url: registerUrl.toString() });
  })

  .get("/callback", async (c) => {
    //This is the callback route that the Kinde server will redirect to after the user logs in or registers
    const url = new URL(c.req.url);
    await kindeClient.handleRedirectToApp(sessionManager(c), url);
    return c.redirect("http://localhost:5173");
  })

  .get("/logout", async (c) => {
    const logoutUrl = await kindeClient.logout(sessionManager(c));
    // return c.redirect(logoutUrl.toString());
    return c.json({ url: logoutUrl.toString() });
  })

  // This route is used to check if the user is authenticated
  .get("/me", getUser, async (c) => {
    const user = c.var.user
    return c.json({ user });
  });