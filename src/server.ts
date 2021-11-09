import express, { Request, Response, Application } from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { getPingResponse, getPostsResponse } from './models/get_data';

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req: Request, res: Response): void => {
  res.send('endpoint currently available are /api/ping and /api/posts');
});

app.listen(port, () => {
  console.log(`server started http://localhost:${port}`);
});
const getPing = async (req: Request, res: Response) => {
  const pingResponse = getPingResponse();
  res.status(pingResponse['status']);
  res.send(pingResponse['body']);
};
const getPosts = async (req: Request, res: Response) => {
  const postsResponse = await getPostsResponse(req);
  res.status(postsResponse['status']);
  res.send(postsResponse['body']);
};

const blog_routes = (app: Application) => {
  app.get('/api/ping', getPing);
  app.get('/api/posts', getPosts);
};
blog_routes(app);
export default app;
