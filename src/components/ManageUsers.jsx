import React, { useState } from "react";
import ManageUsersList from "./InfoCardLists/ManageUsersList";
import StretchList from "./InfoCardLists/StretchList";
import Input from "./Controls/Input";

export default function ManageUsers({
  ownerId,
  category,
  users,
  options,
  handleProfile
}) {
  const [input, setInput] = useState("");
  const filteredUsers = users.filter(user =>
    user.username.toLowerCase().includes(input.toLowerCase())
  );

  return (
    <div className="flex flex-col w-full">
      <div className="h-auto mb-2">
        <h3 className="font-bold mb-2">
          {category} - {filteredUsers.length} users
        </h3>
        <Input
          variant="filter"
          size="md"
          value={input}
          placeholder="Search"
          onChange={e => setInput(e.target.value)}
        />
      </div>
      {filteredUsers.length !== 0 ? (
        <div className="flex flex-col items-stretch w-full h-full overflow-auto">
          <StretchList
            ownerId={ownerId}
            list={ManageUsersList}
            users={filteredUsers}
            options={options}
            handleProfile={handleProfile}
          />
        </div>
      ) : (
        <h2 className="text-secondaryText font-semibold text-sm flex-grow flex justify-center items-center">
          No Users Found
        </h2>
      )}
    </div>
  );
}
