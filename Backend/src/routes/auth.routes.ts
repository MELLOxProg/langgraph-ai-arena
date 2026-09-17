import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
import passport from "../config/passport.js";
import config from "../config/config.js";
import { authUser } from "../middlewares/auth.middleware.js";
import { setAuthCookie } from "../services/auth.service.js";

const router = Router();
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/get-me", authUser, authController.getMe);
router.get("/logout", authController.logout);
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] }),
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: `${config.CLIENT_URL}/login`,
  }),
  (req, res) => {
    setAuthCookie(res, req.user!);
    res.redirect(config.CLIENT_URL);
  },
);

export default router;
