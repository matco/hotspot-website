import {ValidatorFn, ValidationErrors, AbstractControl} from '@angular/forms';

export const matchingPasswords: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
	const newPassword = control.get('newPassword');
	const confirmPassword = control.get('confirmPassword');
	return newPassword && confirmPassword && newPassword.value !== confirmPassword.value ? {notIdentical: true} : null;
};
