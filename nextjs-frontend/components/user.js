import { useUser } from "@auth0/nextjs-auth0";

export default function UserId() {
  const { user } = useUser();
  return user ? <>{user.sub}</> : <></>;
}
