import { FiTrash2 } from "react-icons/fi";
import { TbDeviceFloppy } from "react-icons/tb";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineFile, AiFillFileAdd } from "react-icons/ai";
import { useRef } from "react";

interface Props {
    fileName: string,
    files: string[],
    handeler: Function
}

export default function main({ fileName, files, handeler }: Props) {
    const modal = useRef<HTMLDialogElement | null>(null);
    const modalInput = useRef<HTMLInputElement | null>(null);

    const openModal = () => {
        if (modal.current) {
            modal.current.showModal();
        }
    };

    const closeAndClearModal = () => {
        if (modalInput.current) {
            modalInput.current.value = "";
        }
        if (modal.current) {
            modal.current.close();
        }
    };

    const searchFile = (name: string): boolean => {
        for (let f of files) {
            if (f === name) {
                return true;
            }
        }
        return false;
    }

    const extractFileName = (fullName: string): string | null => {
        let i = fullName.length - 1;

        while (i > 2) {
            if (fullName[i - 2] === "." && fullName[i - 1] === "m" && fullName[i] === "d") break;
            else i -= 1;
        }

        if (i <= 2) {
            //error
            return null;
        } else {
            return fullName.slice(0, i - 2);
        }
    }

    /* 
    ?   this method will be depreciated
        error informer to user
    */
    const alert = (message: string) => {
        window.alert(message);
    }

    //file create handeler
    const create_file = () => {
        const newFileNameWithExtension = modalInput.current ? modalInput.current.value : "untitled";
        const newFileName = extractFileName(newFileNameWithExtension);
        if (!newFileName) {
            //error
            alert("Please Enter Valid File Name!");
        } else {
            //valid name
            if (!searchFile(newFileName)) {
                closeAndClearModal();
                handeler({ type: "newNote", payLoad: newFileName });
            } else {
                alert("File already exists!");
            }
        }
    }

    const delete_file = () => {
        if (!searchFile(fileName)) {
            alert("Sorry! error occured.78");
        }
        else {
            handeler({ type: "deleteNote", payLoad: fileName });
        }
    }
    return (
        <header
            className="flex items-center py-2 sticky top-0"
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

            <h4 className=" hidden md:block mx-6 pr-6 uppercase font-medium tracking-widest border-black border-r dark:border-gray-600">markdown</h4>

            <AiOutlineFile className="hidden md:block mx-6 md:mx-1" style={{ fontSize: "1.3em" }} />

            <section className="mx-4 md:mx-1" >
                <p
                    className="capitalize"
                    style={{ fontSize: "0.7em", marginBottom: "-7px" }}
                >
                    dcoument name
                </p>
                <select className="bg-transparent mt-1" value={fileName} name="key" onChange={(e) => handeler({ type: "updateKey", payLoad: e.target.value })}>
                    {files.map((fileName) => <option className="p-0 font-medium" key={fileName} value={fileName}>{fileName}.md</option>)}
                </select>
            </section>

            <button className="md:mx-1 text-xl animate-morph" id="open-modal" onClick={() => { if (modal.current) { openModal(); } }}>
                <AiFillFileAdd />
            </button>

            <dialog
                className="px-7 py-5 rounded  text-current"
                id="modal"
                style={{ backgroundColor: "var(--bg-header)" }}
                ref={modal}
            >
                <label htmlFor="new-file-name">Enter Name</label>
                <input
                    id="new-file-name"
                    ref={modalInput}
                    name="new-file-name"
                    type="text"
                    placeholder="example.md"
                    className="block my-3 mb-6 w-96 rounded px-1 focus-ring"
                    style={{ backgroundColor: "var(--bg-display-name)", padding: "4px 5px" }}
                />

                <button className="float-right bg-green-600 mx-2 px-4 py-2 rounded capitalize text-white animate-morph"
                    onClick={() => { create_file() }}
                >
                    ok
                </button>

                <button className="float-right mx-2 rounded px-4 py-2 capitalize animate-morph"
                    style={{ backgroundColor: "var(--bg-textarea)" }}
                    onClick={() => { if (modal.current) modal.current.close() }}>cancel</button>
            </dialog>

            <button
                className="animate-morph cursor-pointer mx-2 ml-auto"
                style={{ fontSize: "1.2em" }}
                onClick={() => { delete_file() }}
            >
                <FiTrash2 />
            </button>

            <button
                className="bg-red-600 mr-3 md:mx-4 flex items-center gap-2 px-2 rounded py-1 capitalize animate-morph cursor-pointer text-white"
                disabled={true}
            >
                <TbDeviceFloppy style={{ fontSize: "1.2em" }} />
                <p className="hidden md:inline">save changes</p>
            </button>

        </header>
    );
}