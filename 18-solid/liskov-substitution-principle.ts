// Liskov Substitution Principle

// To build software systems from interchangeable parts, those
// parts must adhere to a contract that allows
// those parts to be substituted one for another.

type TransmissionResult = 'Success' | 'Failure' | 'Bounced';

interface IMailService {
    sendMail(email: IMail): Promise<IEmailTransmissionResult>
}

class SendGridEmailService implements IMailService {
    sendMail(email: IMail): Promise<IEmailTransmissionResult> {
        // algorithm
        return Promise.resolve({ result: 'Success', message: 'Success' });
    }
}

class MailChimpEmailService implements IMailService {
    sendMail(email: IMail): Promise<IEmailTransmissionResult> {
        // algorithm
        return Promise.resolve({ result: 'Success', message: 'Success' });
    }
}

class MailGunEmailService implements IMailService {
    sendMail(email: IMail): Promise<IEmailTransmissionResult> {
        // algorithm
        return Promise.resolve({ result: 'Success', message: 'Success' });
    }
}

class CreateUserController {
    private emailService: IEmailService;
    constructor(emailService: IEmailService) {
        this.emailService = emailService;
    }

    protected executeImpl(): void {
        // handle request

        // send mail
        const mail: IMail = {
            from: 'test@yopmail.com',
            to: 'yes@yopmail.com',
            body: 'Tes email.'
        }
        this.emailService.sendMail(mail);
    }
}

const mailGunService = new MailGunEmailService();
const mailchimpService = new MailChimpEmailService();
const sendgridService = new SendGridEmailService();

// any of these are valid 
const createUserController = new CreateUserController(mailGunService);
// or
// const createUserController = new CreateUserController(mailchimpService);
// or
// const createUserController = new CreateUserController(sendgridService);