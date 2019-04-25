const sgMail=require('@sendgrid/mail')
 

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendwelcomemail=(email,name)=>{
    sgMail.send({
        to:email,
        from:'sabyasachi.rout@gmail.com',
        subject:'Thanks for Joining in',
        text : `Welcome to app,${name}.Let me know how get along the app`
    })
}

const cancelEmail=(email,name)=>{
    sgMail.send({
        to:email,
        from:'sabyasachi.rout@gmail.com',
        subject:'You have successfully removed your account',
        text:'Thanks for using our services , Please let us know the reason for removing the user account'
    })
}
module.exports={
    sendwelcomemail,
    cancelEmail
}