Bun.serve({
    port: 3000,//authomatically set to 3000 if not provided 
    hostname: "0.0.0.0",
    fetch(req) {
      return new Response("Hello from Bun server!");
    },
  });


console.log("server is running");