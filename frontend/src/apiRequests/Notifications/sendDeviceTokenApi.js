import axios from "axios";
import { BACKEND_URL } from "../../config";
export const sendDeviceToken = async (userId, deviceToken) => {
  console.log("UserId-:", userId);
  console.log("deviceToken-:", deviceToken);
  try {
    const { data } = await axios.post(`${BACKEND_URL}/notification/`, {
      userId,
      deviceToken,
    });
    console.log(data);
  } catch (e) {
    console.log(e.message);
  }
};
