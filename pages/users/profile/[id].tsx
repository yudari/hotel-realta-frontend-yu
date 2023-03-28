import { useRouter } from "next/router";
import React from "react";

export default function UserProfile() {
  const router = useRouter();

  const { id } = router.query;

  return (
    <div>
      <p>User Profile {id}</p>
    </div>
  );
}
