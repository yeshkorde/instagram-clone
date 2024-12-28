

module.exports = function (server) {
    const io = require("socket.io")(server, {
        cors: {
            origin: "*", // Allow connections from any origin, adjust for production
            methods: ["GET", "POST"],
        },
    });

    io.on("connection", async (socket) => {
        console.log("A user connected");
        
        socket.emit("connect1",{data:"connect to the server"})

        socket.on("send",async(data)=>{
       socket.emit("get",socket.id)
        })



        socket.on("disconnect", () => {
            console.log("A user disconnected");
        });
    });
};
