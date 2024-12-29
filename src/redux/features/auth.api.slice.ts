import {
    LoginRequest,
    LoginResponse,
    ResetPasswordRequest,
    ResetPasswordResponse,
    SignUpRequest,
    SignUpResopnse,
} from "../../models/auth.model";
import { baseAPISlice } from "./base.api.slice";

const authAPISlice = baseAPISlice.injectEndpoints({
    endpoints: (builder) => ({
        signUp: builder.mutation<SignUpResopnse, SignUpRequest>({
            query: (signUpRequest) => ({
                url: `/56fc-96cc-4811-974b`,
                method: "POST",
                body: signUpRequest,
            }),
        }),
        login: builder.mutation<LoginResponse, LoginRequest>({
            query: (loginRequest) => {
                const queryObj = {
                    url: `/1db2-ed3e-47f5-9d9c`,
                    method: "POST",
                    body: loginRequest,
                };

                if (loginRequest.email === "officer1@gmail.com") {
                    queryObj.url = `/0e04-e433-45a6-8538`;
                }

                return queryObj;
            },
        }),
        resetPassword: builder.mutation<ResetPasswordResponse, ResetPasswordRequest>({
            query: (resetPasswordRequest) => ({
                url: `/5a52-ab3d-4088-8542`,
                method: "POST",
                body: resetPasswordRequest,
            }),
        }),
    }),
});

export const { useSignUpMutation, useLoginMutation, useResetPasswordMutation } = authAPISlice;
