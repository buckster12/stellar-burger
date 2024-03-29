import styles from './order-details.module.css';
import doneSvg from '../../images/done.png';
import classNames from "classnames";
import {FC} from "react";

type TOrderDetails = {
    isLoading: boolean,
    isOk: boolean,
    orderId: number | null
}

const OrderDetails: FC<TOrderDetails> = ({isLoading, isOk, orderId}) => {
    return (
        <>
            {isLoading &&
                <div className={styles.textCenter}>
                    <div className="text text_type_main-medium">
                        Загрузка...
                    </div>
                </div>}

            {!isLoading && isOk &&
                (
                    <>
                        <span
                            className={classNames(styles.orderIdentifier, "text text_type_digits-large")}
                        >{orderId}</span>
                        <span className="pt-6 text text_type_main-medium">идентификатор заказа</span>
                        <img className={styles.imgOk} src={doneSvg} alt="done"/>
                        <span className="text text_type_main-small">ваш заказ начали готовить</span>
                        <span className="text text_type_main-small text_color_inactive">
                            Дождитесь готовности на орбитальной станции
                        </span>
                    </>)}
            {!isLoading && !isOk &&
                <div className={styles.textCenter}>
                    <div className="text text_type_main-medium">
                        Произошла ошибка при оформление заказа, попробуйте еще раз
                    </div>
                </div>}
        </>
    );
}

export default OrderDetails;
