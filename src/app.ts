import express, { Application } from "express"
import Router from "./routes"
import swaggerUi from "swagger-ui-express"

const app: Application = express();

app.use(express.json());
app.use(express.static("public"));


if (process.env.SHOW_DOCS) {
  console.log('passed')
  app.use(
    "/docs",
    swaggerUi.serve,
    swaggerUi.setup(undefined, {
      swaggerOptions: {
        url: "/swagger.json",
      },
    })
  )
}

app.use(Router);

export default app