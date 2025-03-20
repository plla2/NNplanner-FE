export const env = Object.freeze({
  BASE_API_URL: `${process.env.NEXT_PUBLIC_BASE_API_URL}`,
  QR_API_URL: `${process.env.NEXT_PUBLIC_QR_API_URL}`,
  QR_APP_KEY: `${process.env.NEXT_PUBLIC_QR_APPKEY}`,
  GA_ID: process.env.NEXT_PUBLIC_GA_ID,
  GOOGLE_CLIENT_ID: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
  GOOGLE_REDIRECT_URL: process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URL,
});
