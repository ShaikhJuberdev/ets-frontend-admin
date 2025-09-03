


import {
  // Group fetch & create
  FETCH_GROUPS,
  FETCH_GROUPS_SUCCESS,
  FETCH_GROUPS_FAIL,

  FETCH_USERS,
  FETCH_USERS_SUCCESS,
  FETCH_USERS_FAIL,

  CREATE_GROUP,
  CREATE_GROUP_SUCCESS,
  CREATE_GROUP_FAIL,

  SEND_GROUP_MESSAGE,
  SEND_GROUP_MESSAGE_SUCCESS,
  SEND_GROUP_MESSAGE_FAIL,

  // EditGroup-related
  FETCH_GROUP_DETAILS,
  FETCH_GROUP_DETAILS_SUCCESS,
  FETCH_GROUP_DETAILS_FAIL,

  EDIT_GROUP_NAME,
  EDIT_GROUP_NAME_SUCCESS,
  EDIT_GROUP_NAME_FAIL,

  ADD_MEMBER,
  ADD_MEMBER_SUCCESS,
  ADD_MEMBER_FAIL,

  REMOVE_MEMBER,
  REMOVE_MEMBER_SUCCESS,
  REMOVE_MEMBER_FAIL,

  MAKE_ADMIN,
  MAKE_ADMIN_SUCCESS,
  MAKE_ADMIN_FAIL,
} from "./actionTypes";

// ---------------------------------------------
// Group List (Pagination)
// ---------------------------------------------

export const fetchGroups = (page = 0) => ({
  type: FETCH_GROUPS,
  payload: page,
});

export const fetchGroupsSuccess = (groups, totalPages) => ({
  type: FETCH_GROUPS_SUCCESS,
  payload: { groups, totalPages },
});

export const fetchGroupsFail = (error) => ({
  type: FETCH_GROUPS_FAIL,
  payload: error,
});
export const updateGroupDetail = (groupDetail) => ({
  type: UPDATE_GROUP_DETAIL,
  payload: groupDetail
});//

// ---------------------------------------------
// Users List
// ---------------------------------------------

export const fetchUsers = () => ({
  type: FETCH_USERS,
});

export const fetchUsersSuccess = (users) => ({
  type: FETCH_USERS_SUCCESS,
  payload: users,
});

export const fetchUsersFail = (error) => ({
  type: FETCH_USERS_FAIL,
  payload: error,
});

// ---------------------------------------------
// Create Group
// ---------------------------------------------

export const createGroup = (payload) => ({
  type: CREATE_GROUP,
  payload,
});

export const createGroupSuccess = () => ({
  type: CREATE_GROUP_SUCCESS,
});

export const createGroupFail = (error) => ({
  type: CREATE_GROUP_FAIL,
  payload: error,
});

// ---------------------------------------------
// Send Message to Group
// ---------------------------------------------

export const sendGroupMessage = (payload) => ({
  type: SEND_GROUP_MESSAGE,
  payload,
});

export const sendGroupMessageSuccess = () => ({
  type: SEND_GROUP_MESSAGE_SUCCESS,
});

export const sendGroupMessageFail = (error) => ({
  type: SEND_GROUP_MESSAGE_FAIL,
  payload: error,
});

// ---------------------------------------------
// Fetch Group Details
// ---------------------------------------------

export const fetchGroupDetails = (groupId) => ({
  type: FETCH_GROUP_DETAILS,
  payload: groupId,
});

export const fetchGroupDetailsSuccess = (groupDetails) => ({
  type: FETCH_GROUP_DETAILS_SUCCESS,
  payload: groupDetails,
});

export const fetchGroupDetailsFail = (error) => ({
  type: FETCH_GROUP_DETAILS_FAIL,
  payload: error,
});

// ---------------------------------------------
// Edit Group Name
// ---------------------------------------------

export const editGroupName = (payload) => ({
  type: EDIT_GROUP_NAME,
  payload,
});

export const editGroupNameSuccess = () => ({
  type: EDIT_GROUP_NAME_SUCCESS,
});

export const editGroupNameFail = (error) => ({
  type: EDIT_GROUP_NAME_FAIL,
  payload: error,
});

// ---------------------------------------------
// Add Member(s)
// ---------------------------------------------

export const addMember = (payload) => ({
  type: ADD_MEMBER,
  payload,
});

export const addMemberSuccess = () => ({
  type: ADD_MEMBER_SUCCESS,
});

export const addMemberFail = (error) => ({
  type: ADD_MEMBER_FAIL,
  payload: error,
});

// ---------------------------------------------
// Remove Member
// ---------------------------------------------

export const removeMember = (payload) => ({
  type: REMOVE_MEMBER,
  payload,
});

export const removeMemberSuccess = () => ({
  type: REMOVE_MEMBER_SUCCESS,
});

export const removeMemberFail = (error) => ({
  type: REMOVE_MEMBER_FAIL,
  payload: error,
});

// ---------------------------------------------
// Make Admin
// ---------------------------------------------

export const makeAdmin = (payload) => ({
  type: MAKE_ADMIN,
  payload,
});

export const makeAdminSuccess = () => ({
  type: MAKE_ADMIN_SUCCESS,
});

export const makeAdminFail = (error) => ({
  type: MAKE_ADMIN_FAIL,
  payload: error,
});






