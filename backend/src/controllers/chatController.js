import { generateStreamToken } from "../lib/stream.js";

export async function getStreamToken(req, res) {
  try {
    const userId = generateStreamToken(req.user.id);

    res.status(200).json({token});
  } catch (error) {
    console.error('Error generating Stream token:', error);
    res.status(500).json({ error: 'Failed to generate token' });
  }
}


export default {
  getStreamToken,
}