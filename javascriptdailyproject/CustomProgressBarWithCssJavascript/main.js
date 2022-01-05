const progress = document.querySelector('.progess-done');
progress.style.width = progress.getAttribute('data-done') + '%';
progress.innerHTML = progress.style.width + " complete";