import { call, put, takeLatest } from "redux-saga/effects";
import {
  REGISTER_EMAIL_REQUEST,
} from "./actionTypes";

import {
  registerEmailSuccess,
  registerEmailFailure,
} from "./actions";

function* handleRegisterEmail(action) {
  const { email, description, profileName } = action.payload;
  const validProfiles = ["MBANK", "ADMBANK", "MWALLET", "ADMWALLET"];
  const userType = profileName.trim().toUpperCase();

  if (!validProfiles.includes(userType)) {
    yield put(registerEmailFailure("Invalid profile name."));
    return;
  }

  const username = "+918322222222";
  const password = "KBDnaSTjc0ClkInxlYNPJrhu";
  const encodedCredentials = btoa(`${username}:${password}`);

  const getStoredDescription = (profile) => {
    const saved = JSON.parse(localStorage.getItem("profileDescriptions") || "{}");
    return saved[profile] || null;
  };

  const saveDescription = (profile, desc) => {
    const saved = JSON.parse(localStorage.getItem("profileDescriptions") || "{}");
    if (!saved[profile]) {
      saved[profile] = desc;
      localStorage.setItem("profileDescriptions", JSON.stringify(saved));
    }
    return saved[profile];
  };

  const finalDescription = getStoredDescription(userType) || saveDescription(userType, description);

  try {
    const res = yield call(fetch, `http://114.143.169.62:8085/v1/accounts/registernew/${email}`, {
      headers: {
        Accept: "application/json",
        Authorization: `Basic ${encodedCredentials}`,
      },
    });

    const data = yield res.json();

    if (data?.password) {
      localStorage.setItem(
        `${userType.toLowerCase()}user`,
        JSON.stringify({
          username: email,
          password: data.password,
          userType,
          description: finalDescription,
        })
      );

      yield put(registerEmailSuccess(`Email registered as ${userType}`));
    } else {
      yield put(registerEmailFailure("Unexpected response from API."));
    }
  } catch (error) {
    yield put(registerEmailFailure("Failed to register email."));
  }
}

export function* watchEmailRegistration() {
  yield takeLatest(REGISTER_EMAIL_REQUEST, handleRegisterEmail);
}

