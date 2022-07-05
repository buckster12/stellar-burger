import OrderDetailsStyles from './order-details.module.css';
import PropTypes from "prop-types";
import doneSvg from '../../images/done.png';
import classNames from "classnames";
import Modal from "../modal/modal";

const OrderDetails = ({isLoading, isOk, orderId, close}) => {

    return (
        <Modal onClose={close} title="">
            {isLoading &&
                <div className={OrderDetailsStyles.textCenter}>
                    <div className="text text_type_main-medium">
                        Загрузка...
                    </div>
                </div>}

            {!isLoading && isOk &&
                (
                    <>
                        <span
                            className={classNames(OrderDetailsStyles.orderIdentifier, "text text_type_digits-large")}
                        >{orderId}</span>
                        <span className="pt-6 text text_type_main-medium">идентификатор заказа</span>
                        <img className={OrderDetailsStyles.imgOk} src={doneSvg} alt="done"/>
                        <span className="text text_type_main-small">ваш заказ начали готовить</span>
                        <span className="text text_type_main-small text_color_inactive">
                            Дождитесь готовности на орбитальной станции
                        </span>
                    </>)}
            {!isLoading && !isOk &&
                <div className={OrderDetailsStyles.textCenter}>
                    <div className="text text_type_main-medium">
                        Произошла ошибка при оформление заказа, попробуйте еще раз
                    </div>
                </div>}

        </Modal>
    );
}

OrderDetails.propTypes = {
    close: PropTypes.func.isRequired,
    orderId: PropTypes.number.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isOk: PropTypes.bool.isRequired
}

export default OrderDetails;
