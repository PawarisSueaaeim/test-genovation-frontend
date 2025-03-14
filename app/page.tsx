"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
    const { data: session } = useSession();

	return (
		<div>
			Hello world!
		</div>
	)
}
