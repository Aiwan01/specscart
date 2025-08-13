

export const rateLimiter = (req, res, next) => {

    const rateLimit = 50;
    const timeWindow = 60000; // 1 minute in milliseconds
    const currentTime = Date.now();
    const userIP = req.ip;
    
    if (!req.app.locals.rateLimits) {
        req.app.locals.rateLimits = {};
    }
    
    if (!req.app.locals.rateLimits[userIP]) {
        req.app.locals.rateLimits[userIP] = { count: 0, lastRequest: currentTime };
    }
    
    const userData = req.app.locals.rateLimits[userIP];

    if (currentTime - userData.lastRequest > timeWindow) {
        userData.count = 0; 
        userData.lastRequest = currentTime;
    }
    
    userData.count++;
    
    if (userData.count > rateLimit) {
        return res.status(429).json({ message: 'Too many requests, please try again later.' });
    }
    
    next();



}