import nodemailer from 'nodemailer'

export const emailRegister = async(data) =>{
    const {email,name,token} = data

    var transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user:  process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

    const info = await transport.sendMail({
        from: '"UppTask - Administrador de Proyectos" <cuentas@uptask.com>',
        to:email,
        subject: "UpTask - Comprueba tu Cuenta",
        text:"Comprueba tu cuenta en UpTask",
        html:`
            <p>Hola: ${name} Comprueba Tu Cuenta En Uptask<p/>
            <p> 
                Tu cuenta ya esta casi lista, solo debes comprobarla en el siguiente enlace:
                <a href="${process.env.FRONT_URL}/confirmar/${token}">
                    Comprobar Cuenta
                <a/>

                <p>
                    Si tu no creaste esta cuenta, puedes ignorar el mensaje
                <p/>
            </p>
        `
    })

}

export const forgetPasswordEmail = async(data) =>{
    const {email,name,token} = data

    var transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user:  process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

    const info = await transport.sendMail({
        from: '"UppTask - Administrador de Proyectos" <cuentas@uptask.com>',
        to:email,
        subject: "UpTask - Reestablece tu Contraseña",
        text:"Reestablece tu Contraseña",
        html:`
            <p>Hola: ${name} has solicitado reestablecer tu contraseña<p/>
            <p> 
                Sigue el siguiente enlace para generar una Contraseña:
                <a href="${process.env.FRONT_URL}/olvide-mi-password/${token}">
                    Reestablecer Contraseña
                <a/>

                <p>
                    Si tu no solicitaste el email, puedes ignorar el mensaje
                <p/>
            </p>
        `
    })

}