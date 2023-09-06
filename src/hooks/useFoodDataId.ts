import axios, { AxiosPromise } from "axios"
import { FoodData } from "../interface/FoodData";
import { useQuery } from "@tanstack/react-query";

const API_URL = 'http://localhost:8080';

const fetchData = async (id:any): AxiosPromise<FoodData[]> =>{
    try {
        const response = await axios.get(API_URL + '/food/' + id);
        return response;
    } catch (error:any) {
        throw new Error(`Erro ao buscar dados do produto com ID ${id}: ${error.message}`);
    }
}

export function useFoodDataId(id: number | undefined) {
    const query = useQuery(['food-data', id], () => fetchData(id), {
        retry: 2
    });

    return {
        ...query,
        data: query.data?.data
    }

}