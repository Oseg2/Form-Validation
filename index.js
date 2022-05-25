const listenForSubmit = () => {
  [...document.getElementsByTagName("form")].forEach((form, index) => {
    form.addEventListener("submit", (event) => {
      // event.preventDefault();
      handleSubmit(event, index);
    });
  });
};

/**
 * handleError helper function, when its called it gets all the exisisting errors and puts a new error in that list
 * @param {string} error
 * @param {number} index
 */
//Helper function that determines what to do when we find error in our form
const handleError = (error, index, errorUl) => {
  // Errors div
  //Creating a new variable called errors, grabbing the element with the error classname  that matches the index of the array of errors
  const errors = document.getElementsByClassName("errors")[index];

  // Creating a new error
  const errorElement = document.createElement("li");
  errorElement.innerHTML = `${error}`;

  // Add newError to the errors div
  errorUl.appendChild(errorElement);
  errors.appendChild(errorUl);
};
/**
 * handleSubmit when button is clicked then runs this code, looks at each textbox and tests to see if its valid
 * @param {element} event
 * @param {number} index
 * @returns
 */
//Grabbing the form element by doing document.getElementByTagName and the index indicates which form
const handleSubmit = (event, index) => {
  const formElement = document.getElementsByTagName("form")[index]; //connects form1 html to javaScript, creating a variable called formElelement
  const inputElements = formElement.getElementsByTagName("input"); //Gets all of the inputs in form 1, were taking formElement and taking out all inputs in form 1 and saving it to inputElements variable
  const errors = [];
  const errorUl = document.createElement("ul");

  // Clear previous errors
  document.getElementsByClassName("errors")[index].innerHTML = "";

  for (let i = 0; i < inputElements.length; i++) {
    if (inputElements[i].className.includes("required")) {
      //initializing i to be equal to 0, then saying we want i to count to all input elements. We are itereating thru the input elments
      if (inputElements[i].className.includes("required")) {
        //if the class name of current input element that where on is equal to required like in #6
        if (inputElements[i].value.trim() === "") {
          //The part in #6 talking about if input elements have a white space or is empty We use trim to delete spaces automatically

          handleError(
            "Required fields must have a value that is not empty or whitespace.",
            index,
            errorUl
          );
          errors.push("error");
        }
      }

      // Numeric validation
      if (inputElements[i].className.includes("numeric")) {
        //#8
        if (
          !inputElements[i].value.match(/^[+]?\d+([^,/;'-=_+{}:"<>?.]\d+)?$/)
        ) {
          //If the input text is not a number or a non-numeric character. isNaN is a function
          handleError(
            "Numeric fields must be a series of numbers.",
            index,
            errorUl
          );
          errors.push("error");
        }
      }

      // Size validation
      if (inputElements[i].className.includes("required_size")) {
        if (inputElements[i].value.length != inputElements[i].minLength) {
          handleError(
            "Required_size field lengths must exactly match the minlength attribute of that field",
            index,
            errorUl
          );
          errors.push("error");
        }
      }

      // Username field validation
      if (inputElements[i].className.includes("username")) {
        // This regex will match only letters and numbers
        //regex regular expression, the value can matach any combination of numbers and letters
        if (!inputElements[i].value.match(/^[0-9a-z]+$/)) {
          handleError(
            "Username fields must contain only alphanumeric characters.",
            index,
            errorUl
          );
          errors.push("error");
        }

        // Check if the username is greater than 8 characters
        //#11
        if (inputElements[i].value.length < 8) {
          handleError(
            "Username fields must contain at least 8 characters.",
            index,
            errorUl
          );
          errors.push("error");
        }
      }

      // Date validation
      if (inputElements[i].className.includes("date")) {
        // Will make sure that the date is properly formatted

        if (
          !inputElements[i].value.match(
            /^(?:\d{2}[.\/-]\d{2}[.\/-]|\d{2}[.\/-]\d{3})\d{4}$/
          )
        ) {
          handleError(
            "Date fields must match the format of XX/XX/XXXX.",
            index,
            errorUl
          );
          errors.push("error");
        }
      }

      // Phone validation
      if (inputElements[i].className.includes("phone")) {
        // Will ensure that the phone number is properly formatted
        if (
          !inputElements[i].value.match(
            /^\(?([0-9]{3})\)?([-]?)([0-9]{3})\2([0-9]{4})$/
          )
        ) {
          handleError(
            "Phone fields must match the format of XXX-XXX-XXXX.",
            index,
            errorUl
          );
          errors.push("error");
        }
      }

      // Password validation
      if (inputElements[i].className.includes("password")) {
        // This regex expression will match uppercase letters, lowercase letters, numbers and special characters.
        if (
          !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,}$/.test(
            inputElements[i].value
          )
        ) {
          handleError(
            "Password fields must contain one or more of each of the following types: uppercase letters, lowercase letters, numbers, special characters",
            index,
            errorUl
          );
          errors.push("error");
        }
      }

      // Alphabetic validation
      if (inputElements[i].className.includes("alphabetic")) {
        // This regex will match all uppercase and lowercase letters
        if (!inputElements[i].value.match(/^[A-Za-z]+$/)) {
          handleError(
            "Alphabetic fields must be a series of alphabetic characters.",
            index,
            errorUl
          );
          errors.push("error");
        }
      }
    }
  }

  // Check if form has any errors
  if (errors.length == 0) {
    return true;
  } else {
    event.preventDefault();
  }
};

listenForSubmit();
