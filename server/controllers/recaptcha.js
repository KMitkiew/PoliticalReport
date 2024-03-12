
const verify = async(req,res) => {
    //get values needed for captcha verification
    const SITE_SECRET = process.env.SITE_SECRET;
    if(!SITE_SECRET){
        console.error("SITE_SECRET env variable undefined. Please define Google ReCaptcha site secret env variable");
        res.status(500).send("Server failure during verifying recaptcha");
        return;
    }
    const {captchaValue} = req.body;

    //verify via google cloud api
    const googleRes = await fetch(
        `https://www.google.com/recaptcha/api/siteverify?secret=${SITE_SECRET}&response=${captchaValue}`, {
        method: 'POST'
    }).then(res => res.json());
    
    if (!googleRes?.success){
        console.error("Failure during calling Google Cloud API. Please verify the provided secret and captcha value.");
        return res.status(500).send("Server failure during verifying recaptcha");
    }
    res.status(200).send();
}

module.exports = {verify};