import { app } from './app'
import { env } from './env'

app.listen(
  {
    host: '0.0.0.0',
    port: env.PORT
  },
  (): void => {
    console.log('👌 Server is running on port 3333 👍')
  }
)
