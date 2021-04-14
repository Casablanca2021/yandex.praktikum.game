import { useDispatch } from 'react-redux';
import { Action } from 'store/actions/types';
import { AppThunkAction, AppThunkDispatch } from 'store/types';

export const useAction = <TAction>(action: Action<TAction>) => {
  const dispatch = useDispatch();

  return () => dispatch(action);
};

export const useThunkAction = <TData, TAction>(action: (data: TData) => AppThunkAction<TAction>) => {
  const dispatch = useDispatch<AppThunkDispatch>();

  return (data: TData) => dispatch(action(data));
};
