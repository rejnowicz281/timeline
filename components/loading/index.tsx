import { VscLoading } from "react-icons/vsc";

const Loading = ({ spinnerSize = "50px" }) => {
    return (
        <div className="flex-1 flex justify-center items-center">
            <VscLoading style={{ fontSize: spinnerSize }} className="animate-spin" />
        </div>
    );
};

export default Loading;
