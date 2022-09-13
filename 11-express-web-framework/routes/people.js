import { Router } from 'express';

let router = Router();

// Middleware in seperate route
router.use((req, res, next) => {
    console.log('Middleware being used');
    next()
})

router.get('/', (req, res) => {
    res.send('/ being hit');
});

router.get('/example', (req, res) => {
    res.send('/ example being hit');
});

export { router }