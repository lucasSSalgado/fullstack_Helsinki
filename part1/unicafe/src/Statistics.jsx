import StatisticLine from "./StatisticLine"

const Statistics = (props) => {
    let total = props.good + props.neutral + props.bad
    let average = (props.good * 1 - props.bad * 1)/total
    let positive = props.good / total * 100

    return  (
        <div>
            { 
            props.good || props.neutral || props.bad ?
                <table>
                    <tr><StatisticLine text={"good"} value={props.good} /></tr>
                    <tr><StatisticLine text={"neutral"} value={props.neutral} /></tr>
                    <tr><StatisticLine text={"bad"} value={props.bad} /></tr>
                    <tr><StatisticLine text={"all"} value={total} /></tr>
                    <tr><StatisticLine text={"average"} value={average} /></tr>
                    <tr><StatisticLine text={"positive"} value={`${positive}%`} /></tr>
                </table> :   
                <p>
                    No feedback given
                </p>
            }
        </div>
    )
}

export default Statistics