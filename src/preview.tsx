import { ReactMarkdown } from "react-markdown/lib/react-markdown";
interface Props {
    data: String | null,
    className: String | null,
}
export default function main({ data, className = "" }: Props) {
    const classes = `md:w-6/12 py-1 ${className}`;
    return (
        <div className={classes}
            style={{ height: "100%", backgroundColor: "var(--bg-display-name)" }}>
            <h5 className="hidden md:block tracking-widest uppercase px-5 my-1">Preview</h5>
            <section
                className="w-full h-full p-2"
                style={{ backgroundColor: "var(--bg-textarea)" }}
            >
                <ReactMarkdown children={data as string ?? ""} />
            </section>
        </div>
    );
}