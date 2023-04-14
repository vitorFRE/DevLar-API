export interface PasswordHashGenerator {
  generate: (value: string) => Promise<string>
}
