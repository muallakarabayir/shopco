// generated with @7nohe/openapi-react-query-codegen@2.1.0 

import { useSuspenseQuery, UseSuspenseQueryOptions } from "@tanstack/react-query";
import type { Options } from "../requests/sdk.gen";
import { getProductById, getProducts } from "../requests/sdk.gen";
import { GetProductByIdData, GetProductsData } from "../requests/types.gen";
import * as Common from "./common";
export const useGetProductsSuspense = <TData = NonNullable<Common.GetProductsDefaultResponse>, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(clientOptions: Options<GetProductsData, true> = {}, queryKey?: TQueryKey, options?: Omit<UseSuspenseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseGetProductsKeyFn(clientOptions, queryKey), queryFn: () => getProducts({ ...clientOptions }).then(response => response.data as TData) as TData, ...options });
export const useGetProductByIdSuspense = <TData = NonNullable<Common.GetProductByIdDefaultResponse>, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(clientOptions: Options<GetProductByIdData, true>, queryKey?: TQueryKey, options?: Omit<UseSuspenseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseGetProductByIdKeyFn(clientOptions, queryKey), queryFn: () => getProductById({ ...clientOptions }).then(response => response.data as TData) as TData, ...options });
