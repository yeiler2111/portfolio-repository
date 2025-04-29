export const messageEmail = (name: string) => {
  return `<html>
    <head>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f9f9f9;
          color: #333;
        }
        .email-container {
          max-width: 600px;
          margin: 20px auto;
          background: #ffffff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .header {
          background-color: #0056b3;
          color: white;
          padding: 20px;
          text-align: center;
        }
        .content {
          padding: 20px;
          text-align: left;
          line-height: 1.6;
        }
        .content h2 {
          color: #0056b3;
          margin-bottom: 20px;
        }
        .footer {
          background-color: #f9f9f9;
          padding: 10px;
          text-align: center;
          font-size: 12px;
          color: #555;
        }
        .button {
          display: inline-block;
          background-color: #0056b3;
          color: white;
          padding: 10px 15px;
          text-decoration: none;
          border-radius: 5px;
          margin-top: 20px;
        }
        .button:hover {
          background-color: #004494;
        }
      </style>
    </head>
    <body>
      <div class='email-container'>
        <div class='header'>
          <h1>¡Gracias por contactarte conmigo!</h1>
        </div>
        <div class='content'>
          <h2>Hola ${name},</h2>
          <p>
            Quiero agradecerte por visitar mi portafolio y tomarte el tiempo para completar el formulario de contacto.
          </p>
          <p>
            He recibido tu mensaje y lo estaré revisando a la brevedad, Me pondré en contacto contigo 
            para brindarte más información o discutir cómo puedo ayudarte.
          </p>
          <p>
            Mientras tanto, si deseas explorar más sobre mis proyectos o mi trabajo, no dudes en visitar nuevamente mi portafolio.
          </p>
          <a href='https://d210-191-92-152-181.ngrok-free.app/' target='_blank' class='button'>Explorar mi portafolio</a>
          <p>
            Gracias por tu interés. ¡Espero tener la oportunidad de colaborar contigo!
          </p>
        </div>
        <div class='footer'>
          <p>Este correo fue generado automáticamente desde mi portafolio.</p>
          <p>Si necesitas más información, no dudes en responder este mensaje.</p>
          <p>© 2024 TuNombre. Todos los derechos reservados.</p>
        </div>
      </div>
    </body>
  </html>`
}