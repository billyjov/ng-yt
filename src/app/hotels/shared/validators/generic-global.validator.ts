import { FormGroup } from '@angular/forms';

export class GenericGlobalValidator {

  /**
   * Creates an instance of GenericGlobalValidator.
   * controlName1: {
   *     validationRuleName1: 'Validation Message.',
   *     validationRuleName2: 'Validation Message.'
   * },
   * controlName2: {
   *     validationRuleName1: 'Validation Message.',
   *     validationRuleName2: 'Validation Message.'
   * }
   * @param {{ [key: string]: { [key: string]: string } }} validationMessages
   * @memberof GenericGlobalValidator
   */
  constructor(
    private validationMessages: { [key: string]: { [key: string]: string } }
  ) { }


  /**
   *
   * Returns a set of validation messages to display
   *
   * controlName1: 'Validation Message.',
   * controlName2: 'Validation Message.'
   * Processes each control within a FormGroup
   *
   * @param {FormGroup} container
   * @returns {{ [key: string]: string }}
   * @memberof GenericGlobalValidator
   */
  public createErrorMessages(container: FormGroup, isFormSubmitted?: boolean): { [key: string]: string } {
    const errorMessages = {};
    for (const controlName in container.controls) {
      if (container.controls.hasOwnProperty(controlName)) {
        const selectedControl = container.controls[controlName];
        // If it is a FormGroup, process its child controls.
        if (selectedControl instanceof FormGroup) {
          console.log('instance of formGroup');
          const childMessages = this.createErrorMessages(selectedControl);
          Object.assign(errorMessages, childMessages);

        } else {
          // Only validate if there are validation messages for the control
          if (this.validationMessages[controlName]) {

            errorMessages[controlName] = '';

            if ((selectedControl.dirty || selectedControl.touched || isFormSubmitted) && selectedControl.errors) {

              Object.keys(selectedControl.errors).map((errorMessageKey: string) => {
                if (this.validationMessages[controlName][errorMessageKey]) {
                  errorMessages[controlName] += this.validationMessages[controlName][errorMessageKey] + ' ';
                }

              });
            }
          }
        }
      }
    }
    return errorMessages;
  }

  public getErrorsLength(container: FormGroup): number {
    let errorLength = 0;
    for (const controlKey in container.controls) {
      if (container.controls.hasOwnProperty(controlKey)) {
        if (container.controls[controlKey].errors) {
          errorLength += Object.keys(container.controls[controlKey].errors).length;
          console.log(errorLength);
        }
      }
    }
    return errorLength;
  }
}
