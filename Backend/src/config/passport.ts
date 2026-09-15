import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import userModel from "../models/user.model.js";
import config from "./config.js";

passport.use(new GoogleStrategy({
  clientID: config.GOOGLE_CLIENT_ID,
  clientSecret: config.GOOGLE_CLIENT_SECRET,
  callbackURL: config.GOOGLE_CALLBACK_URL,
}, async (_accessToken, _refreshToken, profile, done) => {
  try {
    const googleProfile = profile as typeof profile & {
      _json?: { email_verified?: boolean };
    };
    if (googleProfile._json?.email_verified !== true) {
      return done(new Error("Google email is not verified"));
    }

    const email = profile.emails?.[0]?.value?.trim().toLowerCase();
    if (!email) return done(new Error("Google account did not provide an email"));

    const googleUser = await userModel.findOne({ googleId: profile.id });
    if (googleUser) {
      if (googleUser.email !== email) {
        return done(new Error("This Google account is linked to a different email address"));
      }
      return done(null, { id: String(googleUser._id), username: googleUser.username });
    }

    let user = await userModel.findOne({ email });
    if (!user) {
      const username = `${(profile.displayName || "arena-user").replace(/[^a-zA-Z0-9_]/g, "").slice(0, 20) || "arena-user"}-${profile.id.slice(-6)}`;
      user = await userModel.create({ username, email, googleId: profile.id });
    } else if (user.googleId && user.googleId !== profile.id) {
      return done(new Error("This email is already linked to another Google account"));
    } else {
      user.googleId = profile.id;
      await user.save();
    }
    return done(null, { id: String(user._id), username: user.username });
  } catch (error) {
    return done(error as Error);
  }
}));

export default passport;