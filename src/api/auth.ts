import { baseUrl } from "common/consts";
import { post } from "./http";
import { SignUpData, SignUpResponse } from "./types";
import {headersJSON as headers} from 'common/consts';

interface Auth {
	signUp: (data: SignUpData) => Promise<SignUpResponse>;
}

export const Auth: Auth = {
	signUp: async (data: SignUpData): Promise<SignUpResponse> => {
        return await post(`${baseUrl}/auth/signup`, data, {headers});
	},
}