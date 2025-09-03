


import {
  FETCH_GROUPS, FETCH_GROUPS_SUCCESS, FETCH_GROUPS_FAIL,
  FETCH_USERS, FETCH_USERS_SUCCESS, FETCH_USERS_FAIL,
  CREATE_GROUP, CREATE_GROUP_SUCCESS, CREATE_GROUP_FAIL,
  SEND_GROUP_MESSAGE, SEND_GROUP_MESSAGE_SUCCESS, SEND_GROUP_MESSAGE_FAIL,
  FETCH_GROUP_DETAILS, FETCH_GROUP_DETAILS_SUCCESS, FETCH_GROUP_DETAILS_FAIL,
  EDIT_GROUP_NAME, EDIT_GROUP_NAME_SUCCESS, EDIT_GROUP_NAME_FAIL,
  ADD_MEMBER, ADD_MEMBER_SUCCESS, ADD_MEMBER_FAIL,
  REMOVE_MEMBER, REMOVE_MEMBER_SUCCESS, REMOVE_MEMBER_FAIL,
  MAKE_ADMIN, MAKE_ADMIN_SUCCESS, MAKE_ADMIN_FAIL,
  UPDATE_GROUP_DETAIL
} from "./actionTypes";

const initialState = {
  groups: [],
  users: [],
  totalPages: 1,

  loading: false, // for group list
  userLoading: false,
  messageSending: false,
  groupCreating: false,

  // For edit operations
  groupDetails: null,
  groupDetailsLoading: false,
  groupUpdating: false,

  error: null,
};

const groupReducer = (state = initialState, action) => {
  switch (action.type) {
    // -------------------
    // Group List
    // -------------------
    case FETCH_GROUPS:
      return { ...state, loading: true };
    case FETCH_GROUPS_SUCCESS:
      return {
        ...state,
        loading: false,
        groups: action.payload.groups,
        totalPages: action.payload.totalPages
      };
    case FETCH_GROUPS_FAIL:
      return { ...state, loading: false, error: action.payload };

    // -------------------
    // Users
    // -------------------
    case FETCH_USERS:
      return { ...state, userLoading: true };
    case FETCH_USERS_SUCCESS:
      return { ...state, userLoading: false, users: action.payload };
    case FETCH_USERS_FAIL:
      return { ...state, userLoading: false, error: action.payload };

    // -------------------
    // Create Group
    // -------------------
    case CREATE_GROUP:
      return { ...state, groupCreating: true };
    case CREATE_GROUP_SUCCESS:
      return { ...state, groupCreating: false };
    case CREATE_GROUP_FAIL:
      return { ...state, groupCreating: false, error: action.payload };

    // -------------------
    // Send Message
    // -------------------
    case SEND_GROUP_MESSAGE:
      return { ...state, messageSending: true };
    case SEND_GROUP_MESSAGE_SUCCESS:
      return { ...state, messageSending: false };
    case SEND_GROUP_MESSAGE_FAIL:
      return { ...state, messageSending: false, error: action.payload };

    // -------------------
    // Fetch Group Details
    // -------------------
    case FETCH_GROUP_DETAILS:
      return { ...state, groupDetailsLoading: true };
    case FETCH_GROUP_DETAILS_SUCCESS:
      return { ...state, groupDetailsLoading: false, groupDetails: action.payload };
    case FETCH_GROUP_DETAILS_FAIL:
      return { ...state, groupDetailsLoading: false, error: action.payload };

    // -------------------
    // Edit Group Name
    // -------------------
    case EDIT_GROUP_NAME:
      return { ...state, groupUpdating: true };
    case EDIT_GROUP_NAME_SUCCESS:
      return { ...state, groupUpdating: false };
    case EDIT_GROUP_NAME_FAIL:
      return { ...state, groupUpdating: false, error: action.payload };

    // -------------------
    // Add Member
    // -------------------
    case ADD_MEMBER:
      return { ...state, groupUpdating: true };
    case ADD_MEMBER_SUCCESS:
      return { ...state, groupUpdating: false };
    case ADD_MEMBER_FAIL:
      return { ...state, groupUpdating: false, error: action.payload };

    // -------------------
    // Remove Member
    // -------------------
    case REMOVE_MEMBER:
      return { ...state, groupUpdating: true };
    case REMOVE_MEMBER_SUCCESS:
      return { ...state, groupUpdating: false };
    case REMOVE_MEMBER_FAIL:
      return { ...state, groupUpdating: false, error: action.payload };

    // -------------------
    // Make Admin
    // -------------------
    case MAKE_ADMIN:
      return { ...state, groupUpdating: true };
    case MAKE_ADMIN_SUCCESS:
      return { ...state, groupUpdating: false };
    case MAKE_ADMIN_FAIL:
      return { ...state, groupUpdating: false, error: action.payload };

    // -------------------
    // Update Group Detail in UI without refetching
    // -------------------
    case UPDATE_GROUP_DETAIL:
      return {
        ...state,
        groupDetails: {
          ...state.groupDetails,
          ...action.payload,
        }
      };

    default:
      return state;
  }
};

export default groupReducer;

