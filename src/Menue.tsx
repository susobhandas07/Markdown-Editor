import { ReactNode } from "react";
import { RxCross1 } from "react-icons/rx";
interface Props {
    children: ReactNode,
    visible: boolean,
    handeler: Function
}
function Menue({ children, visible, handeler }: Props) {
    return (
        <div className="md:hidden absolute top-0 z-10 w-72 h-screen text-right p-4 flex flex-col"
            style={{ backgroundColor: "var(--bg-header)", transitionDuration: "500ms", left: "-288px", transform: visible ? "translateX(288px)" : "" }}
        >
            <button onClick={() => handeler()} className="px-5 py-2 rounded-md self-end"><RxCross1 /></button>
            <h4 className="text-center">Files</h4>
            {children}
        </div>
    );
}
export { Menue };