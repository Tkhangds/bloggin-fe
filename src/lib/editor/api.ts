import cloudinaryAction from "@/apis/cloudinary.action";

export class API {
  public static uploadImage = async (_file: File) => {
    const res = await cloudinaryAction.uploadImage(_file);
    return res.secure_url;
  };
}

export default API;
