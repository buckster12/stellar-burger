import {
    TypedUseSelectorHook,
    useDispatch as useDispatchNative,
    useSelector as useSelectorNative,
} from 'react-redux';

import {AppDispatch, IMainState} from "../types/redux";

export const useSelector: TypedUseSelectorHook<IMainState> = useSelectorNative;
export const useDispatch = () => useDispatchNative<AppDispatch>();
