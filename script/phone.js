console.log(`connected`);
const loadPhone = async(searchText) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    console.log(phones);
    displayPhones(phones);
}

const displayPhones = phones => {
    const phoneContainer = document.getElementById('phone-container')
    phoneContainer.textContent = '';

    const showAll = document.getElementById('show-all');

    if(phones.length > 12){
        showAll.classList.remove('hidden');
    }else{
        showAll.classList.add('hidden');
    }
    phones = phones.slice(0,12);

    phones.forEach(phone => {
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card p-4 bg-gray-100 shadow-lg`;
        phoneCard.innerHTML = `
            <figure><img src="${phone.image}" alt="Shoes" /></figure>
            <div class="card-body">
                <h2 class="card-title">${phone.phone_name}</h2>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div class="card-actions justify-end">
                    <button class="btn btn-primary">Buy Now</button>
                </div>
            </div>
        `;
        phoneContainer.appendChild(phoneCard);
    });
    toggleLoading(false);
}

const handleSearch = () => {
    toggleLoading(true);
    const searchText = document.getElementById('search-field').value;
    loadPhone(searchText);

};

const toggleLoading = (isLoading) => {
    const loading = document.getElementById('loading');
    if(isLoading){
        loading.classList.remove('hidden');
    }
}

// loadPhone();