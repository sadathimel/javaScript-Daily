module.exports = {
  apps: [
    {
      name: "express-app",
      script: "yarn",
      args: "start",
      cwd: "./express-app",
    },
    {
      name: "react-app",
      script: "yarn",
      args: "start",
      cwd: "./react-app",
    },
  ],
};
