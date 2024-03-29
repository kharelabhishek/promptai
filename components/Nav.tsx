'use client';
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getProviders, signIn, signOut } from "next-auth/react";

interface NavProps {
    // Add any necessary props here
}

const Nav: React.FC<NavProps> = () => {
    const [providers, setProviders] = useState<any>(null);
    const [toggleDropdown, setToggleDropdown] = useState<boolean>(false);

    useEffect(() => {
        const setProvider = async () => {
            const response = await getProviders();
            setProviders(response);
        };

        setProvider();
    }, []);

    const isUserLoggedIn = true;

    const handleSignOut = () => {
        // Your signOut logic goes here
    };

    return (
        <nav className="flex gap-2 flex-between w-full mb-16 pt-3">
            <Link href="/" className="flex gap-2 flex-center">
                <Image
                    src="/assets/images/logo.svg"
                    alt="Promptopia"
                    width={30}
                    height={30}
                    className="object-contain"
                />
                <p className="logo_text">Promptopia</p>
            </Link>
            {/* Desktop View */}
            <div className="sm:flex hidden">
                {isUserLoggedIn ? (
                    <div className="flex gap-3 md:gap-5">
                        <Link href="/create-prompt" className="black_btn">
                            Create Post
                        </Link>
                        <button onClick={handleSignOut} className="outline_btn">
                            Sign Out
                        </button>
                        <Link href="/profile">
                            <Image
                                src="/assets/images/logo.svg"
                                alt="profile"
                                width={37}
                                height={37}
                                className="rounded-full"
                            />
                        </Link>
                    </div>
                ) : (
                    <>
                        {
                            providers && Object.values(providers).map((provider: any) => [
                                <button type="button" key={provider.name}
                                    onClick={() => signIn(provider.id)}
                                    className="black-btn">
                                    Sign In
                                </button>
                            ])
                        }
                    </>
                )}
            </div>

            {/* Mobile View */}
            <div className="sm:hidden flex relative">
                {
                    isUserLoggedIn ? (
                        <div className="flex">
                            <Image
                                src="/assets/images/logo.svg"
                                alt="Promptopia"
                                width={30}
                                height={30}
                                className="object-contain"
                                onClick={() => setToggleDropdown((prev) => !prev)}
                            />
                            {
                                toggleDropdown && (
                                    <div className="dropdown">
                                        <Link href="/profile" className="dropdown_link" onClick={() => setToggleDropdown(false)}>My Profile</Link>
                                        <Link href="/create-prompt" className="dropdown_link" onClick={() => setToggleDropdown(false)}>Create Prompt</Link>
                                        <button
                                            onClick={() => {
                                                setToggleDropdown(false)
                                                signOut()
                                            }}
                                            className="mt-5 w-full black_btn">
                                            Sign Out
                                        </button>
                                    </div>
                                )
                            }
                        </div>
                    ) : <>
                        {
                            providers && Object.values(providers).map((provider: any) => [
                                <button type="button" key={provider.name}
                                    onClick={() => signIn(provider.id)}
                                    className="black-btn">
                                    Sign In
                                </button>
                            ])
                        }
                    </>
                }
            </div>
        </nav>
    );
};

export default Nav;
