import { redirect } from "next/navigation";

export default function RootPage({ children }) {
  return <div>{children}</div>;
}