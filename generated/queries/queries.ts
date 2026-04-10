// generated with @7nohe/openapi-react-query-codegen@2.1.0 

import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import type { Options } from "../requests/sdk.gen";
import { getProductById, getProducts } from "../requests/sdk.gen";
import { GetProductByIdData, GetProductsData } from "../requests/types.gen";
import * as Common from "./common";
export const useGetProducts = <TData = Common.GetProductsDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(clientOptions: Options<GetProductsData, true> = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseGetProductsKeyFn(clientOptions, queryKey), queryFn: () => getProducts({ ...clientOptions }).then(response => response.data as TData) as TData, ...options });
export const useGetProductById = <TData = Common.GetProductByIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(clientOptions: Options<GetProductByIdData, true>, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseGetProductByIdKeyFn(clientOptions, queryKey), queryFn: () => getProductById({ ...clientOptions }).then(response => response.data as TData) as TData, ...options });
