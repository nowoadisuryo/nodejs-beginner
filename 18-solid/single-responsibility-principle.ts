// Single Responsibility Principle

// "A class or function should only have one
// reason to change."

// Split code up based on the social structure
// of the users using it.

// Example of SRP violation
// class Employee {
//     calculatePay() {
//         // implement algorithm for hr, accounting and it
//     }
//     reportHours() {
//         // implement algorithm for hr, accounting and it
//     }
//     save() {
//         // implement algorithm for hr, accounting and it
//     }
// }

// Example of SRP implementation
abstract class Employee {
    // This needs to be implemented
    abstract calculatePay(): number;
    // This needs to be implemented
    abstract reportHours(): number;
    // let's assume THIS is going to be the 
    // same algorithm for each employee- it can
    // be shared here.
    protected save(): Promise<any> {
        // common save algorithm
        return Promise.resolve('Saved');
    }
}

class HR extends Employee {
    calculatePay() {
        // Implement own algorithm
        return 1;
    }
    reportHours() {
        // Implement own algorithm
        return 1;
    }
}

class Accounting extends Employee {
    calculatePay() {
        // Implement own algorithm
        return 1;
    }
    reportHours() {
        // Implement own algorithm
        return 1;
    }
}

class IT extends Employee {
    calculatePay() {
        // Implement own algorithm
        return 1;
    }
    reportHours() {
        // Implement own algorithm
        return 1;
    }
}