import { RequestHandler } from "./requestHandler";
class AuthService extends RequestHandler{
    async login(payload){
        const request = await this.apiClient.post('/login', payload);
        console.log('servis', request);

    }
}
const authService = new AuthService();
export default authService;
