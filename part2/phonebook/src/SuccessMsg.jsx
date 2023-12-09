import './index.css'

export default function SuccessMsg(props) {
    if (props.msg === null || props.msg === '') {
        return null
    }

    return (
        <div className='success'>
            { props.msg }
        </div>
    )
}