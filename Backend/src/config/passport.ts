import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import userModel from "../models/user.model.js";
import config from "./config.js";

passport.use(new GoogleStrategy({
  clientID: config.GOOGLE_CLIENT_ID,
  clientSecret: config.GOOGLE_CLIENT_SECRET,
  callbackURL: `${config.SERVER_URL}/api/auth/google/callback`,
}, async (_accessToken, _refreshToken, profile, done) => {
  try {
    const email = profile.emails?.[0]?.value;
    if (!email) return done(new Error("Google account did not provide an email"));
    let user = await userModel.findOne({ $or: [{ googleId: profile.id }, { email }] });
    if (!user) {
      const username = `${(profile.displayName || "arena-user").replace(/[^a-zA-Z0-9_]/g, "").slice(0, 20) || "arena-user"}-${profile.id.slice(-6)}`;
      user = await userModel.create({ username, email, googleId: profile.id });
    } else if (!user.googleId) {
      user.googleId = profile.id;
      await user.save();
    }
    return done(null, { id: String(user._id), username: user.username });
  } catch (error) {
    return done(error as Error);
  }
}));

export default passport;