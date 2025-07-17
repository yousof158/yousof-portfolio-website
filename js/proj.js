function toggleLanguage() {
  const elements = document.querySelectorAll('[data-en][data-ar]');
  elements.forEach(el => {
    const current = el.textContent.trim();
    const newText = current === el.getAttribute('data-en')
      ? el.getAttribute('data-ar')
      : el.getAttribute('data-en');
    el.textContent = newText;
  });
}

function validateForm() {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  if (!name || !email || !message) {
    alert('Please fill out all fields!');
    return false;
  }
  alert('Thanks for your message!');
  return false; // منع الإرسال الفعلي، علشان نضيف لاحقًا backend أو service
}
