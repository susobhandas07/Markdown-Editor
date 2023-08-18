import { useEffect, useRef } from "react";
import { BsFillPlusCircleFill } from "react-icons/bs";
export default function main() {
    const ref = useRef<HTMLButtonElement>(null);
    useEffect(() => {
        const modal = document.getElementById("modal") as HTMLDialogElement | null;
        function openModal() {
            if (modal) {
                modal.showModal();
            }
        }
        if (ref.current) {
            ref.current.addEventListener("click", openModal);
            return () => { if (ref.current) ref.current.removeEventListener("click", openModal); }
        }
    }, []);
    return (
        <div className="py-1 grid place-items-center"
            style={{ height: "93vh", backgroundColor: "var(--bg-display-name)" }}>
            <section className="w-1/4 flex items-center justify-around">
                <h4 className="capitalize">No note found</h4>
                <button
                    className="mx-1 animate-morph capitalize flex items-center justify-around bg-blue-500 px-3 py-2 rounded text-white"
                    ref={ref}
                >
                    <BsFillPlusCircleFill size={20} className="mr-2" />  create new file
                </button>
            </section>
        </div>
    );
}