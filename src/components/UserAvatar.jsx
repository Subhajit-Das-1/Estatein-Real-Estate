import React from "react";

const UserAvatar = ({ username }) => {
  if (!username) return null;
  const firstLetter = username.charAt(0).toUpperCase();
  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      gap: "8px"
    }}>
      <div style={{
        width: 36,
        height: 36,
        borderRadius: "50%",
        background: "#4f46e5",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
        fontSize: 18
      }}>
        {firstLetter}
      </div>
      <span>{username}</span>
    </div>
  );
};

export default UserAvatar; 