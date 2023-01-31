const form = document.getElementById('form');
const qrcode = document.getElementById('qr-code');

const onFormClick = () => {
    // e.preventDefault();
    clearUI();
    const url = document.getElementById('url').value;
    const size = document.getElementById('size').value;
    console.log(url, size);

    if (url === '') {
        alert("Please Enter a URL");
    }
    else {
        showSpinner();
        //1sec loading spin 
        setTimeout(() => {
            hideSpinner();
            generateQRCode(url, size);
            setTimeout(() => {
                const saveUrl = qrcode.querySelector('img').src;
                createSaveBtn(saveUrl);
            }, 50);
        }, 1000);
    }
}

const showSpinner = () => {
    document.getElementById('spin').style.display = 'block';
}

const hideSpinner = () => {
    document.getElementById('spin').style.display = 'none';
}

     hideSpinner();

//this function is to clear the ui i.e no two qr codes to be displayed at the same time:
const clearUI = () => {
    qrcode.innerHTML = '';
    const SaveLink = document.getElementById('save-link');
    if (SaveLink) SaveLink.remove();
}

//generating the qrcode from qr library
const generateQRCode = (url, size) => {
    const qrcode = new QRCode('qr-code', {
        text: url,
        width: size,
        height: size, //taking width and height from the resolution set by user
    });
}

//creating the save button
const createSaveBtn = (saveUrl) => {
    const link = document.createElement('a');
    link.id = 'save-link';
    link.classList = 'bg-red-500 text-white';
    link.href = saveUrl;
    link.download = 'qr-code';
    link.innerHTML = 'save Image';
    document.getElementById('generated').appendChild(link);

}

//on clicking the generate QR Code Button
form.addEventListener('submit', onFormClick);


