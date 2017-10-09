// DOM ready...
$(function() {
  $("#register").validate({
    // Specify validation rules
    rules: {
      email: {
        required: true,
        email: true
      },
      password: {
        required: true
      },
      password_confirmation: {
        equalTo: "#password"
      }
    },
    // Specify validation error messages
    messages: {
      password: {
        required: "Please provide a password"
      },
      password_confirmation: {
        required: "Passwords must match",
      },
      email: "Please enter a valid email address"
    },
    // Make sure the form is submitted to the destination defined
    // in the "action" attribute of the form when valid
    submitHandler: function(form) {
      form.submit();
    }
  });
});

$("#login").validate({
  // Specify validation rules
  rules: {
    email: {
      required: true,
      email: true
    },
    password: {
      required: true
    }
  },
  // Specify validation error messages
  messages: {
    password: {
      required: "Please enter your password"
    },
    email: "Please enter your email address"
  },
  // Make sure the form is submitted to the destination defined
  // in the "action" attribute of the form when valid
  submitHandler: function(form) {
    form.submit();
  }
});
