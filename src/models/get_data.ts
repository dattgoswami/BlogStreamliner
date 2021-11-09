import express, { Request } from 'express';
import axios from 'axios';

const cache = new Map<String, any>();

function getPingResponse() {
  const responseBody = { success: true };
  return {
    status: 200,
    body: responseBody
  };
}

async function getPostsResponse(
  req: Request
): Promise<{ status: number; body: any }> {
  const allSortedPostsResult: any = { posts: [] };
  let sortedPostsArray: any = [];
  const postsWithDuplicates: any = { posts: [] };
  let postsWoDuplicates: any = { posts: [] };
  const tag: any = req.query.tag;
  let tagArray: String[] = [];
  let sortBy: String = '';
  let direction: String = '';
  const directionSet = new Set<String>(['asc', 'desc']);
  const sortBySet = new Set<String>(['id', 'likes', 'reads', 'popularity']);
  const baseUrl = 'https://api.hatchways.io/assessment/blog/posts?tag=';

  sortBy = getSortByValue(req.query.sortBy as String);
  direction = getDirectionValue(req.query.direction as String);

  if (tag !== null && tag !== undefined) {
    tagArray = (tag as string).split(',');
  } else {
    return {
      status: 400,
      body: {
        error: 'Tags parameter is required'
      }
    };
  }
  if (!directionSet.has(direction) || !sortBySet.has(sortBy)) {
    return {
      status: 400,
      body: {
        error: 'sortBy parameter is invalid'
      }
    };
  }

  for (let i = 0; i < tagArray.length; i++) {
    const newUrl =
      baseUrl + tagArray[i] + '&sortBy=' + sortBy + '&direction=' + direction;

    let response: any = {};
    if (cache.has(newUrl)) {
      response = cache.get(newUrl);
    } else {
      response = await axios.get(newUrl);
      cache.set(newUrl, response);
    }
    for (let i = 0; i < response.data.posts.length; i++) {
      postsWithDuplicates.posts.push(response.data.posts[i]);
    }
  }
  postsWoDuplicates = removeDuplicates(postsWithDuplicates);

  sortedPostsArray = getSortedData(postsWoDuplicates.posts, sortBy, direction);
  for (let i = 0; i < sortedPostsArray.length; i++) {
    allSortedPostsResult.posts.push(sortedPostsArray[i]);
  }

  return {
    status: 200,
    body: allSortedPostsResult
  };
}
function removeDuplicates(postsWithDuplicates: any) {
  const postsWoDuplicates: any = { posts: [] };
  const uniqueIdSet = new Set<String>();
  if (postsWithDuplicates.posts !== undefined) {
    for (let i = 0; i < postsWithDuplicates.posts.length; i++) {
      uniqueIdSet.add(postsWithDuplicates.posts[i].id);
    }
    for (let i = 0; i < postsWithDuplicates.posts.length; i++) {
      if (uniqueIdSet.has(postsWithDuplicates.posts[i].id)) {
        postsWoDuplicates.posts.push(postsWithDuplicates.posts[i]);
        uniqueIdSet.delete(postsWithDuplicates.posts[i].id);
      }
    }
  }
  return postsWoDuplicates;
}
//reference : https://stackoverflow.com/questions/979256/sorting-an-array-of-objects-by-property-values
function getSortedData(data: any, field: any, direction: String) {
  let isAscending: boolean = true;
  if (direction === 'desc') {
    isAscending = false;
  }
  return data.sort((a: any, b: any) => {
    return (a[field] < b[field] ? -1 : 1) * (isAscending ? 1 : -1);
  });
}
function getSortByValue(sortBy: String): String {
  if (sortBy === null || sortBy === undefined) {
    return 'id';
  } else {
    return sortBy;
  }
}
function getDirectionValue(direction: String): String {
  if (direction === null || direction === undefined) {
    return 'asc';
  } else {
    return direction;
  }
}

export { getPingResponse, getPostsResponse };
