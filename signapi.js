const axios = require('axios');

class SignApi {

    static async httpPost(url, data) {
        try {
            const response = await axios.post(url, data, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Encoding': 'gzip'
                },
                timeout: 15 * 60 * 1000
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static async httpPostRes(url, data) {
        try {
            const response = await axios({
                method: 'post',
                url: url,
                data: data,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Content-Encoding': 'gzip'
                },
                timeout: 15 * 1000
            });
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    static convToGBK(str) {
        if (Buffer.from(str).toString('utf8') !== str) {
            return Buffer.from(str).toString('gbk');
        } else {
            return str;
        }
    }

    static sign(signSource, key) {
        if (key) {
            signSource += `&key=${key}`;
        }
        return require('crypto').createHash('md5').update(signSource).digest('hex');
    }

    static validateSignByKey(signSource, key, retsign) {
        if (key) {
            signSource += `&key=${key}`;
        }
        const signKey = require('crypto').createHash('md5').update(signSource).digest('hex');
        return signKey === retsign;
    }
}

module.exports = SignApi;