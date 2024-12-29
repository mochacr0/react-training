import { ApiResponse } from "./common.model";
import { User } from "./user.model";

export interface LoginRequest {
    email: string;
    password: string;
}

export interface SignUpRequest {
    email: string;
    password: string;
    confirmPassword: string;
}

export interface ResetPasswordRequest {
    email: string;
    password: string;
    confirmPassword: string;
}

export interface LoginResponse extends ApiResponse<User> {}

export interface SignUpResopnse extends ApiResponse<string> {}

export interface ResetPasswordResponse extends ApiResponse<string> {}
