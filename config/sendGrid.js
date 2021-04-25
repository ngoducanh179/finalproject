const axios = require("axios");

 const sendGrid = async (description = '', to = []) => {
    const obj = {
        subject: "Tom Fit App community",
        heading: "notification",
        description,
        image:
            "https://www.elleman.vn/wp-content/uploads/2018/12/02/bai-tap-gym-elle-man-featured-image.jpg"
    };
    let htmlTemplate = `
        <!DOCTYPE html>
        <html>
        <body>
        <h1>${obj.heading}</h1>
        <a href="default.asp">
        <img src=${obj.image} alt="HTML tutorial" style="width:200px;height:200px;border:0">
        </a>
        <p>${obj.description}</p>
        </body>
        </html>
`;
    await axios({
        method: "post",
        url: "https://api.sendgrid.com/v3/mail/send",
        headers: {
            Authorization:
                "Bearer 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"
        },
        data: {
            personalizations: [
                {
                    to,
                    subject: `${obj.subject}`
                }
            ],
            from: {
                email: "employee.tom.fit@gmail.com",
                name: "Tom Fit"
            },
            content: [{ type: "text/html", value: htmlTemplate }]
        }
    });
}

module.exports = sendGrid;