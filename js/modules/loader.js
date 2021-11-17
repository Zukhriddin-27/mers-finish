function loader() {
    const loader = document.querySelector(".loader");
    //LOADER
    setTimeout(function() {
        loader.style.oppacity = "0";
        setTimeout(function() {
            loader.style.display = "none";
        }, 200);
    }, 500);

}
export default loader;