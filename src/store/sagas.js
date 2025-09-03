// src/store/sagas.js

import { all, fork } from "redux-saga/effects";

// public
import AccountSaga from "./auth/register/saga";
import AuthSaga from "./auth/login/saga";
import ForgetSaga from "./auth/forgetpwd/saga";
import ProfileSaga from "./auth/profile/saga";
import LayoutSaga from "./layout/saga";
import calendarSaga from "./calendar/saga";
import groupSaga from "./group/saga";


import {

  watchEmailRegistration,


} from "./service/saga";

export default function* rootSaga() {
  yield all([
    fork(AccountSaga),
    fork(AuthSaga),
    fork(ForgetSaga),
    fork(ProfileSaga),
    fork(LayoutSaga),
    fork(calendarSaga),
    fork(groupSaga),

    fork(watchEmailRegistration),


  ]);
}
