import "ui/styles/globals.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Layout from "../components/common/Layout";
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";
import React, { useEffect, useState } from "react";
import { UserContext } from "../services/user/UserContext";
import { User } from "../types/user";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps: { session, ...pageProps }, ...appProps }: AppProps) {
	const router = useRouter();
	const [queryClient] = useState(() => new QueryClient());
	const [user, setUser] = useState<User | null>(null);

	const isAuthPage = appProps.router.pathname.includes(`auth`);
	const LayoutComponent = !isAuthPage ? Layout : React.Fragment;

	useEffect(() => {
		if (!isAuthPage && !user) {
			router.push("/auth");
		}
	}, []);

	return (
		<UserContext.Provider value={{ user, setUser }}>
			<QueryClientProvider client={queryClient}>
				<Hydrate state={pageProps.dehydratedState}>
					<LayoutComponent>
						<>
							<Head>
								<title>Gamified Life OS | REVIVIOS</title>
							</Head>
							<Component {...pageProps} />
						</>
					</LayoutComponent>
				</Hydrate>
			</QueryClientProvider>
		</UserContext.Provider>
	);
}

export default MyApp;
