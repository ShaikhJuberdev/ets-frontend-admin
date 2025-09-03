// import React, { useState, useEffect } from 'react';
// import { useLocation } from 'react-router-dom';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// const GroupMessage = () => {
//   const location = useLocation();
//   const { group } = location.state || {};

//   const [message, setMessage] = useState('');
//   const [attachment, setAttachment] = useState(null);

//   useEffect(() => {
//     if (!group) {
//       toast.error("No group data provided.");
//     }
//   }, [group]);

//   const handleSendMessage = async () => {
//     if (!message.trim()) {
//       toast.warn('Please enter a message.');
//       return;
//     }

//     // Prepare payload
//     const memberEmails = group?.selectedUsers?.map(user =>
//       typeof user === 'string' ? user : user.email
//     ) || [];

//     const payload = {
//         memberid: memberEmails,
//   message: message,
//   groupId: group?.groupId
//     };

//     // Basic Auth credentials
//     const username = "admin@mbank.com";
//     const password = "ESc1soRUuV9luiltCMmU/HCm";
//     const basicAuth = 'Basic ' + btoa(`${username}:${password}`);

//     try {
//       const response = await fetch('https://howzit.observanteye.com/v1/messages/sendgroumessage', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': basicAuth
//         },
//         body: JSON.stringify(payload)
//       });

//       if (response.ok) {
//         toast.success('Message sent successfully!');
//         setMessage('');
//         setAttachment(null);
//       } else {
//         const errorText = await response.text();
//         console.error('API Error:', errorText);
//         toast.error(`Failed to send message: ${errorText}`);
//       }
//     } catch (error) {
//       console.error('Error sending message:', error);
//       toast.error('An error occurred while sending the message.');
//     }
//   };

//   if (!group) {
//     return <div className="text-center-200">Group not found. Please return and try again.</div>;
//   }

//   return (
//     <div className="group-container-200">
//       <h3 className="title-200">Send Message to Group</h3>

//       <div className="field-group-200">
//         <label className="label-200"><strong>Group Name</strong></label>
//         <input
//           type="text"
//           className="input-field-200"
//           value={group.groupName}
//           disabled
//         />
//       </div>

//       <div className="field-group-200">
//         <label className="label-200"><strong>Group Members</strong></label>
//         <textarea
//           className="input-field-200"
//           value={
//             group.selectedUsers && Array.isArray(group.selectedUsers)
//               ? group.selectedUsers.map(user => user.name || user).join(', ')
//               : ''
//           }
//           disabled
//           rows={2}
//         />
//       </div>

//       <div className="field-group-200">
//         <label className="label-200"><strong>Message</strong></label>
//         <textarea
//           className="input-field-200"
//           placeholder="Enter your message..."
//           value={message}
//           onChange={e => setMessage(e.target.value)}
//           rows={4}
//         />
//       </div>

//       <div className="field-group-200">
//         <label className="label-200"><strong>Attachment </strong></label>
//         <input
//           type="file"
//           className="input-field-200"
//           disabled
//           onChange={e => setAttachment(e.target.files[0])}
//         />
//         <small className="text-note-200">Attachments will be supported soon.</small>
//       </div>

//       <button className="button-200" onClick={handleSendMessage}>Send Message</button>

//       <ToastContainer position="top-right" autoClose={3000} />
//     </div>
//   );
// };

// export default GroupMessage;




import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const GroupMessage = () => {
  const location = useLocation();
  const { group } = location.state || {};

  const [message, setMessage] = useState('');
  const [attachment, setAttachment] = useState(null);

  useEffect(() => {
    if (!group) {
      toast.error("No group data provided.");
    }
  }, [group]);

  const handleSendMessage = async () => {
    if (!message.trim()) {
      toast.warn('Please enter a message.');
      return;
    }

    // Prepare member emails
    const memberEmails = (group?.selectedUsers || []).map(user =>
      typeof user === 'string' ? user : (user.email || user.name || user)
    );

    // Prepare payload as expected by API
    const payload = {
      memberid: memberEmails,
      message: message,
      groupId: group?.groupId?.startsWith("__textsecure_group__!")
        ? group.groupId
        : `__textsecure_group__!${group?.groupId}`
    };

    
    const username = "admin@mbank.com";
    const password = "ESc1soRUuV9luiltCMmU/HCm";
    const basicAuth = 'Basic ' + btoa(`${username}:${password}`);

    try {
      const response = await fetch('https://howzit.observanteye.com/v1/messages/sendgroumessage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': basicAuth
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        toast.success('Message sent successfully!');
        setMessage('');
        setAttachment(null);
      } else {
        const errorText = await response.text();
        console.error('API Error:', errorText);
        toast.error(`Failed to send message: ${errorText}`);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('An error occurred while sending the message.');
    }
  };

  if (!group) {
    return <div className="text-center-200">Group not found. Please return and try again.</div>;
  }

  return (
    <div className="group-container-200">
      <h3 className="title-200">Send Message to Group</h3>

      <div className="field-group-200">
        <label className="label-200"><strong>Group Name</strong></label>
        <input
          type="text"
          className="input-field-200"
          value={group.groupName}
          disabled
        />
      </div>

      <div className="field-group-200">
        <label className="label-200"><strong>Group Members</strong></label>
        <textarea
          className="input-field-200"
          value={
            group.selectedUsers && Array.isArray(group.selectedUsers)
              ? group.selectedUsers.map(user => user.name || user).join(', ')
              : ''
          }
          disabled
          rows={2}
        />
      </div>

      <div className="field-group-200">
        <label className="label-200"><strong>Message</strong></label>
        <textarea
          className="input-field-200"
          placeholder="Enter your message..."
          value={message}
          onChange={e => setMessage(e.target.value)}
          rows={4}
        />
      </div>

      {/* <div className="field-group-200">
        <label className="label-200"><strong>Attachment </strong></label>
        <input
          type="file"
          className="input-field-200"
          disabled
          onChange={e => setAttachment(e.target.files[0])}
        />
        <small className="text-note-200">Attachments will be supported soon.</small>
      </div> */}

      <button className="button-200" onClick={handleSendMessage}>Send Message</button>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default GroupMessage;





