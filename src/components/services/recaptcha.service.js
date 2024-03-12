export const verifyRecaptcha = async (captchaValue) => {
  if (!captchaValue) {
    return false;
  }
  const res = await fetch("/api/captcha/verify", {
    method: "POST",
    body: JSON.stringify({ captchaValue }),
    headers: {
      "content-type": "application/json",
    },
  });
  return res.ok;
};
