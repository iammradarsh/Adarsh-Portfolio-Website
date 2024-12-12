function locoIntialize(){
    const scroll = new LocomotiveScroll({
        el: document.querySelector('#main'),
        smooth: true
    });
}

function cardHover(){
    var container = document.querySelectorAll(".cnt")
    
    container.forEach(function(cnt){
        var showinImage;
        cnt.addEventListener("mousemove", function(dets){
            console.log(dets.target.dataset.index); 
            document.querySelector("#cursor").children[dets.target.dataset.index].style.opacity = 1;
            showinImage = dets.target;
            document.querySelector("#cursor").children[dets.target.dataset.index].style.transform = `translate(${dets.clientX}px, ${dets.clientY}px)`
            showinImage.style.filter = "grayscale(1)"

            document.querySelector("#work").style.backgroundColor = "#" + dets.target.dataset.color

        })

        cnt.addEventListener("mouseleave", function(dets){
            document.querySelector("#cursor").children[showinImage.dataset.index].style.opacity = 0;
            showinImage.style.filter = "grayscale(0)"
            document.querySelector("#work").style.backgroundColor = "#F2F2F2" 

        })
    })

}


locoIntialize();
cardHover();