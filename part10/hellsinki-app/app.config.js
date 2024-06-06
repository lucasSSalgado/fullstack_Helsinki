import 'dotenv/config';

export default {
    name: "hellsinki-app",
    slug: "hellsinki-app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    ios: {
      "supportsTablet": true
    },
    android: {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      }
    },
    web: {
      "favicon": "./assets/favicon.png"
    },
    extra: {
      env: process.env.APOLLO_URI,
    },
  } 