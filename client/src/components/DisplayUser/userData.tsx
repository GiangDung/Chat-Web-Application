import ContactMailIcon from "@mui/icons-material/ContactMail";
import axios from "axios";
import Cookies from "js-cookie";
export const mainNavbarItems: any[] = [];

export default async function getFriendsList() {
  const username = {
    username: Cookies.get("username"),
  };
  const friendList = await axios.post(
    "http://localhost:9000/getFriendsList",
    username
  );
  const { friends } = friendList.data;
  friends.map((friend: any) => {
    const item = {
      icon: <ContactMailIcon />,
      label: friend,
      route: "friend",
    };
    mainNavbarItems.push(item);
  });
}
