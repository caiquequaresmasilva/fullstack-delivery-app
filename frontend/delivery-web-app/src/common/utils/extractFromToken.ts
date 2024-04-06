import { verify } from "jsonwebtoken";
import { TOKEN_SECRET } from "../envs";

export default function extractFromToken(token: string): TokenInfo {
  try {
    return verify(token, TOKEN_SECRET) as TokenInfo;
  } catch (error) {
    return { name: "unknown", id: "" };
  }
}
