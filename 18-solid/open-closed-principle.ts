// Open-Closed Principle

// "A software artifact should be open for extension
// but closed for modification."

// This principle is all about writing your code
// in such a way so that when you
// need to add new functionality, it shouldn't require
// changing the existing code.

// Keep the policy separate from the detail in
// order to enable loose coupling.

// Higher level-components are protected from changes to
// lower level components.

interface IEmailTransmissionResult {
    result: TransmissionResult;
    message: string;
}

interface AWSSESReportPDF {
    message: string;
}

interface IMail {
    from: string;
    to: string;
    body: string;
}

interface IEmailService {
    sendMail(mail: IMail): Promise<IEmailTransmissionResult>
}

class SendGridService implements IEmailService {
    public sendMail(mail: IMail): Promise<IEmailTransmissionResult> {
        // algorithm
        return Promise.resolve({ result: 'Success', message: 'Success' });
    }
}

class MailChimpService implements IEmailService {
    public sendMail(mail: IMail): Promise<IEmailTransmissionResult> {
        // algorithm
        return Promise.resolve({ result: 'Success', message: 'Success' });
    }
}

class AmazonSESService implements IEmailService {
    public sendMail(mail: IMail): Promise<IEmailTransmissionResult> {
        // algorithm
        return Promise.resolve({ result: 'Success', message: 'Success' });
    }

    public generateReport(): Promise<AWSSESReportPDF> {
        // algorithm
        return Promise.resolve({ message: 'Success' });
    }
}

class MailgunService implements IEmailService {
    public sendMail(mail: IMail): Promise<IEmailTransmissionResult> {
        // algorithm
        return Promise.resolve({ result: 'Success', message: 'Success' });
    }

    public getEmailOpens(): number {
        // algorithm
        return 1;
    }

    public getEmailClicks(): number {
        // algorithm
        return 1;
    }
}