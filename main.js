// --- Typed Tags Animation ---
const tags = [
  "tech enthusiast",
  "problem solver",
  "pythonista",
  "web developer",
  "lifelong learner",
  "game creator",
  "excel wizard",
  "IoT tinkerer"
];
const typedElem = document.getElementById('typed');
let tagIndex = 0, charIndex = 0, typing = true, typeDelay = 90, eraseDelay = 45, tagPause = 900;

function typeTag() {
  if (!typedElem) return;
  if (typing) {
    if (charIndex < tags[tagIndex].length) {
      typedElem.textContent += tags[tagIndex][charIndex++];
      setTimeout(typeTag, typeDelay);
    } else {
      typing = false;
      setTimeout(typeTag, tagPause);
    }
  } else {
    if (charIndex > 0) {
      typedElem.textContent = tags[tagIndex].slice(0, --charIndex);
      setTimeout(typeTag, eraseDelay);
    } else {
      typing = true;
      tagIndex = (tagIndex + 1) % tags.length;
      setTimeout(typeTag, 420);
    }
  }
}
typeTag();

// --- Buttons Transparent Animation ---
function makeBtnTransparent(btn) {
  btn.classList.add('transparent');
  setTimeout(() => btn.classList.remove('transparent'), 600);
}
document.getElementById('contact-btn').addEventListener('click', function() {
  makeBtnTransparent(this);
  document.getElementById('contact').scrollIntoView({behavior: 'smooth'});
});
document.getElementById('cv-btn').addEventListener('click', function() {
  makeBtnTransparent(this);
});

// --- Navigation Active Link ---
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', function(e) {
    document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('nav-active'));
    this.classList.add('nav-active');
  });
});

// --- Contact Form Validation & EmailJS Integration ---
(function() {
  emailjs.init("AX9ZtVpZPmydtAaFI");
})();
const form = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const submitText = document.getElementById('submit-text');
const spinner = document.getElementById('submit-spinner');
const feedback = document.getElementById('form-feedback');

function validateName(name) {
  return name.trim().length >= 2;
}
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}
function validateMessage(msg) {
  return msg.trim().length >= 30;
}
form.addEventListener('submit', function(e) {
  e.preventDefault();
  feedback.textContent = '';
  feedback.className = 'form-feedback';
  let valid = true;

  // Validate fields
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  // Name
  if (!validateName(name)) {
    document.getElementById('name-error').textContent = "Enter at least 2 characters";
    valid = false;
  } else document.getElementById('name-error').textContent = "";

  // Email
  if (!validateEmail(email)) {
    document.getElementById('email-error').textContent = "Invalid email format";
    valid = false;
  } else document.getElementById('email-error').textContent = "";

  // Message
  if (!validateMessage(message)) {
    document.getElementById('message-error').textContent = "Message must be at least 30 characters";
    valid = false;
  } else document.getElementById('message-error').textContent = "";

  if (!valid) return;

  // Show spinner
  submitText.style.display = 'none';
  spinner.style.display = 'inline-block';
  submitBtn.disabled = true;

  // EmailJS Send
  emailjs.send("ryoscoid", "template_jai0z9m", {
    from_name: name,
    from_email: email,
    message: message
  })
    .then(() => {
      spinner.style.display = 'none';
      submitText.style.display = 'inline';
      feedback.innerHTML = '<i class="fa-solid fa-check-circle"></i> Message sent successfully!';
      feedback.classList.add('success');
      form.reset();
      submitBtn.disabled = false;
    })
    .catch(err => {
      spinner.style.display = 'none';
      submitText.style.display = 'inline';
      feedback.innerHTML = `<i class="fa-solid fa-circle-exclamation"></i> ${err?.text || 'Failed to send message.'}`;
      feedback.classList.add('error');
      submitBtn.disabled = false;
    });
});

// --- Blur on nav click for mobile experience
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    if(window.innerWidth < 900) link.blur();
  });
});

// --- Accessibility: clear errors on input
['name','email','message'].forEach(id => {
  document.getElementById(id).addEventListener('input', function() {
    document.getElementById(id+'-error').textContent = '';
    feedback.textContent = '';
    feedback.className = 'form-feedback';
  });
});