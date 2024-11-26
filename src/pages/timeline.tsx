import { useParams } from "react-router-dom";

export default function TimelinePage() {
    const { username } = useParams();

    return <div>TimelinePage {username}</div>;
}
