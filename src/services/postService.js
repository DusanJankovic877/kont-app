import { RequestHandler } from "./requestHandler";

class PostService extends RequestHandler{
    async setCreatePost(payload){
       const request = await this.apiClient.post('/create', payload);
       return request;
    }
    async getAllPosts(){
        const request = await this.apiClient.get('posts');
        return request;
    }
}
const postService = new PostService();
export default postService;