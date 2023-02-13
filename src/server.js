import { app } from "../src/app.js"

const port  = 3333 || process.env.port

app.listen(port, ()=>console.log(`Server is runnin on port: ${port} ...`))