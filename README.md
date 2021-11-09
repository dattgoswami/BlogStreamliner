# Backend Assessment - Blog Posts

(built in 5h)

The task of this assessment is to build a simple backend JSON API that fetches the posts based on query parameters. It also maintains an in memory cache of the requests and reads subsequent request from there instead of making a network call.

## Getting Started

The src folder has server.ts which creates the server and starts listening on port 3000. The blog_routes creates all the required routes. The models/get_data.ts file has all the functions that get the ping and posts response. The getPostsResponse function does the error handling based on the values of the query parameters and sets the defaults for sortBy and direction whenever they are empty.

First, we fetch all the posts and store them in postsWithDuplicates and then we filter them using the id values stored in a unique id set.

After that we sort the posts array based on the sorting order(direction) and the sort by parameter.

The run time complexity of this solution is O(n^2).

## Instructions

Steps to run the project:
Once you have cloned the project repo, navigate to the project directory.

```
npm install
npm run test //this step can be skipped on subsequent runs
npm run start
//OR
node dist/server.js
```

After running the npm run start or node dist/server.js you will be prompted that the server has started on port 3000.
Go to this url using browser, postman or curl:
GET [http://localhost:3000/api/posts?tag=tech,history&sortBy=reads&direction=desc] - this would display list of unique posts
GET [http://localhost:3000/api/posts?tag=tech] - this query only has the tag and the remaining two parameters would be set to defaults
GET [http://localhost:3000/api/posts?tag=tech&direction=desc] - this query does not have the query parameter sortBy but the default value of id will be assigned
GET [http://localhost:3000/api/posts?tag=tech,history&sortBy=likes] - this query does not have the direction parameter and the default asc value would be assigned while querying
GET [http://localhost:3000/api/posts?tag=tech,history&sortBy=invalidField&direction=desc] - this query has invalid sortBy field and it would return an error message with status 400

Values allowed for sort by parameter are: 'id', 'likes', 'reads', 'popularity'
Values allowed for direction parameter are: 'asc', 'desc'

## Bonus

Bonus section can be implemented using a simple Map that stores the url that was queried and along with that stores the posts that were retrieved. Whenever we are about to query we can check this cache and if the result exist in this map we use that. We can make it global application wide and maintain last 50/100 requests in that cache. This HashMap can be replaced by Redis or Memcached.
cache = Map<String, Response from request>
String is the url and the posts is the response.
It is implemented in models/get_data.ts.
