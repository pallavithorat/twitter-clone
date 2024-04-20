import "@/styles/globals.css";
import { Inter } from "next/font/google";
import type { AppProps } from "next/app";
import { GoogleOAuthProvider } from '@react-oauth/google';
import toast, { Toaster } from 'react-hot-toast';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

import {QueryClient,QueryClientProvider} from '@tanstack/react-query';

const inter = Inter({ subsets: ["latin"] });
const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {

  return(
   <div className={inter.className}>
   <QueryClientProvider client={queryClient}>
    <GoogleOAuthProvider clientId="684547129452-iit3ggrdqc92tuvqlqnven9kn3ta1rks.apps.googleusercontent.com">
    <Component {...pageProps} />
    <Toaster />
    <ReactQueryDevtools/>
    </GoogleOAuthProvider>
    </QueryClientProvider>
    
    </div>
  );
}
