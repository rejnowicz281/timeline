import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AiOutlineLoading } from "@react-icons/all-files/ai/AiOutlineLoading";
import { MdDownloading } from "@react-icons/all-files/md/MdDownloading";
import { redirect } from "next/navigation";
import SubmitButton from "./submit-button";

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
            <Input
                type="text"
                placeholder="Type in username here..."
                className="text-center"
                name="username"
                id="username"
            />

            <Button variant="ghost" className="flex items-center gap-2 text-md" asChild>
                <SubmitButton
                    loading={
                        <>
                            <AiOutlineLoading className="animate-spin" />
                            Generate Timeline
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
