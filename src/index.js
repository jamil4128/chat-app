const path = require("path")
const express = require("express")
const app = express()
const port = process.env.PORT || 3000
const publicDirectorypath = path.join(__dirname, "../public")
app.use(express.static(publicDirectorypath))
app.listen(port, () => `Server running on port ${port} 🔥`);