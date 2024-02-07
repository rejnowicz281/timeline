import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { redirect } from "next/navigation";
import { AiOutlineLoading } from "react-icons/ai";
import { MdDownloading } from "react-icons/md";
import SubmitButton from "../submit-button";

const InputBox = () => {
    return (
        <form
            className="max-w-[350px] w-full flex flex-col gap-3"
            action={async (formData) => {
                "use server";

                const username = formData.get("username");

                if (username) redirect(`/${username}`);
            }}
        >
            <Input type="text" placeholder="Type in username here..." name="username" id="username" />

            <Button
                className="flex items-center gap-2 text-lg bg-neutral-800 hover:bg-neutral-700 border-gray-700"
                asChild
            >
                <SubmitButton
                    loading={
                        <>
                            <AiOutlineLoading className="animate-spin" />
                            Generating Timeline...
                        </>
                    }
                    content={
                        <>
                            <MdDownloading />
                            Generate Timeline
                        </>
                    }
                />
            </Button>
        </form>
    );
};

export default InputBox;
