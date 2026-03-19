import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

export const verifyToken = (req, res, next) => {
  // 1. Get the token from the Header (Authorization: Bearer <token>)
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(403).json({ message: 'No token provided, access denied' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // 2. Verify the token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // 3. Add the user data to the request object so routes can use it
    req.user = decoded; 
    
    // 4. Move to the next function (the actual route)
    next(); 
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};