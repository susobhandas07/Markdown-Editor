interface Props {
    child: string | undefined,
    handeler: Function,
}
export default function main({ child, handeler }: Props) {
    return (
        <div className="w-6/12 py-1 border-r-2 border-gray-400 dark:border-gray-700"
            style={{ height: "93vh", backgroundColor: "var(--bg-display-name)" }}>
            <h5 className="tracking-widest uppercase px-5 my-1">Input</h5>
            <textarea
                name="content"
                className="w-full h-full resize-none p-2 outline-none"
                style={{ backgroundColor: "var(--bg-textarea)" }}
                value={child !== null ? child : ""}
                onChange={(e) => handeler(e)} />
        </div>
    );
}