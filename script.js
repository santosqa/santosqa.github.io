'use strict';

function toggleMode() {
  const html = document.documentElement;
  html.classList.toggle('light');
}

document.addEventListener('DOMContentLoaded', function () {
  const whatsappShareButton = document.getElementById('whatsapp-share');
  whatsappShareButton.addEventListener('click', function(event) {
    handleWhatsappShareClick(event);
  });

  document.getElementById('share-button').addEventListener('click', function(event) {
    handleShareButtonClick(event);
  });

  document.querySelector('.close-button').addEventListener('click', function(event) {
    closeShareModal();
  });

  window.addEventListener('click', function(event) {
    handleWindowClick(event);
  });

  const shareLinks = document.querySelectorAll('#fallback-share-options a');
  shareLinks.forEach(function(link) {
    link.addEventListener('click', function(event) {
      closeShareModal();
    });
  });
});

function handleWhatsappShareClick(event) {
  event.preventDefault();
  const currentUrl = encodeURIComponent(window.location.href);
  const shareText = encodeURIComponent('Captei uma URL de potencial épico no vasto éter digital e imediatamente associei à sua persona. 🌐 Nela há hyperlinks que, segundo os padrões do universo cibernético, podem ser muito úteis. Recomendo uma inspeção, pois a jornada promete recompensas! 🚀');
  const whatsappUrl = `https://api.whatsapp.com/send?text=${shareText}%20${currentUrl}`;
  window.open(whatsappUrl, '_blank');
}

function handleShareButtonClick(event) {
  event.preventDefault();

  const shareData = {
    title: document.title,
    text: 'Captei uma URL de potencial épico no vasto éter digital e imediatamente associei à sua persona. 🌐 Nela há hyperlinks que, segundo os padrões do universo cibernético, podem ser muito úteis. Recomendo uma inspeção, pois a jornada promete recompensas! 🚀',
    url: window.location.href,
  };

  if (navigator.share) {
    shareViaWebShareApi(shareData);
  } else {
    shareViaFallbackMethods(shareData);
  }
}

function shareViaWebShareApi(shareData) {
  navigator
    .share(shareData)
    .then(handleShareSuccess)
    .catch(handleShareError);
}

function shareViaFallbackMethods(shareData) {
  const shareUrl = encodeURIComponent(shareData.url);
  const shareTitle = encodeURIComponent(shareData.title);
  const shareText = encodeURIComponent(shareData.text);

  document.getElementById('linkedin-share').href = `https://www.linkedin.com/sharing/share-offsite/?text=${shareText}%0A${shareUrl}%0A`;
  document.getElementById('whatsapp-share2').href = `https://api.whatsapp.com/send?text=${shareText}%0A${shareUrl}%0A`;
  document.getElementById('twitter-share').href = `https://twitter.com/intent/tweet?text=${shareText}%0A&url=${shareUrl}%0A`;
  document.getElementById('facebook-share').href = `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`;
  document.getElementById('email-share').href = `mailto:?subject=${shareTitle}&body=${shareText}%0A${shareUrl}%0A`;
  document.getElementById('telegram-share').href = `https://t.me/share/url?url=${shareUrl}%0A&text=${shareText}`;
  
  const modal = document.getElementById('share-modal');
  modal.style.display = 'block';
  modal.setAttribute('aria-hidden', 'false');
  document.getElementById('main-content').setAttribute('aria-hidden', 'true');
}

function handleShareSuccess() {
  console.log('Página compartilhada com sucesso!');
}

function handleShareError(error) {
  console.error('Erro ao compartilhar', error);
}

function closeShareModal() {
  const modal = document.getElementById('share-modal');
  modal.style.display = 'none';
  modal.setAttribute('aria-hidden', 'true');
  document.getElementById('main-content').setAttribute('aria-hidden', 'false');
}

function handleWindowClick(event) {
  if (event.target === document.getElementById('share-modal')) {
    closeShareModal();
  }
}

document.addEventListener('DOMContentLoaded', function () {
  console.log(
    "%c👀 Oi! Além de dar uma olhadinha no console, que tal dar uma passadinha pra ver os projetos no Github ou os post no site? 👀 \nGithub: https://github.com/santosqa \nPost: https://www.santosqa.com/posts/",
    "color: blue; font-size: 16px; font-weight: bold; background-color: yellow; padding: 10px; border-radius: 5px;"
  );
});
