import axios from "axios";

export const ApiMedicHost = 'https://sandbox-healthservice.priaid.ch';
const lang = 'ru-ru';
const format = 'json';

export const $host = axios.create({
    baseURL: ApiMedicHost,
})

export const getSymptoms = async (token) => {
    const {data} = await $host.get(`${ApiMedicHost}/symptoms?language=${lang}&format=${format}&token=${token}`)
    //console.log("Symptoms")
    //console.log(data)
    return {data}
}

export const getDiagnosis = async (token, {symptoms, year}) => {
    const {data} = await $host.get(`${ApiMedicHost}/diagnosis?symptoms=[${symptoms.map(s => s.ID).join(',')}]&language=${lang}&format=${format}&token=${token}&gender=male&year_of_birth=${year}`)
    console.log("Diagnosis")
    console.log(data)
    return data
}