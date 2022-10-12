import { useEffect, useState } from "react";

export default function useIsMember(members, ownId) {
  const [isMember, setIsMember] = useState(false);
  useEffect(() => {
    members
      ? setIsMember(!!members.filter(memberId => memberId === ownId).length)
      : setIsMember(false);
  }, [members, ownId]);

  return isMember;
}
