/* eslint-disable */
import * as types from './graphql';
import type { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n\t\tquery GetActiveOrder {\n\t\t\tactiveOrder {\n\t\t\t\t...ActiveOrder\n\t\t\t}\n\t\t}\n\n\n\t\tfragment ActiveOrder on Order {\n\t\t\t__typename\n\t\t\tid\n\t\t\tcode\n\t\t\tcouponCodes\n\t\t\tstate\n\t\t\tcurrencyCode\n\t\t\ttotalQuantity\n\t\t\tsubTotal\n\t\t\tshipping\n\t\t\ttotal\n\t\t\ttotalWithTax\n\t\t\ttaxSummary {\n\t\t\t\tdescription\n\t\t\t\ttaxRate\n\t\t\t\ttaxBase\n\t\t\t\ttaxTotal\n\t\t\t}\n\t\t\tdiscounts {\n\t\t\t\tdescription\n\t\t\t\tamountWithTax\n\t\t\t}\n\t\t\tlines {\n\t\t\t\tid\n\t\t\t\tunitPrice\n\t\t\t\tunitPriceWithTax\n\t\t\t\tquantity\n\t\t\t\tlinePrice\n\t\t\t\tlinePriceWithTax\n\t\t\t\tproductVariant {\n\t\t\t\t\tid\n\t\t\t\t\tname\n\t\t\t\t\tsku\n\t\t\t\t\tproduct {\n\t\t\t\t\t\tslug\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tfeaturedAsset {\n\t\t\t\t\tid\n\t\t\t\t\tpreview\n\t\t\t\t}\n\t\t\t}\n\t\t\tshippingLines {\n\t\t\t\tshippingMethod {\n\t\t\t\t\tid\n\t\t\t\t\tname\n\t\t\t\t\tdescription\n\t\t\t\t}\n\t\t\t\tpriceWithTax\n\t\t\t}\n\t\t}\n\t": types.GetActiveOrderDocument,
    "\n\t\tquery GetCustomer {\n\t\t\tactiveCustomer {\n\t\t\t\tid\n\t\t\t\ttitle\n\t\t\t\tfirstName\n\t\t\t\tlastName\n\t\t\t\temailAddress\n\t\t\t}\n\t\t}\n\t": types.GetCustomerDocument,
    "\n\t\tmutation RequestPasswordReset($emailAddress: String!) {\n\t\t\trequestPasswordReset(emailAddress: $emailAddress) {\n\t\t\t\t... on Success {\n\t\t\t\t\tsuccess\n\t\t\t\t}\n\t\t\t\t... on ErrorResult {\n\t\t\t\t\terrorCode\n\t\t\t\t\tmessage\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t": types.RequestPasswordResetDocument,
    "\n\t\tmutation ResetPassword($token: String! $password: String!) {\n\t\t\tresetPassword(token: $token password: $password) {\n\t\t\t\t...on CurrentUser {\n\t\t\t\t\tid\n\t\t\t\t\tidentifier\n\t\t\t\t}\n\t\t\t\t... on ErrorResult {\n\t\t\t\t\terrorCode\n\t\t\t\t\tmessage\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t": types.ResetPasswordDocument,
    "\n\t\tmutation LogIn($emailAddress: String!, $password: String!, $rememberMe: Boolean!) {\n\t\t\tlogin(username: $emailAddress, password: $password, rememberMe: $rememberMe) {\n\t\t\t\t... on  CurrentUser {\n\t\t\t\t\tid\n\t\t\t\t\tidentifier\n\t\t\t\t}\n\t\t\t\t... on ErrorResult {\n\t\t\t\t\terrorCode\n\t\t\t\t\tmessage\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t": types.LogInDocument,
    "\n\t\tmutation LogOut {\n\t\t\tlogout {\n\t\t\t\tsuccess\n\t\t\t}\n\t\t}\n\t": types.LogOutDocument,
    "\n\t\tmutation Register($input: RegisterCustomerInput!) {\n\t\t\tregisterCustomerAccount(input: $input) {\n\t\t\t\t... on Success {\n\t\t\t\t\tsuccess\n\t\t\t\t}\n\t\t\t\t...on ErrorResult {\n\t\t\t\t\terrorCode\n\t\t\t\t\tmessage\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t": types.RegisterDocument,
    "\n\t\tmutation Verify($token: String!) {\n\t\t\tverifyCustomerAccount(token: $token) {\n\t\t\t\t...on CurrentUser {\n\t\t\t\t\tid\n\t\t\t\t\tidentifier\n\t\t\t\t}\n\t\t\t\t...on ErrorResult {\n\t\t\t\t\terrorCode\n\t\t\t\t\tmessage\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t": types.VerifyDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\t\tquery GetActiveOrder {\n\t\t\tactiveOrder {\n\t\t\t\t...ActiveOrder\n\t\t\t}\n\t\t}\n\n\n\t\tfragment ActiveOrder on Order {\n\t\t\t__typename\n\t\t\tid\n\t\t\tcode\n\t\t\tcouponCodes\n\t\t\tstate\n\t\t\tcurrencyCode\n\t\t\ttotalQuantity\n\t\t\tsubTotal\n\t\t\tshipping\n\t\t\ttotal\n\t\t\ttotalWithTax\n\t\t\ttaxSummary {\n\t\t\t\tdescription\n\t\t\t\ttaxRate\n\t\t\t\ttaxBase\n\t\t\t\ttaxTotal\n\t\t\t}\n\t\t\tdiscounts {\n\t\t\t\tdescription\n\t\t\t\tamountWithTax\n\t\t\t}\n\t\t\tlines {\n\t\t\t\tid\n\t\t\t\tunitPrice\n\t\t\t\tunitPriceWithTax\n\t\t\t\tquantity\n\t\t\t\tlinePrice\n\t\t\t\tlinePriceWithTax\n\t\t\t\tproductVariant {\n\t\t\t\t\tid\n\t\t\t\t\tname\n\t\t\t\t\tsku\n\t\t\t\t\tproduct {\n\t\t\t\t\t\tslug\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tfeaturedAsset {\n\t\t\t\t\tid\n\t\t\t\t\tpreview\n\t\t\t\t}\n\t\t\t}\n\t\t\tshippingLines {\n\t\t\t\tshippingMethod {\n\t\t\t\t\tid\n\t\t\t\t\tname\n\t\t\t\t\tdescription\n\t\t\t\t}\n\t\t\t\tpriceWithTax\n\t\t\t}\n\t\t}\n\t"): (typeof documents)["\n\t\tquery GetActiveOrder {\n\t\t\tactiveOrder {\n\t\t\t\t...ActiveOrder\n\t\t\t}\n\t\t}\n\n\n\t\tfragment ActiveOrder on Order {\n\t\t\t__typename\n\t\t\tid\n\t\t\tcode\n\t\t\tcouponCodes\n\t\t\tstate\n\t\t\tcurrencyCode\n\t\t\ttotalQuantity\n\t\t\tsubTotal\n\t\t\tshipping\n\t\t\ttotal\n\t\t\ttotalWithTax\n\t\t\ttaxSummary {\n\t\t\t\tdescription\n\t\t\t\ttaxRate\n\t\t\t\ttaxBase\n\t\t\t\ttaxTotal\n\t\t\t}\n\t\t\tdiscounts {\n\t\t\t\tdescription\n\t\t\t\tamountWithTax\n\t\t\t}\n\t\t\tlines {\n\t\t\t\tid\n\t\t\t\tunitPrice\n\t\t\t\tunitPriceWithTax\n\t\t\t\tquantity\n\t\t\t\tlinePrice\n\t\t\t\tlinePriceWithTax\n\t\t\t\tproductVariant {\n\t\t\t\t\tid\n\t\t\t\t\tname\n\t\t\t\t\tsku\n\t\t\t\t\tproduct {\n\t\t\t\t\t\tslug\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t\tfeaturedAsset {\n\t\t\t\t\tid\n\t\t\t\t\tpreview\n\t\t\t\t}\n\t\t\t}\n\t\t\tshippingLines {\n\t\t\t\tshippingMethod {\n\t\t\t\t\tid\n\t\t\t\t\tname\n\t\t\t\t\tdescription\n\t\t\t\t}\n\t\t\t\tpriceWithTax\n\t\t\t}\n\t\t}\n\t"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\t\tquery GetCustomer {\n\t\t\tactiveCustomer {\n\t\t\t\tid\n\t\t\t\ttitle\n\t\t\t\tfirstName\n\t\t\t\tlastName\n\t\t\t\temailAddress\n\t\t\t}\n\t\t}\n\t"): (typeof documents)["\n\t\tquery GetCustomer {\n\t\t\tactiveCustomer {\n\t\t\t\tid\n\t\t\t\ttitle\n\t\t\t\tfirstName\n\t\t\t\tlastName\n\t\t\t\temailAddress\n\t\t\t}\n\t\t}\n\t"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\t\tmutation RequestPasswordReset($emailAddress: String!) {\n\t\t\trequestPasswordReset(emailAddress: $emailAddress) {\n\t\t\t\t... on Success {\n\t\t\t\t\tsuccess\n\t\t\t\t}\n\t\t\t\t... on ErrorResult {\n\t\t\t\t\terrorCode\n\t\t\t\t\tmessage\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t"): (typeof documents)["\n\t\tmutation RequestPasswordReset($emailAddress: String!) {\n\t\t\trequestPasswordReset(emailAddress: $emailAddress) {\n\t\t\t\t... on Success {\n\t\t\t\t\tsuccess\n\t\t\t\t}\n\t\t\t\t... on ErrorResult {\n\t\t\t\t\terrorCode\n\t\t\t\t\tmessage\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\t\tmutation ResetPassword($token: String! $password: String!) {\n\t\t\tresetPassword(token: $token password: $password) {\n\t\t\t\t...on CurrentUser {\n\t\t\t\t\tid\n\t\t\t\t\tidentifier\n\t\t\t\t}\n\t\t\t\t... on ErrorResult {\n\t\t\t\t\terrorCode\n\t\t\t\t\tmessage\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t"): (typeof documents)["\n\t\tmutation ResetPassword($token: String! $password: String!) {\n\t\t\tresetPassword(token: $token password: $password) {\n\t\t\t\t...on CurrentUser {\n\t\t\t\t\tid\n\t\t\t\t\tidentifier\n\t\t\t\t}\n\t\t\t\t... on ErrorResult {\n\t\t\t\t\terrorCode\n\t\t\t\t\tmessage\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\t\tmutation LogIn($emailAddress: String!, $password: String!, $rememberMe: Boolean!) {\n\t\t\tlogin(username: $emailAddress, password: $password, rememberMe: $rememberMe) {\n\t\t\t\t... on  CurrentUser {\n\t\t\t\t\tid\n\t\t\t\t\tidentifier\n\t\t\t\t}\n\t\t\t\t... on ErrorResult {\n\t\t\t\t\terrorCode\n\t\t\t\t\tmessage\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t"): (typeof documents)["\n\t\tmutation LogIn($emailAddress: String!, $password: String!, $rememberMe: Boolean!) {\n\t\t\tlogin(username: $emailAddress, password: $password, rememberMe: $rememberMe) {\n\t\t\t\t... on  CurrentUser {\n\t\t\t\t\tid\n\t\t\t\t\tidentifier\n\t\t\t\t}\n\t\t\t\t... on ErrorResult {\n\t\t\t\t\terrorCode\n\t\t\t\t\tmessage\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\t\tmutation LogOut {\n\t\t\tlogout {\n\t\t\t\tsuccess\n\t\t\t}\n\t\t}\n\t"): (typeof documents)["\n\t\tmutation LogOut {\n\t\t\tlogout {\n\t\t\t\tsuccess\n\t\t\t}\n\t\t}\n\t"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\t\tmutation Register($input: RegisterCustomerInput!) {\n\t\t\tregisterCustomerAccount(input: $input) {\n\t\t\t\t... on Success {\n\t\t\t\t\tsuccess\n\t\t\t\t}\n\t\t\t\t...on ErrorResult {\n\t\t\t\t\terrorCode\n\t\t\t\t\tmessage\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t"): (typeof documents)["\n\t\tmutation Register($input: RegisterCustomerInput!) {\n\t\t\tregisterCustomerAccount(input: $input) {\n\t\t\t\t... on Success {\n\t\t\t\t\tsuccess\n\t\t\t\t}\n\t\t\t\t...on ErrorResult {\n\t\t\t\t\terrorCode\n\t\t\t\t\tmessage\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n\t\tmutation Verify($token: String!) {\n\t\t\tverifyCustomerAccount(token: $token) {\n\t\t\t\t...on CurrentUser {\n\t\t\t\t\tid\n\t\t\t\t\tidentifier\n\t\t\t\t}\n\t\t\t\t...on ErrorResult {\n\t\t\t\t\terrorCode\n\t\t\t\t\tmessage\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t"): (typeof documents)["\n\t\tmutation Verify($token: String!) {\n\t\t\tverifyCustomerAccount(token: $token) {\n\t\t\t\t...on CurrentUser {\n\t\t\t\t\tid\n\t\t\t\t\tidentifier\n\t\t\t\t}\n\t\t\t\t...on ErrorResult {\n\t\t\t\t\terrorCode\n\t\t\t\t\tmessage\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;