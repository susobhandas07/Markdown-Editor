import { ReactMarkdown } from "react-markdown/lib/react-markdown";
interface Props {
    data: String | null,
}
export default function main({ data }: Props) {
    return (
        <div className="w-6/12 py-1 "
            style={{ height: "93vh", backgroundColor: "var(--bg-display-name)" }}>
            <h5 className="tracking-widest uppercase px-5 my-1">Preview</h5>
            <section
                className="w-full h-full p-2"
                style={{ backgroundColor: "var(--bg-textarea)" }}
            >
                <ReactMarkdown children={data as string ?? ""} />
            </section>
        </div>
    );
}