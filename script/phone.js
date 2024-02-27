const loadPhone = async(searchText='phone', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);
    const data = await res.json();
    const phones = data.data;
    displayPhones(phones, isShowAll);
}

const displayPhones = (phones,isShowAll) => {
    const phoneContainer = document.getElementById('phone-container')
    phoneContainer.textContent = '';

    const showAll = document.getElementById('show-all');

    if(phones.length > 12 && !isShowAll){
        showAll.classList.remove('hidden');
    }else{
        showAll.classList.add('hidden');
    }
    
    if(!isShowAll){
        phones = phones.slice(0,12);
    }

    phones.forEach(phone => {
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card p-4 bg-gray-100 shadow-lg`;
        phoneCard.innerHTML = `
            <figure><img src="${phone.image}" alt="Shoes" /></figure>
            <div class="flex flex-col items-center justify-center gap-4 mt-4">
                <h2 class="card-title">${phone.phone_name}</h2>
                <div class="card-actions justify-center">
                    <button class="btn btn-neutral" onclick="handleShowDetail('${phone.slug}')">Show Details</button>
                </div>
            </div>
        `;
        phoneContainer.appendChild(phoneCard);
    });
    toggleLoading(false);
}

const handleSearch = (isShowAll) => {
    toggleLoading(true);
    const searchText = document.getElementById('search-field').value;
    loadPhone(searchText, isShowAll);

};

const handleShowAll = () => {
    handleSearch(true);
}

const handleShowDetail = async (id) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;
    showDetail(phone);
}

const showDetail = (phone) => {
    console.log(phone);
    const showDetailContainer = document.getElementById('show-detail-container');
    showDetailContainer.innerHTML = `
        <div class="flex flex-col items-center justify-center gap-2">
            <img src="${phone.image}" alt=""/>
            <h3 id="phone-name" class="font-bold text-lg">${phone.name}</h3>
        </div>
        <p><span class="font-bold">Storage: </span> ${phone?.mainFeatures?.storage}</p>
        <p><span class="font-bold">Display Size: </span> ${phone?.mainFeatures?.displaySize}</p>
        <p><span class="font-bold">Chipset: </span> ${phone?.mainFeatures?.chipSet}</p>
        <p><span class="font-bold">Memory: </span> ${phone?.mainFeatures?.memory}</p>
        <p><span class="font-bold">ID: </span> ${phone?.slug}</p>
        <p><span class="font-bold">Release Date: </span> ${phone?.releaseDate}</p>
        <p><span class="font-bold">Brand: </span> ${phone?.brand}</p>
        <!-- <p><span>GPS: </span> ${phone?.others?.GPS ? phone.others.GPS : 'N/A'}</p> -->
        <p><span class="font-bold">GPS: </span> ${phone?.others?.GPS || 'N/A'}</p>
    `
    show_details.showModal();
}

const toggleLoading = (isLoading) => {
    const loading = document.getElementById('loading');
    const phoneContainer = document.getElementById('phone-container')
    if(isLoading){
        phoneContainer.textContent = '';
        loading.classList.remove('hidden');
    }else{
        loading.classList.add('hidden');
    }
}

loadPhone();