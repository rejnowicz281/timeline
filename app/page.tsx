import Input from "@/components/input";
import css from "./page.module.css";

const Home = () => {
    return (
        <div className={css.wrapper}>
            <div className={css.container}>
                <h1 className={css.header}>Generate a timeline for...</h1>
                <Input />
            </div>
        </div>
    );
};

export default Home;
