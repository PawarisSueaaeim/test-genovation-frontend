"use client";
import { signIn, signOut, useSession } from "next-auth/react";

export default function Home() {
    const { data: session } = useSession();

	return (
		<div className="min-h-screen">
			Hello world!
		</div>
	)
}
