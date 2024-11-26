import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CircleDashed } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function InputBox() {
    const [username, setUsername] = useState("");
    const navigate = useNavigate();

    return (
        <form
            onSubmit={(e) => {
                e.preventDefault();
                navigate(username);
            }}
            className="max-w-[350px] w-full flex flex-col gap-3"
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
            <Button variant="ghost" className="group flex items-center gap-2 text-md">
                <CircleDashed size={16} className="group-hover:animate-spin" />
                Generate Timeline
            </Button>
        </form>
    );
}
