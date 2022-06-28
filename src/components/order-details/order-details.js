import OrderDetailsStyles from './order-details.module.css';
import PropTypes from "prop-types";
import doneSvg from '../../images/done.png';
import classNames from "classnames";
import Modal from "../modal/modal";

const OrderDetails = ({close}) => {
    return (
        <Modal onClose={close} title="">
            <span
                className={classNames(OrderDetailsStyles.orderIdentifier, "text text_type_digits-large")}>
                034536
            </span>
            <span className="pt-6 text text_type_main-medium">идентификатор заказа</span>
            <img className={OrderDetailsStyles.imgOk} src={doneSvg} alt="done"/>
            <span className="text text_type_main-small">
                        ваш заказ начали готовить</span>
            <span className="text text_type_main-small text_color_inactive">
                        Дождитесь готовности на орбитальной станции
            </span>
        </Modal>
    );
}

OrderDetails.propTypes = {
    close: PropTypes.func.isRequired,
}

export default OrderDetails;
