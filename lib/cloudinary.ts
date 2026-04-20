  import { v2 as cloudinary } from "cloudinary";

  cloudinary.config({
    cloud_name:"drfh0aszz",
      // process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key:"229384242197546",
      // process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret:"ndzCFT8Jh4gB_xdAwXfWJ0UXXtU",
      // process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
  });

  export default cloudinary;