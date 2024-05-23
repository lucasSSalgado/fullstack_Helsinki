const Notification = ({ error }: {error: string | undefined}) => {
    return (
        <>
            {error && <p style={{color: 'red'}}>{error}</p>}
        </>
    )
}

export default Notification