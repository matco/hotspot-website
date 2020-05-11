import { ValidatorFn, FormGroup, ValidationErrors } from "@angular/forms";

export const matchingPasswords: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
	const newPassword = control.get('newPassword');
	const confirmPassword = control.get('confirmPassword');
	return newPassword && confirmPassword && newPassword.value !== confirmPassword.value ? {notIdentical: true} : null;
}