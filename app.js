const createError = require("http-errors")
const express = require("express")
const path = require("path")
const cookieParser = require("cookie-parser")
const logger = require("morgan")

const indexRouter = require("./routes/index")
const usersRouter = require("./routes/users")
const doctorRouter = require("./routes/doctor")
const ratingRouter = require("./routes/rating")
const appointmentRouter = require("./routes/appointment")
const chatRouter = require("./routes/chat")
const favoriteRouter = require("./routes/favorites")
const cors = require("cors")

const app = express()

// view engine setup
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "jade")

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))
app.use(cors())

app.use("/", indexRouter)
app.use("/api/v1", usersRouter)
app.use("/api/v1/doctors", doctorRouter)
app.use("/api/v1/ratings", ratingRouter)
app.use("/api/v1/appointment/", appointmentRouter)
app.use("/api/v1/chat/", chatRouter)
app.use("/api/v1/favorite/", favoriteRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get("env") === "development" ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render("error")
})

module.exports = app
