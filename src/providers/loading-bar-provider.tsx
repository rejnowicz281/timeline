import { createContext, ReactNode, useContext, useState } from "react";
import LoadingBar from "react-top-loading-bar";

const LoadingBarContext = createContext<
    | {
          progress: number;
          setProgress: React.Dispatch<React.SetStateAction<number>>;
      }
    | undefined
>(undefined);

export function LoadingBarProvider({ children }: { children: ReactNode }) {
    const [progress, setProgress] = useState(0);

    return (
        <LoadingBarContext.Provider value={{ progress, setProgress }}>
            <LoadingBar height={4} progress={progress} waitingTime={400} />
            {children}
        </LoadingBarContext.Provider>
    );
}

export function useLoadingBar() {
    const context = useContext(LoadingBarContext);

    if (!context) throw new Error("useLoadingBar must be used within a LoadingBarProvider");

    return context;
}
