// generated with @7nohe/openapi-react-query-codegen@2.1.0 

import { UseQueryResult } from "@tanstack/react-query";
import type { Options } from "../requests/sdk.gen";
import { getProductById, getProducts } from "../requests/sdk.gen";
import { GetProductByIdData, GetProductsData } from "../requests/types.gen";
export type GetProductsDefaultResponse = Awaited<ReturnType<typeof getProducts>>["data"];
export type GetProductsQueryResult<TData = GetProductsDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useGetProductsKey = "GetProducts";
export const UseGetProductsKeyFn = (clientOptions: Options<GetProductsData, true> = {}, queryKey?: Array<unknown>) => [useGetProductsKey, ...(queryKey ?? [clientOptions])];
export type GetProductByIdDefaultResponse = Awaited<ReturnType<typeof getProductById>>["data"];
export type GetProductByIdQueryResult<TData = GetProductByIdDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useGetProductByIdKey = "GetProductById";
export const UseGetProductByIdKeyFn = (clientOptions: Options<GetProductByIdData, true>, queryKey?: Array<unknown>) => [useGetProductByIdKey, ...(queryKey ?? [clientOptions])];
