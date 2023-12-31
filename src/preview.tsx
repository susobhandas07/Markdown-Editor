import { ReactMarkdown } from "react-markdown/lib/react-markdown";
interface Props {
    data: String | null,
    className: String | null,
}
export default function main({ data, className = "" }: Props) {
    const classes = `md:w-6/12 py-1 ${className}`;
    return (
        <div className={classes}
            style={{ backgroundColor: "var(--bg-display-name)" }}>
            <h5 className="hidden md:block tracking-widest uppercase px-5 my-1">Preview</h5>
            <section
                className="w-full p-2 overflow-y-scroll"
                style={{ backgroundColor: "var(--bg-textarea)", height: "95.3%", maxHeight: "95.3%" }}
            >
                <ReactMarkdown children={data as string ?? ""} />
            </section>
        </div>
    );
}