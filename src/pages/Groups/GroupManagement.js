


import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GroupManagement = () => {
    const [groupName, setGroupName] = useState('');
    const [userList, setUserList] = useState([]);
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);

    // Admin credentials
    const username = "admin@mbank.com";
    const password = "ESc1soRUuV9luiltCMmU/HCm";
    const basicAuth = 'Basic ' + btoa(`${username}:${password}`);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const response = await fetch('https://howzit.observanteye.com/v1/accounts/listofuser', {
                    method: 'GET',
                    headers: {
                        'Authorization': basicAuth
                    }
                });

                const data = await response.json();
                if (response.ok) {
                    setUserList(data || []);
                } else {
                    toast.error(data?.message || 'Failed to fetch users.');
                }
            } catch (error) {
                toast.error('Error fetching user list.');
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleUserToggle = (email) => {
        setSelectedUsers(prev =>
            prev.includes(email)
                ? prev.filter(u => u !== email)
                : [...prev, email]
        );
    };

    const generateGroupId = () => {
        return `GRP${Date.now()}${Math.floor(Math.random() * 1000)}`;
    };

    const handleCreateGroup = async () => {
        if (!groupName.trim()) {
            toast.error("Group name is required.");
            return;
        }

        if (selectedUsers.length === 0) {
            toast.error("Please select at least one user.");
            return;
        }


        const uniqueUsers = [username, ...selectedUsers.filter(user => user !== username)];

        const payload = {
            numbers: uniqueUsers,
            groupName: groupName,
            type: "add",
            groupId: null,
            username: username
        };

        try {
            const response = await fetch('https://howzit.observanteye.com/v1/messages/createGroup', {
                method: 'POST',
                headers: {
                    'Authorization': basicAuth,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            const data = await response.json();

            if (response.ok) {
                toast.success("Group created successfully!");
                const lastItem = data[data.length - 1];


                const rawGroupId = lastItem.groupid || generateGroupId();
                const groupIdFromAPI = rawGroupId.replace("__textsecure_group__!", "");
                const newGroup = {
                    groupName,
                    groupId: groupIdFromAPI,
                    groupCount: uniqueUsers.length,
                    selectedUsers: uniqueUsers
                };

                const existingGroups = JSON.parse(localStorage.getItem("createdGroups") || "[]");
                localStorage.setItem("createdGroups", JSON.stringify([...existingGroups, newGroup]));

                setGroupName('');
                setSelectedUsers([]);
                setSearchTerm('');
            } else {
                toast.error(data?.message || 'Failed to create group.');
            }
        } catch (error) {
            toast.error('Error creating group.');
        }
    };

    const filteredUsers = userList.filter(email =>
        email.toLowerCase().includes(searchTerm.toLowerCase())
    );





    return (
        
        <div className="group-management-wrapper1">
            <div className="group-management-container1">
                <h2 className="title1">Create Group</h2>

                <div className="form-group1">
                    <label className="label1">Group Name</label>
                    <input
                        type="text"
                        className="input-box1"
                        value={groupName}
                        onChange={(e) => setGroupName(e.target.value)}
                        placeholder="Enter group title"
                    />
                </div>

                <div className="form-group1">
                    <div className="user-list-header1">
                        <label className="label1">List of Users</label>
                        <input
                            type="text"
                            className="search-box1"
                            placeholder="Search email"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="user-list1">
                        {loading ? (
                            <p>Loading users...</p>
                        ) : filteredUsers.length > 0 ? (
                            filteredUsers.map((email, index) => (
                                <div key={index} className="user-item1">
                                    <input
                                        type="checkbox"
                                        id={`user-${index}`}
                                        checked={selectedUsers.includes(email)}
                                        onChange={() => handleUserToggle(email)}
                                    />
                                    <label htmlFor={`user-${index}`} className="user-label1">
                                        {email}
                                    </label>
                                </div>
                            ))
                        ) : (
                            <p>No users found.</p>
                        )}
                    </div>
                </div>

                <button className="create-btn1" onClick={handleCreateGroup}>
                    Create
                </button>

                <ToastContainer />
            </div>
        </div>
        
    );
};

export default GroupManagement;

