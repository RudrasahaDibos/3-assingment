const searchResult = document.getElementById('SearchResult');
const DetailsproductSection = document.getElementById('ProductDetails');

const search = () => {
    let searchText = document.getElementById('searchPhoneInput').value;
    searchText = searchText.toLowerCase();
    
    if (searchText === '') {
        searchResult.textContent = '';
        DetailsproductSection.textContent = '';
        document.getElementById('searchPhoneInput').value = '';
        document.getElementById('EmptyField').style.display = 'block';
        document.getElementById('NOSEARCH').style.display = 'none';
        document.getElementById('ResultsNumber').style.display = 'none';
        document.getElementById('SeemoreButton').style.display = 'none';
    }




    else {
        fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
            .then(res => res.json())
            .then(data => searchPhone(data.data))
    }
}

const searchPhone = (phones) => {

    if (phones.length === 0) {
        DetailsproductSection.textContent = '';
        searchResult.textContent = '';
        document.getElementById('searchPhoneInput').value = '';
        document.getElementById('EmptyField').style.display = 'none'
        document.getElementById('NOSEARCH').style.display = 'block'
        document.getElementById('ResultsNumber').style.display = 'none';
        document.getElementById('SeemoreButton').style.display = 'none';
    }
    else if (phones.length > 0 && phones.length >= 20) {
        console.log(phones.length);
        DetailsproductSection.textContent = '';
        searchResult.textContent = '';
        document.getElementById('SeemoreButton').style.display = 'none';
        document.getElementById('searchPhoneInput').value = '';
        document.getElementById('NOSEARCH').style.display = 'none';
        document.getElementById('EmptyField').style.display = 'none';
        document.getElementById('ResultsNumber').style.display = 'block';
        document.getElementById('ResultsNumber').innerText = `20 Results Shown out of ${phones.length} Results!!!`;

        if (phones.length > 30) {
            phones.slice(0, 30).map(phone => {
                const div = document.createElement('div');
                div.innerHTML = `
                    <div class="card shadow rounded p-3" style="width: 18rem;">
                        <img src="${phone.image}" class="card-img-top mx-auto img-fluid w-75">
                        <div class="card-body  d-flex flex-column">
                            <h5 class="card-title text-center">${phone.phone_name}</h5>
                            <h5 class="brand_name text-center">${phone.brand}</h5>
                            <a href="#" onclick="getPhone('${phone.slug}')" class="btn btn-primary mx-auto">Show Details</a>
                        </div>
                    </div>
                `
                searchResult.appendChild(div)
                
            })
            const seeMore = document.getElementById('SeemoreButton');
            seeMore.style.display = 'block';
            seeMore.addEventListener('click', () => {
                DetailsproductSection.textContent = '';
                searchResult.textContent = '';
                document.getElementById('searchPhoneInput').value = '';
                document.getElementById('NOSEARCH').style.display = 'none';
                document.getElementById('EmptyField').style.display = 'none';
                document.getElementById('ResultsNumber').style.display = 'block';
                document.getElementById('ResultsNumber').innerText = `${phones.length} Results Shown out of ${phones.length} Results!!!`;

                phones.map(phone => {
                    const div = document.createElement('div');
                    div.innerHTML = `
                        <div class="card shadow rounded p-3" style="width: 18rem;">
                            <img src="${phone.image}" class="card-img-top mx-auto img-fluid w-75">
                            <div class="card-body  d-flex flex-column">
                                <h5 class="card-title text-center">${phone.phone_name}</h5>
                                <h5 class="brand_name text-center">${phone.brand}</h5>
                                <a href="#" onclick="getPhone('${phone.slug}')" class="btn btn-primary mx-auto">Show Details</a>
                            </div>
                        </div>
                    `
                    searchResult.appendChild(div)
                   
                })
                seeMore.style.display = 'none';
            })
        }
    }




    else {
        DetailsproductSection.textContent = '';
        searchResult.textContent = '';
        document.getElementById('SeemoreButton').style.display = 'none';
        document.getElementById('searchPhoneInput').value = '';
        document.getElementById('NOSEARCH').style.display = 'none';
        document.getElementById('EmptyField').style.display = 'none';
        document.getElementById('ResultsNumber').style.display = 'block';
        document.getElementById('ResultsNumber').innerText = `${phones.length} Results Shown out of ${phones.length} Results!!!`;
        phones.map(phone => {

            
            const div = document.createElement('div');
            div.innerHTML = `
                <div class="card shadow rounded p-3" style="width: 18rem;">
                    <img src="${phone.image}" class="card-img-top mx-auto img-fluid w-75">
                    <div class="card-body  d-flex flex-column">
                        <h5 class="card-title text-center">${phone.phone_name}</h5>
                        <h5 class="brand_name text-center">${phone.brand}</h5>
                        <a href="#" onclick="getPhone('${phone.slug}')" class="btn btn-primary mx-auto">Show Details</a>
                    </div>
                </div>
            `
            searchResult.appendChild(div)
            
        })
    }
}



const getPhone = (id) => {
    fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
        .then(res => res.json())
        .then(data => phoneDetails(data.data))
}



const phoneDetails = (details) => {
    document.getElementById('ResultsNumber').style.display = 'none';
    DetailsproductSection.textContent = '';
    const Detailsdiv = document.createElement('div');
    Detailsdiv.innerHTML = `
    



        <div class="product-detail rounded shadow">
            <div class="product-detail-left">
                <img src="${details.image}" class="img-fluid">
                <h4 class="text-primary">${details.name}</h4>
                <p class="text-danger text-center">${details.releaseDate ? details.releaseDate : "No Release Date Found!!!"}</p>
            </div>
            <div class="product-detail-middle">






                <h5 ><b><u>Main Features:</u></b> </h5>
                <p><b>Storage: </b><span>${details.mainFeatures.storage}</span></p>
                <p><b>Display Size: </b><span>${details.mainFeatures.displaySize}</span></p>
                <p><b>Chipset: </b><span>${details.mainFeatures.chipSet}</span></p>
                <p><b>Memory: </b><span>${details.mainFeatures.memory}</span></p>
                <p><b>Sensors: </b><span>${details.mainFeatures.sensors}</span></p>
            </div>






            <div class="product-detail-right">
                <h5><b><u>Other Features:</u></b> </h5>
                <p><b>WLAN: </b><span>${details.others ? details.others.WLAN : 'No Information Found!'}</span></p>
                <p><b>Bluetooth: </b><span>${details.others ? details.others.Bluetooth : 'No Information Found!'}</span></p>
                <p><b>GPS: </b><span>${details.others ? details.others.GPS : 'No Information Found!'}</span></p>
                <p><b>NFC: </b><span>${details.others ? details.others.NFC : 'No Information Found!'}</span></p>
                <p><b>Radio: </b><span>${details.others ? details.others.Radio : 'No Information Found!'}</span></p>
                <p><b>USB: </b><span>${details.others ? details.others.USB : 'No Information Found!'}</span></p>
            </div>
        </div>
    `
    DetailsproductSection.appendChild(Detailsdiv);

}