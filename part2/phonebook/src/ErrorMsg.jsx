import './index.css'

export default function ErrorMsg(props) {
    if (props.msg === null || props.msg === '') {
        return null
    }

    return (
        <div className='error'>
            { props.msg }
        </div>
    )
}