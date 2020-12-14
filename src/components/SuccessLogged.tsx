import React, {useEffect} from "react";

interface IData {
    email: string,
    name: string
}


interface SuccessLoggedProps {
    data: IData,
    onExit (): void
}


const SuccessLogged: React.FC<SuccessLoggedProps> = (props) => {

    console.log('Enter SuccessLogged')
    console.log(props)

    return (
        <div className={"successLogged"}>
            <div>
                <h5>{`Hello ${props.data.name}`}</h5>
            </div>
            <div>
                <h5>{`Your email ${props.data.email}`}</h5>
            </div>

            <button type="submit" className="waves-effect waves-red btn-large" onClick={props.onExit}>Exit</button>

        </div>
    )
}

export default SuccessLogged;