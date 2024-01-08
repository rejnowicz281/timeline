import Input from "@/components/Input";
import css from "./page.module.css";

export default function Home() {
    return (
        <div className={css.wrapper}>
            <div class={css.container}>
                <h1 className={css.header}>Generate a timeline for...</h1>
                <Input />
            </div>
        </div>
    );
}
