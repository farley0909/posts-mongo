import { app } from "../src/app.js"

const port  = 8080 || process.env.port

app.listen(port, ()=>console.log("Server is running"))