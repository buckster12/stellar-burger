import {
    TypedUseSelectorHook,
    useDispatch as useDispatchNative,
    useSelector as useSelectorNative,
} from 'react-redux';

import {AppDispatch} from "../types/redux";
import {RootState} from "../services/store";

export const useSelector: TypedUseSelectorHook<RootState> = useSelectorNative;
export const useDispatch = () => useDispatchNative<AppDispatch>();
