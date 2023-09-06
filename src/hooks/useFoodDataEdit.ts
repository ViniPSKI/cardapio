import axios, { AxiosPromise } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { FoodData } from "../interface/FoodData";

const API_URL = 'http://localhost:8080';

const putData = async (variables: { id: number; data: FoodData }): Promise<AxiosPromise<any>> => {
    const { id, data } = variables;
    const response = await axios.put(API_URL + '/edit/' + id, data);
    return response;
}

export function useFoodDataEdit() {
    const queryClient = useQueryClient();

    const mutate = useMutation(putData, {
        onSettled: () => {
            queryClient.invalidateQueries(['food-data']);
        }
    });

    return mutate;
}
