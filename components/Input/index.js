import { redirect } from "next/navigation";
import { AiOutlineLoading } from "react-icons/ai";
import { MdDownloading } from "react-icons/md";
import SubmitButton from "../SubmitButton";
import css from "./index.module.css";

export default function Input() {
    return (
        <form
            className={css.form}
            action={async (formData) => {
                "use server";

                const username = formData.get("username");

                if (username) redirect(`/${username}`);
            }}
        >
            <input
                className={css.input}
                type="text"
                placeholder="Type in username here..."
                name="username"
                id="username"
            />
            <SubmitButton
                className={css.submit}
                loading={<AiOutlineLoading className={css.spin} />}
                content={<MdDownloading />}
            />
        </form>
    );
}
