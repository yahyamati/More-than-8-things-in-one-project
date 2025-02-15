import app from "./app";


const server = Bun.serve({
    port:process.env.PORT || 3000,//authomatically set to 3000 if not provided 
    hostname: "0.0.0.0",
    fetch: app.fetch
    },
  );


console.log("server is running at port",server.port);