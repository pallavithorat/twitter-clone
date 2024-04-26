import { GraphQLClient } from "graphql-request";

const isClient = typeof window !== 'undefined';
//https://d25pn6flyt9tb9.cloudfront.net/graphql
export const graphqlClient = new GraphQLClient("process.env.NEXT_PUBLIC_API_URL as string",{
    headers: () => ({
        Authorization: isClient ? `Bearer ${window.localStorage.getItem('__twitter_token')}`:"",
    }),
});