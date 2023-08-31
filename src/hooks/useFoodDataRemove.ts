import axios, { AxiosPromise } from "axios"
import { useMutation, useQueryClient } from "@tanstack/react-query";

const API_URL = 'http://localhost:8080';

const removeData = async (id: any): AxiosPromise<any> =>{
    const response = axios.delete(API_URL +'/delete/'+id);
    return response;
}

export function useFoodDataRemove(){
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