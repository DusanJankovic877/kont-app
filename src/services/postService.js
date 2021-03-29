import { RequestHandler } from "./requestHandler";

class PostService extends RequestHandler{
    async setCreatePost(payload){
       const request = await this.apiClient.post('/create', payload);
       console.log(request.data);
       return request.data.ops;
    }
    async getAllPosts(){
        const request = await this.apiClient.get('posts');
        return request;
      console.log(request);

    }
}
const postService = new PostService();
export default postService;