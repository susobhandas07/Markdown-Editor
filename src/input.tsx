interface Props {
    child: string | null,
    handeler: Function,
    className: String | null,
}
export default function main({ child, handeler, className = "" }: Props) {
    const classes = `md:w-6/12 py-1 border-gray-400 dark:border-gray-700 ${className}`
    return (
        <div className={classes}
            style={{ height: "100%", backgroundColor: "var(--bg-display-name)" }}>
            <h5 className=" hidden md:block tracking-widest uppercase my-1 px-5">Input</h5>
            <textarea
                name="content"
                className="w-full h-full resize-none p-2 outline-none"
                style={{ backgroundColor: "var(--bg-textarea)" }}
                value={child ?? ""}
                onChange={(e) => handeler({ type: "updateNote", payLoad: e.target.value })} />
        </div>
    );
}