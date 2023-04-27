// Interface Segregation Principle

// Prevent classes from relying on things that they
// don't need.

interface U1Ops {
    operation1(): void;
}

interface U2Ops {
    operation2(): void;
}

interface U3Ops {
    operation3(): void;
}

class User1Operations implements U1Ops {
    operation1(): void {
        return;
    }
}

class User2Operations implements U1Ops, U2Ops {
    operation1(): void {
        return;
    }
    operation2(): void {
        return;
    }
}

class User3Operations implements U1Ops, U2Ops, U3Ops {
    operation1(): void {
        return;
    }
    operation2(): void {
        return;
    }
    operation3(): void {
        return;
    }
}