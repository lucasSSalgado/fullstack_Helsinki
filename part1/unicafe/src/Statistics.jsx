import StatisticLine from "./StatisticLine"

const Statistics = (props) => {
    let total = props.good + props.neutral + props.bad
    let average = (props.good * 1 - props.bad * 1)/total
    let positive = props.good / total * 100

    return  (
        <div>
            { 
            props.good || props.neutral || props.bad ?
                <>
                    <StatisticLine text={"good"} value={props.good} />
                    <StatisticLine text={"neutral"} value={props.neutral} />
                    <StatisticLine text={"bad"} value={props.bad} />
                    <StatisticLine text={"all"} value={total} />
                    <StatisticLine text={"average"} value={average} />
                    <StatisticLine text={"positive"} value={`${positive}%`} />
                </> :   
                <p>
                    No feedback given
                </p>
            }
        </div>
    )
}

export default Statistics