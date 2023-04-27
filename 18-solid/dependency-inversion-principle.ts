// Dependency Inversion Principle

// Abstractions should not depend on details.
// Details should depend on abstractions.

// Abstraction is an interface or abstract class.
// Detail is a concrete class.

// class SendGridEmailService implements IMailService {
//     // concrete class relies on abstractions
//     sendMail(email: IMail): Promise<IEmailTransmissionResult> {
//         return Promise.resolve({ result: 'Success', message: 'Ok' });
//     }
// }

// class CreateUserController {
//     private emailService: IEmailService; // <- abstraction
//     constructor(emailService: IEmailService) { // <- abstraction
//         this.emailService = emailService;
//     }

//     protected executeImpl(): void {
//         // handle request

//         // send mail
//         const mail: IMail = {
//             from: 'test@yop.com',
//             to: 'yes@yopmail.com',
//             body: 'Tes email.'
//         }
//         this.emailService.sendMail(mail);
//     }
// }

// user/http/router/index.js
// import * as express from 'express'
// import { Router } from 'express'
// import { CreateUserController } from '../controllers'
// import { MailGunEmailService } from '../services'

// const mailGunService = new MailGunEmailService();
// const createUserController = new CreateUserController(mailGunService);

// const userRouter = Router();

// userRouter.post('/new', (req, res) => createUserController.exec(req, res))

// export {
//     userRouter
// }