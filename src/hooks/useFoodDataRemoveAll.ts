import axios, { AxiosPromise } from "axios"
import { useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = 'http://localhost:8080';

const removeData = async (): AxiosPromise<any> =>{
    const response = axios.delete(API_URL +'delete/all');
    return response;
}

export function useFoodDataRemoveAll(){
    const queryClient = useQueryClient();

    const mutate = useMutation({
        mutationFn : removeData,
        retry: 2,
        onSuccess: ()=>{
            queryClient.invalidateQueries(['food-data']);
        }
    })

    return mutate;

}