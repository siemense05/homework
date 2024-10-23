// Получите элементы, которые нужно изменить
const elementToModify = document.getElementById('trip--switch');
const elementToModify2 = document.getElementById('pagination--switch');
const classToRemove2 = 'pagination--left';
const classToRemove = 'trip--left';
const checkWindowSize = () => {
    if (window.innerWidth <= 900) {
        elementToModify.classList.remove(classToRemove);
        elementToModify.classList.remove(classToRemove2);
    } else {
        elementToModify.classList.add(classToRemove2);
        elementToModify.classList.add(classToRemove);
    }
};
window.addEventListener('resize', checkWindowSize);
checkWindowSize();


