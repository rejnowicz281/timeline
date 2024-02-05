import css from "./index.module.css";

const Loading = () => {
    return (
        <div className={css.wrapper}>
            <div className={css.loading}>Loading...</div>
        </div>
    );
};

export default Loading;
