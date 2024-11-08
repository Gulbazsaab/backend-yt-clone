import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath) return null
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto"
        })
        // console.log("file id uploaded on cloudinary", response.url);
        fs.unlinkSync(localFilePath)
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath) // remove the locallly saved temporary file as the upload function got failed
    }
}

const deleteFromCloudinary = async (publicId) => {
    try {
      if (!publicId) {
        throw new Error("Public ID is required for deletion.");
      }
      
      const result = await cloudinary.uploader.destroy(publicId);
  
      // Check for success response from Cloudinary
      if (result.result === 'ok') {
        console.log(`Image with public ID: ${publicId} deleted successfully.`);
        return true; // Success
      } else {
        console.error(`Failed to delete image with public ID: ${publicId}`);
        return false; // Failure
      }
    } catch (error) {
      console.error("Error during Cloudinary deletion:", error);
      return false; // Failure
    }
  };
  

export {
    uploadOnCloudinary,
    deleteFromCloudinary
}