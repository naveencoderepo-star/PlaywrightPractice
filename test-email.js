import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'naveencoderepo@gmail.com',
        pass: 'qefm kkqr uyjj bwnd'
    }
});

try {
    const info = await transporter.sendMail({
        from: 'naveencoderepo@gmail.com',
        to: 'naveencoderepo@gmail.com',
        subject: 'Test Email from CMS Script',
        html: '<h2>Test email working!</h2>'
    });
    console.log('✅ Email sent successfully!', info.messageId);
} catch (error) {
    console.error('❌ Email failed:', error.message);
    console.error('\nIf you see "Invalid login", you need a Gmail App Password.');
    console.error('Go to: https://myaccount.google.com/apppasswords');
    console.error('Generate one and replace the password in Cms.spec.js');
}
