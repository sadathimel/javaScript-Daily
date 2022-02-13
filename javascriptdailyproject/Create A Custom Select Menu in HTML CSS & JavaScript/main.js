const wrapper = document.querySelector('.wrapper'),
selectBtn = wrapper.querySelector('.select-btn'),
searchInp = wrapper.querySelector('input');
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

searchInp.addEventListener('keyup', () => {
    let arr = [];
    let search = searchInp.value.toLowerCase();
    arr = countries.filter(data => {
        return data.toLowerCase().startsWith(search);
    }).map(data => `<li>${data}</li>`).join('');
    console.log(arr);
});

selectBtn.addEventListener('click', function(e) {
    e.preventDefault();
    wrapper.classList.toggle('active');
});