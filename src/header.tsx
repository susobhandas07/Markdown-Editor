import { FiTrash2 } from "react-icons/fi";
import { TbDeviceFloppy } from "react-icons/tb";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineFile } from "react-icons/ai";
export default function main() {
    return (
        <header
            className="flex items-center py-2"
            style={{ backgroundColor: "var(--bg-header)" }}
        >
            <button
                className="mx-4 animate-morph cursor-pointer relative"
                id="hamburger-menue"
                style={{ fontSize: "2em" }}
                disabled={true}
            >
                <RxHamburgerMenu />
            </button>

            <h4 className="mx-6 pr-6 uppercase font-medium tracking-widest border-black border-r dark:border-gray-600">markdown</h4>

            <AiOutlineFile className="mx-1" style={{ fontSize: "1.3em" }} />

            <section className="mx-1">
                <p
                    className="capitalize"
                    style={{ fontSize: "0.7em", marginBottom: "-7px" }}
                >
                    dcoument name
                </p>
                <span className="p-0 font-medium">welcome.md</span>
            </section>
            <button
                className="animate-morph cursor-pointer mx-4"
                style={{ marginLeft: "auto", fontSize: "1.2em" }}
                disabled={true}
            >
                <FiTrash2 />
            </button>

            <button
                className="bg-red-600 mx-4 flex items-center gap-2 px-2 rounded py-1 capitalize animate-morph cursor-pointer"
                style={{ color: "white" }}
                disabled={true}
            >
                <TbDeviceFloppy style={{ fontSize: "1.2em" }} />
                save changes
            </button>

        </header>
    );
}