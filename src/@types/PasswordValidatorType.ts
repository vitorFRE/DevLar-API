export interface PasswordValidator {
  validate: (value: string) => Promise<boolean>
}
