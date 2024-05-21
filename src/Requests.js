import AxiosInstance from './utlis/AxiosInstance';

export class Requests {
    static async getUserData() {
        return await AxiosInstance.get('./user');
    }

    static async getAccountData() {
        return await AxiosInstance.get('./account');
    }

    static async setAccountData(values) {
        const { username, password } = values;
        return await AxiosInstance.post('./account', {
            username,
            password
        });
    }

    static async setUserAvatar(values) {
        const { avatar } = values;
        return await AxiosInstance.post('./avatar', {
            avatar,
        });
    }

    static async userLogin(values) {
        const { username, password } = values;
        return await AxiosInstance.post('./login', {
            username,
            password
        });
    }

    static async userRegister(values) {
        const { username, password } = values;
        return await AxiosInstance.post('./register', {
            username,
            password
        });
    }

    static async exchangeCoins(values) {
        const { coins } = values;
        if (!coins) return;
        return await AxiosInstance.get('./coins/exchange', {
            params: { coins } 
        });
    }

    static async getLeaderboard() {
        return await AxiosInstance.get('./leaderboard');
    }

    static async getReview() {
        return await AxiosInstance.get('./review');
    }

    static async setReview(review) {
        return await AxiosInstance.post('./review', {
            review
        });
    }

    static async setChapterStatus(values) {
        const { id, module, status } = values;
        return await AxiosInstance.get('./module/status', {
            params: { id, module, status } 
        });
    }

    static async setChapterAnswer(values) {
        const { answer, question, module, chapter, is_correct } = values;
        return await AxiosInstance.get('./module/answer', {
            params: { answer, question, module, chapter, is_correct } 
        });
    }

    static async setRetryCount(values) {
        const { question, module, chapter } = values;
        return await AxiosInstance.get('./module/retry', {
            params: { question, module, chapter } 
        });
    }

    static async setFavoriteAchievement(values) {
        const { favorite } = values;
        return await AxiosInstance.get('./achievements/favorite', {
            params: { favorite } 
        });
    }

    static async addAchievement(values) {
        const { achievement } = values;
        return await AxiosInstance.get('./achievements/add', {
            params: { achievement } 
        });
    }
}