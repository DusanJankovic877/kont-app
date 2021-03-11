import { RequestHandler } from "./requestHandler";
class AuthService extends RequestHandler{
    async login(payload){
        return await this.apiClient.post('/login', payload);
    }
    async logout(payload){
        const response = await this.apiClient.post('/logout', payload)
        console.log(response);
    }

}
const authService = new AuthService();
export default authService;
