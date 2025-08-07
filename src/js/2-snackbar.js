import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const refs = {
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', e => {
  e.preventDefault();
  if (e.target !== e.currentTarget) {
    return;
  }
  const inputValue = e.currentTarget.elements.delay.value;
  const inputRadioValue = e.currentTarget.elements.state.value;

  const newPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (inputRadioValue === 'fulfilled') {
        resolve(inputValue);
      } else {
        reject(inputValue);
      }
    }, inputValue);
  });

  newPromise
    .then(value =>
      iziToast.show({
        title: '✅ Success',
        message: `Fulfilled promise in ${inputValue}ms`,
        position: 'topRight',
        timeout: 3000,
        backgroundColor: 'rgba(0, 180, 50, 0.85)', // стилізований зелений
        titleColor: '#ffffff',
        messageColor: '#ffffff',
        icon: 'icon-check',
        iconColor: '#ffffff',
        progressBarColor: 'rgba(255, 255, 255, 0.7)',
        transitionIn: 'fadeInDown',
        transitionOut: 'fadeOutUp',
      })
    )
    .catch(error =>
      iziToast.show({
        title: '❌ Error',
        message: `Rejected promise in ${inputValue}ms`,
        position: 'topRight',
        timeout: 3000,
        backgroundColor: 'rgba(200, 0, 0, 0.85)', // стилізований червоний
        titleColor: '#ffffff',
        messageColor: '#ffffff',
        icon: 'icon-close',
        iconColor: '#ffffff',
        progressBarColor: 'rgba(255, 255, 255, 0.7)',
        transitionIn: 'fadeInDown',
        transitionOut: 'fadeOutUp',
      })
    );

  refs.form.reset();
});
