// generated with @7nohe/openapi-react-query-codegen@2.1.0 

import { type QueryClient } from "@tanstack/react-query";
import type { Options } from "../requests/sdk.gen";
import { getProductById, getProducts } from "../requests/sdk.gen";
import { GetProductByIdData, GetProductsData } from "../requests/types.gen";
import * as Common from "./common";
export const ensureUseGetProductsData = (queryClient: QueryClient, clientOptions: Options<GetProductsData, true> = {}) => queryClient.ensureQueryData({ queryKey: Common.UseGetProductsKeyFn(clientOptions), queryFn: () => getProducts({ ...clientOptions }).then(response => response.data) });
export const ensureUseGetProductByIdData = (queryClient: QueryClient, clientOptions: Options<GetProductByIdData, true>) => queryClient.ensureQueryData({ queryKey: Common.UseGetProductByIdKeyFn(clientOptions), queryFn: () => getProductById({ ...clientOptions }).then(response => response.data) });
