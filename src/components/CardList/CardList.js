import React from "react";
import BookCard from "../Card/Card";


function CardList(props) {
    const {robots,onClickIssued,enableShowIssuedDashboard} = props;
    return(
        <div className={'flex  flex-wrap mt5'} style={{"justifyContent":"center"}}>
            {
                robots && robots.map(robot => {
                    return(
                        <BookCard
                            robot = {robot}
                            key={robot[`id`]}
                            onClickIssued={onClickIssued}
                            enableShowIssuedDashboard={enableShowIssuedDashboard}
                        />
                    )
                })
            }
        </div>
    )
}

export default CardList;
