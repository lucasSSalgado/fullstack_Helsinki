export default function Filter(props) {
    return (
        <div>
            filter shown with <input value={props.search} onChange={(e) => props.setSearch(e.target.value)} />
        </div>
    )
}