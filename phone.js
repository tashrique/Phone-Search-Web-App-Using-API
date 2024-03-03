const loadPhone = async (search = 'iphone', isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${search}`)
    const data = await res.json()
    const phones = data.data
    displayPhones(phones, isShowAll)
}



const displayPhones = (phones, isShowAll) => {

    const showAllContainer = document.getElementById('show-all-container')
    if (phones.length > 12 && !isShowAll) {
        showAllContainer.classList.remove('hidden')
    } else {
        showAllContainer.classList.add('hidden')
    }

    if (!isShowAll) {
        phones = phones.slice(0, 6)
    }

    const phoneContainer = document.getElementById('phone-container')
    //Clear container before search
    phoneContainer.innerHTML = ""

    phones.forEach(phone => {
        const phoneCard = document.createElement('div');
        phoneCard.classList = "card w-80 bg-white shadow-none pt-8 my-4";
        phoneCard.innerHTML = `
        <figure><img src="${phone.image}"
                            alt="Shoes" /></figure>
        <div class="card-body">
            <h2 class="card-title justify-center">
                ${phone.phone_name}
            </h2>
            <div class="card-actions justify-center">
                <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show Details</button>
            </div>
        </div>
        `
        phoneContainer.appendChild(phoneCard)

    });
    toggleLoadingSpinner(false)

}



const handleSearch = (isShowAll) => {
    toggleLoadingSpinner(true);
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
    loadPhone(searchText, isShowAll)
}


const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById('loading-spinner')
    if (isLoading) {
        loadingSpinner.classList.remove('hidden')
    } else {
        loadingSpinner.classList.add('hidden')
    }
}


const handleShowAll = () => {
    handleSearch(true);
}



const handleShowDetails = async (id) => {

    // Load single phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    const data = await res.json()
    console.log(data.data)

    showPhoneDetails(data.data)

}


const showPhoneDetails = (phone) => {

    const phoneName = document.getElementById('phone-name')
    phoneName.innerText = phone.name


    const showDetailsContainer = document.getElementById('show-details-container')
    showDetailsContainer.innerHTML = `
    <img src="${phone.image}"/>
    <p><span>Storage:<span>${phone.mainFeatures.storage}<p>
    `



    show_details_modal.showModal()
}


loadPhone()