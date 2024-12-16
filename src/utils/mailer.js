import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
	service: "gmail",
	port: 587,
	auth: {
		user: "lcdo.richardflores@gmail.com",
		pass: "gvcq bivw ibtw wlvu",
	},
});

export async function mailer(to, subject, html) {
	await transport.sendMail({
		from: "Richard-Backend2  <lcdo.richardflores@gmail.com>",
		to: to,
		subject: subject,
		html: html,
	});
}
