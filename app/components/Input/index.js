import { redirect } from "next/navigation";

export default function Input() {
    return (
        <div>
            <form
                action={async (formData) => {
                    "use server";

                    const username = formData.get("username");

                    if (username) redirect(`/${username}`);
                }}
            >
                <input type="text" placeholder="type in username here" name="username" id="username" />
                <button>Go</button>
            </form>
        </div>
    );
}
