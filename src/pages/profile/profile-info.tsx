import {Button, Input} from "@ya.praktikum/react-developer-burger-ui-components";
import {SyntheticEvent, useEffect} from "react";
import {
    loadProfile, revertChangesInForm,
    setEmail,
    setEmailDisabled,
    setName,
    setNameDisabled, setPassword, setPasswordDisabled, updateProfile
} from "../../services/actions/profile-info-slice";
import {useDispatch, useSelector} from "../../utils/hooks";
import {RootState} from "../../services/store";
import styles from './profile.module.css';

const ProfileInfo = () => {
    const dispatch = useDispatch();

    const {
        isLoading,
        error,
        form,
        disabled
    } = useSelector((state: RootState) => state.profile);

    useEffect(() => {
        dispatch(loadProfile());
    }, [dispatch]);

    if (isLoading) {
        return <div className={'text text_type_main-default text_color_primary'}>Загрузка...</div>
    }

    if (error) {
        return <div>{error}</div>
    }

    function cancelEditing(e: SyntheticEvent) {
        e.preventDefault();
        dispatch(revertChangesInForm());
    }

    return !isLoading && !error &&

        <form onSubmit={() => dispatch(updateProfile(form))}>
            <div className={styles.profileForm}>

                <Input placeholder="Имя"
                       icon="EditIcon"
                       name={'name'}
                       value={form.name}
                       disabled={disabled.name_disabled}
                       onChange={(e) => dispatch(setName(e.target.value))}
                       onIconClick={() => dispatch(setNameDisabled(!disabled.name_disabled))}
                />
                <Input
                    placeholder="Логин"
                    value={form.email}
                    name={'email'}
                    icon="EditIcon"
                    disabled={disabled.email_disabled}
                    onChange={(e) => dispatch(setEmail(e.target.value))}
                    onIconClick={() => dispatch(setEmailDisabled(!disabled.email_disabled))}
                />
                <Input
                    placeholder="Пароль"
                    value={form.password}
                    name={'password'}
                    icon="EditIcon"
                    disabled={disabled.password_disabled}
                    onChange={(e) => dispatch(setPassword(e.target.value))}
                    onIconClick={() => dispatch(setPasswordDisabled(!disabled.password_disabled))}
                />

                {!disabled.password_disabled || !disabled.email_disabled || !disabled.name_disabled ?
                    (<div className={"pl-10"}>
                        {/* @ts-ignore */}
                        <Button size={"small"} type={"primary"}>Сохранить</Button>
                        {/* @ts-ignore */}
                        <Button size={"small"} type='secondary' onClick={cancelEditing}>Отменить</Button>
                    </div>) : null}

            </div>
        </form>

}

export default ProfileInfo;
