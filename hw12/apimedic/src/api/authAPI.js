import axios, { isAxiosError } from "axios";
import CryptoJS from "crypto-js";
import { getSymptoms } from "./getApi"

const AuthHost = 'https://sandbox-authservice.priaid.ch';

export const authApi = async (email, password) => {
    
    const computedHash = CryptoJS.HmacMD5(`${AuthHost}/login`, password);
    const computedHashString = computedHash.toString(CryptoJS.enc.Base64);
    
    const $authHost = axios.create({
        baseURL: AuthHost,
        headers: {
            "Authorization": `Bearer ${email}:${computedHashString}`,
        }
    })

    try {
        const {data} = await $authHost.post('/login')
        return {data}
    } catch(error) {
        if (isAxiosError(error)) {
            return {error}
        }
    }
}

