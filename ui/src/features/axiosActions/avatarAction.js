import axios from "axios";
import { domain } from "../../configs/constants";

export default async function avatarFetch(avatarId, thunkAPI) {
  try {
    const res = await axios.get(`${domain}/api/image/${avatarId}`, {
      headers: { Authorization: thunkAPI.getState().user.token },
      responseType: "blob",
    });

    return URL.createObjectURL(res.data);
  } catch (err) {
    return "";
  }
}