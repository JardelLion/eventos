const modalBox = document.querySelectorAll('.modal-box')

modalBox.forEach(box => {
    const myButtonModal = box.querySelector('.modal-btn__open');
    const myModal = box.querySelector("#myModal");
    const myOverlay = box.querySelector("#myOverlay");
    const closeBtn = box.querySelector(".close-modal");

    myButtonModal.addEventListener("click", function() {
        myModal.style.display = "block";
        myOverlay.style.display = "block";

    });

    myOverlay.addEventListener("click", function() {
        myModal.style.display = "none";
        myOverlay.style.display = "none";

    });

    closeBtn.addEventListener("click", function() {
        myModal.style.display = "none";
        myOverlay.style.display = "none";
    });


})