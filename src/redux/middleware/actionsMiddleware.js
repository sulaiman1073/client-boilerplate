import { register, login } from "../actions";

const routingMiddleware = () => store => next => action => {
  next(action);

  if (register.fulfilled.match(action)) {
    const loginInfo = action.payload;
    store.dispatch(login(loginInfo));
  }
};

export default routingMiddleware;
