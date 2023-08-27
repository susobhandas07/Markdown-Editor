import { FiTrash2 } from "react-icons/fi";
import { TbDeviceFloppy } from "react-icons/tb";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineFile, AiFillFileAdd } from "react-icons/ai";
import { Menue } from "./Menue.tsx";
import { useRef, useState } from "react";

interface Props {
    fileName: string,
    files: string[],
    handeler: Function,
    saveChanges: Function,
}

export default function main({ fileName, files, handeler, saveChanges }: Props) {
    const modal = useRef<HTMLDialogElement | null>(null);
    const modalInput = useRef<HTMLInputElement | null>(null);
    const [menueVisible, setMenueVisibility] = useState(false);

    const toggleMenue = () => {
        setMenueVisibility(prevState => !prevState);
    }

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
            className="flex items-center bg-header"
        >
            <Menue
                visible={menueVisible}
                handeler={toggleMenue}
            >
                <>
                    <section className="grid place-items-center mt-5" >
                        {files.map((fName) =>
                            <section key={fName} className="bg-gray-400 dark:bg-gray-700 w-full  text-center mb-1 rounded-md">
                                <input type="radio" className="hidden" checked={fName === fileName} value={fName} id={fName} name="file" onChange={(e) => handeler({ type: "updateKey", payLoad: e.target.value })} />
                                <label className="block my-1" htmlFor={fName}>{fName}.md</label>
                            </section>
                        )}
                    </section>
                    <button className="w-full px-3 py-2 rounded-md bg-blue-500 text-white mt-auto" onClick={openModal}>creat new</button>
                </>
            </Menue>
            <button
                className="md:hidden px-4 py-2 animate-morph cursor-pointer relative"
                id="hamburger-menue"
                style={{ fontSize: "2em" }}
                onClick={toggleMenue}
            >
                <RxHamburgerMenu />
            </button>

            <h4 className=" hidden md:block mx-6 pr-6 uppercase font-medium tracking-widest border-black border-r dark:border-gray-600">markdown</h4>

            <AiOutlineFile className="mx-6 md:mx-1" style={{ fontSize: "1.3em" }} />

            <p className="md:hidden">{fileName ? `${fileName}.md` : ""}</p>

            {files.length > 0 && <section className="hidden md:block mx-4 md:mx-1" >
                <p
                    className="capitalize"
                    style={{ fontSize: "0.7em", marginBottom: "-7px" }}
                >
                    dcoument name
                </p>
                <select className="bg-transparent mt-1" value={fileName ? fileName : ""} name="key" onChange={(e) => handeler({ type: "updateKey", payLoad: e.target.value })}>
                    {files.map((fileName) => <option className="p-0 font-medium" key={fileName} value={fileName}>{fileName ? `${fileName}.md` : ""}</option>)}
                </select>
            </section>}

            <button className="hidden md:block md:mx-1 text-xl animate-morph" id="open-modal" onClick={openModal} title="Create File">
                <AiFillFileAdd />
            </button>

            <dialog
                className="px-7 py-5 rounded  text-current"
                id="modal"
                style={{ backgroundColor: "var(--bg-header)", width: "min(90%,450px)" }}
                ref={modal}
            >
                <label htmlFor="new-file-name">Enter Name</label>
                <input
                    id="new-file-name"
                    ref={modalInput}
                    name="new-file-name"
                    type="text"
                    placeholder="example.md"
                    className="block my-3 mb-6 w-full rounded px-1 focus-ring"
                    style={{ backgroundColor: "var(--bg-display-name)", padding: "4px 5px" }}
                    onKeyDown={(e) => { if (e.code === "Enter") create_file(); }}
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
                disabled={files.length <= 0}
                title="Delete File"
            >
                <FiTrash2 />
            </button>

            <button
                className="bg-red-600 mr-3 md:mx-4 my-2 flex items-center gap-2 px-2 rounded py-1 capitalize animate-morph cursor-pointer text-white"
                onClick={() => { saveChanges(); }}
            >
                <TbDeviceFloppy style={{ fontSize: "1.2em" }} />
                <p className="hidden md:inline">save changes</p>
            </button>

        </header>
    );
}