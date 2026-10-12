import { ICreateUser } from "@/interface";
import apiClient from "@/lib/apiClient";

export function createUser (payload:ICreateUser){
   return apiClient('/auth/register',{
      method: 'POST',
      body:payload
   })
}