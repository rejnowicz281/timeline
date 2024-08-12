"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MdDownloading } from "@react-icons/all-files/md/MdDownloading";
import Link from "next/link";
import { useRef, useState } from "react";

const InputBox = () => {
    const [username, setUsername] = useState("");
    const linkRef = useRef<HTMLAnchorElement>(null);

    return (
        <form
            className="max-w-[350px] w-full flex flex-col gap-3"
            onSubmit={(e) => {
                e.preventDefault();
                linkRef.current?.click();
            }}
        >
            <Input
                type="text"
                placeholder="Type in username here..."
                className="text-center"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                name="username"
                id="username"
            />

            <Button variant="ghost" className="flex items-center gap-2 text-md" asChild>
                <Link ref={linkRef} href={`/${username}`}>
                    <MdDownloading />
                    Generate Timeline
                </Link>
            </Button>
        </form>
    );
};

export default InputBox;
