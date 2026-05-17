import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const r2Client = new S3Client({
  region: "auto",
  endpoint: import.meta.env.VITE_R2_ENDPOINT,
  credentials: {
    accessKeyId: import.meta.env.VITE_R2_ACCESS_KEY_ID || "",
    secretAccessKey: import.meta.env.VITE_R2_SECRET_ACCESS_KEY || "",
  },
});

const PUBLIC_URL_BASE = import.meta.env.VITE_R2_PUBLIC_URL || `https://pub-${import.meta.env.VITE_R2_ENDPOINT?.split('//')[1]?.split('.')[0]}.r2.dev`;

export const uploadToR2 = async (file: File) => {
  const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`;
  const uploadFolder = import.meta.env.VITE_UPLOAD_FOLDER || "blogs";
  const key = `${uploadFolder}/${fileName}`;

  try {
    // Convert File to ArrayBuffer for better compatibility with AWS SDK in browser
    const arrayBuffer = await file.arrayBuffer();

    const command = new PutObjectCommand({
      Bucket: import.meta.env.VITE_R2_BUCKET_NAME,
      Key: key,
      Body: new Uint8Array(arrayBuffer),
      ContentType: file.type,
    });

    await r2Client.send(command);
    
    // Construct the public URL using the base or the guessed r2.dev domain
    const publicUrl = `${PUBLIC_URL_BASE}/${key}`; 
    
    return publicUrl;
  } catch (error) {
    console.error("Error uploading to R2:", error);
    throw error;
  }
};
