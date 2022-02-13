import { useUser } from "@auth0/nextjs-auth0";

export default function User() {
  const { user } = useUser();
  return user ? <></> : <></>;
}
