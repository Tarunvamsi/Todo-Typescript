// types.ts
export interface ZodErrorDetail {
    message: string;
  }
  
  export interface ErrorResponse {
    errors?: ZodErrorDetail[];
  }
  