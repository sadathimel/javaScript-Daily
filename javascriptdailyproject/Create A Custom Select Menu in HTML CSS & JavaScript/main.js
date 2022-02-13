const wrapper = document.querySelector('.wrapper'),
selectBtn = wrapper.querySelector('.select-btn');
options = wrapper.querySelector('.options');

// array of some countries
let countries = ['Australia', 'Canada', 'China', 'France', 'Germany', 'India', 'Italy', 'Japan', 'Russia', 'Spain', 'United Kingdom', 'United States','Denmark','Indonesia','Mexico','Netherlands','Norway','Sweden','Switzerland','Turkey','United Arab Emirates','Vietnam'];

function addCountry() {
    countries.forEach(country => {
        let li = ` <li onclick="updateName(this)">${country}</li>`;
        options.insertAdjacentHTML('beforeend', li);
    });
}

addCountry()

function updateName(selectedLi){
    wrapper.classList.remove('active');
    selectBtn.firstElementChild.innerText = selectedLi.innerText;

}

selectBtn.addEventListener('click', function(e) {
    e.preventDefault();
    wrapper.classList.toggle('active');
});