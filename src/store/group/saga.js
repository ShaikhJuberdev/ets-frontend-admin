






import { call, put, takeLatest, all } from "redux-saga/effects";
import {
  FETCH_GROUPS,
  FETCH_USERS,
  CREATE_GROUP,
  SEND_GROUP_MESSAGE,
  FETCH_GROUP_DETAILS,
  EDIT_GROUP_NAME,
  ADD_MEMBER,
  REMOVE_MEMBER,
  MAKE_ADMIN,
} from "./actionTypes";

import {
  fetchGroupsSuccess,
  fetchGroupsFail,
  fetchUsersSuccess,
  fetchUsersFail,
  createGroupSuccess,
  createGroupFail,
  sendGroupMessageSuccess,
  sendGroupMessageFail,
  fetchGroups,
  fetchGroupDetailsSuccess,
  fetchGroupDetailsFail,
  editGroupNameSuccess,
  editGroupNameFail,
  addMemberSuccess,
  addMemberFail,
  removeMemberSuccess,
  removeMemberFail,
  makeAdminSuccess,
  makeAdminFail,
} from "./actions";

// ---------- ENV SETUP ----------
const HOST = process.env.REACT_APP_API_HOST;
const PORT_8082 = process.env.REACT_APP_API_PORT_8082;
const PORT_8085 = process.env.REACT_APP_API_PORT_8085;

const BASE_8082 = `${HOST}:${PORT_8082}/v1`;
const BASE_8085 = `${HOST}:${PORT_8085}/v1`;

const username = process.env.REACT_APP_USERNAME;
const password = process.env.REACT_APP_PASSWORD;
const basicAuth = "Basic " + btoa(`${username}:${password}`);

// ---------- SAGAS ----------

function* fetchGroupSaga({ payload: page }) {
  try {
    const res = yield call(fetch, `${BASE_8082}/messages/getdata/grouplist?page=${page}`, {
      headers: { Authorization: basicAuth },
    });
    const data = yield res.json();

    if (!res.ok || !Array.isArray(data.content)) throw new Error("Invalid group list");

    const groupDetailCalls = data.content.map(group =>
      call(function* () {
        try {
          const detailRes = yield call(fetch, `${BASE_8082}/messages/getdetailsgroup/?groupId=${group.groupId}`, {
            headers: { Authorization: basicAuth }
          });
          const detailData = yield detailRes.json();
          return {
            ...group,
            memberCount: detailData?.memberList?.length || 0,
            readonly: group.readonly ?? false,
            groupMode: detailData?.groupMode ?? "NORMAL"
          };
        } catch {
          return {
            ...group,
            memberCount: 0,
            readonly: group.readonly ?? false,
            groupMode: "NORMAL"
          };
        }
      })
    );

    const groupsWithDetails = yield all(groupDetailCalls);
    yield put(fetchGroupsSuccess(groupsWithDetails, data.page?.totalPages || 1));
  } catch (error) {
    yield put(fetchGroupsFail(error.message));
  }
}

function* fetchUsersSaga() {
  try {
    const res = yield call(fetch, `${BASE_8085}/accounts/listofuser`, {
      headers: { Authorization: basicAuth },
    });
    const data = yield res.json();
    if (!res.ok) throw new Error(data?.message || "Failed to fetch users");

    yield put(fetchUsersSuccess(data));
  } catch (error) {
    yield put(fetchUsersFail(error.message));
  }
}

