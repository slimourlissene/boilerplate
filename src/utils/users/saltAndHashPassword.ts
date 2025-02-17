import bcrypt from "bcryptjs";

export default async function saltAndHashPassword(
  password: string
): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}
