const btn = document.querySelector('button');
const form_inputs = document.querySelector('form');
btn.addEventListener('click', () => {
  Email.send({
    Host: 'smtp.mailtrap.io',
    Username: 'fb854a2bf7797c',
    Password: '228b1b4a8ce77b',
    // ^^ Ticket to email server

    To: 'Sinuhe@smtp.com',
    From: form_inputs.elements['email'].value,
    Subject: 'Favorite Movie Survey Form',
    Body:
      form_inputs.elements['message'].value +
      ' are my favorite movies' +
      '<br>' +
      form_inputs['name'].value,
  }).then((msg) => alert('The email has been sent successfully'));
});