function* createGroupSaga({ payload }) {
  try {
    const { numbers, groupName, readonly, onSuccess, onError } = payload;

    const groupPayload = {
      numbers,
      groupName,
      type: "add",
      groupId: null,
      readonly
    };

    const res = yield call(fetch, `${BASE_8082}/messages/creategroup`, {
      method: "POST",
      headers: {
        Authorization: basicAuth,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(groupPayload)
    });

    if (!res.ok) throw new Error("Failed to create group");

    yield put(createGroupSuccess());
    yield put(fetchGroups());
    if (onSuccess) yield call(onSuccess);
  } catch (error) {
    yield put(createGroupFail(error.message));
    if (payload?.onError) yield call(payload.onError, error);
  }
}

function* sendGroupMessageSaga({ payload }) {
  const { group, messageText, file, onSuccess, onError } = payload;

  try {
    const groupId = group?.groupId?.startsWith("__textsecure_group__!")
      ? group.groupId
      : `__textsecure_group__!${group?.groupId}`;

    const detailRes = yield call(fetch, `${BASE_8082}/messages/getdetailsgroup/?groupId=${groupId}`, {
      headers: { Authorization: basicAuth }
    });
    const groupData = yield detailRes.json();
    if (!detailRes.ok || !groupData?.memberList?.length) throw new Error("No group members");

    const memberList = groupData.memberList;
    const type = groupData?.groupMode === "READONLY" ? 11 : 1;

    if (messageText?.trim()) {
      const msgRes = yield call(fetch, `${BASE_8085}/messages/sendgroumessage`, {
        method: 'POST',
        headers: {
          Authorization: basicAuth,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ groupId, message: messageText, memberid: memberList, type })
      });
      if (!msgRes.ok) throw new Error("Message failed");
    }

    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("request", JSON.stringify({ groupId, memberid: memberList, type: "FILE" }));

      const fileRes = yield call(fetch, `${BASE_8082}/messages/fileuploadgroup`, {
        method: 'POST',
        headers: { Authorization: basicAuth },
        body: formData
      });
      if (!fileRes.ok) throw new Error("File upload failed");
    }

    yield put(sendGroupMessageSuccess());
    if (onSuccess) yield call(onSuccess);
  } catch (error) {
    yield put(sendGroupMessageFail(error.message));
    if (onError) yield call(onError);
  }
}


function* fetchGroupDetailsSaga({ payload: groupId }) {
  try {
    const res = yield call(fetch, `${BASE_8082}/messages/getdetailsgroup/?groupId=${groupId}`, {
      headers: { Authorization: basicAuth }
    });
    const data = yield res.json();
    if (!res.ok) throw new Error(data.message || "Failed to fetch group details");

    yield put(fetchGroupDetailsSuccess(data || {}));
  } catch (error) {
    yield put(fetchGroupDetailsFail(error.message));
  }
}

function* editGroupNameSaga({ payload }) {
  try {
    const res = yield call(fetch, `${BASE_8082}/messages/creategroup`, {
      method: "POST",
      headers: {
        Authorization: basicAuth,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error("Failed to update group name");
    yield put(editGroupNameSuccess());
    if (payload?.onSuccess) yield call(payload.onSuccess);
  } catch (error) {
    yield put(editGroupNameFail(error.message));
    if (payload?.onError) yield call(payload.onError);
  }
}

function* addMemberSaga({ payload }) {
  try {
    const res = yield call(fetch, `${BASE_8082}/messages/creategroup`, {
      method: "POST",
      headers: {
        Authorization: basicAuth,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error("Failed to add member");

    yield put(addMemberSuccess());
    if (payload?.onSuccess) yield call(payload.onSuccess);
  } catch (error) {
    yield put(addMemberFail(error.message));
    if (payload?.onError) yield call(payload.onError);
  }
}

function* removeMemberSaga({ payload }) {
  try {
    const res = yield call(fetch, `${BASE_8082}/messages/creategroup`, {
      method: "POST",
      headers: {
        Authorization: basicAuth,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error("Failed to remove member");

    yield put(removeMemberSuccess());
    if (payload?.onSuccess) yield call(payload.onSuccess);
  } catch (error) {
    yield put(removeMemberFail(error.message));
    if (payload?.onError) yield call(payload.onError);
  }
}

function* makeAdminSaga({ payload }) {
  try {
    const res = yield call(fetch, `${BASE_8082}/messages/creategroup`, {
      method: "POST",
      headers: {
        Authorization: basicAuth,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    if (!res.ok) throw new Error("Failed to make admin");

    yield put(makeAdminSuccess());
    if (payload?.onSuccess) yield call(payload.onSuccess);
  } catch (error) {
    yield put(makeAdminFail(error.message));
    if (payload?.onError) yield call(payload.onError);
  }
}

// ---------- ROOT SAGA ----------
export default function* groupSaga() {
  yield takeLatest(FETCH_GROUPS, fetchGroupSaga);
  yield takeLatest(FETCH_USERS, fetchUsersSaga);
  yield takeLatest(CREATE_GROUP, createGroupSaga);
  yield takeLatest(SEND_GROUP_MESSAGE, sendGroupMessageSaga);
  yield takeLatest(FETCH_GROUP_DETAILS, fetchGroupDetailsSaga);
  yield takeLatest(EDIT_GROUP_NAME, editGroupNameSaga);
  yield takeLatest(ADD_MEMBER, addMemberSaga);
  yield takeLatest(REMOVE_MEMBER, removeMemberSaga);
  yield takeLatest(MAKE_ADMIN, makeAdminSaga);
}



