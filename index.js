const express = require("express");
const nodemailer = require("nodemailer");

const app = express();

app.use(express.json());

app.post("/", async (req, res) => {
	const { to, subject, email_body } = req.body;

	try {
		const transporter = nodemailer.createTransport({
			host: "smtp.ethereal.email",
			port: 587,
			auth: {
				user: "charlotte.quitzon61@ethereal.email",
				pass: "9GSy12ATZr8uNQ8SDz",
      },
      tls: {
          rejectUnauthorized: false
      },
      secure:false
		});

		let message = {
			from: "charlotte.quitzon61@ethereal.email",
			to: to,
			subject: subject,
			text: email_body,
		};

		await transporter.sendMail(message);

		res.status(200).json({ success: true, message: "Email sent successfully" });
	} catch (error) {
    console.log(error);
		res.status(500).json({ success: false, message: error.message });
	}
});

app.listen(5000, () => {
	console.log("Server started on port 5000");
});
