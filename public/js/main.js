let addPhoneBtn = document.getElementById('add-phone');

if (addPhoneBtn) {
    addPhoneBtn.addEventListener('click', savePhone);
}

function savePhone() {
    let inputBrand = document.querySelector("[name = 'brand']");
    let inputModel = document.querySelector("[name = 'model']");
    let inputPrice = document.querySelector("[name = 'price']");
    let inputCount = document.querySelector("[name = 'count']");

    API.addPhone({
        brand: inputBrand.value,
        model: inputModel.value,
        price: inputPrice.value,
        count: inputCount.value
    }).then(res => {
        if (res.status === 200) {
            window.location.href = '/';
        }
    })
}