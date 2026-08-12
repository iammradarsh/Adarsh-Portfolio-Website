let scrollInstance;

function locoIntialize() {
  gsap.registerPlugin(ScrollTrigger);

  scrollInstance = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true,
  });

  // Update cursor position and trigger ScrollTrigger update on scroll
  scrollInstance.on("scroll", (args) => {
    const scrollY = args.scroll.y;
    updateCursorPosition(scrollY);
  });

  scrollInstance.on("scroll", ScrollTrigger.update);

  // Link LocomotiveScroll with GSAP ScrollTrigger
  ScrollTrigger.scrollerProxy("#main", {
    scrollTop(value) {
      return arguments.length
        ? scrollInstance.scrollTo(value, 0, 0)
        : scrollInstance.scroll.instance.scroll.y;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: document.querySelector("#main").style.transform ? "transform" : "fixed",
  });

  ScrollTrigger.addEventListener("refresh", () => scrollInstance.update());
  ScrollTrigger.refresh();

  // Setup scroll animations
  animateScrollElements();

  // Refresh LocomotiveScroll once all images/resources load
  window.addEventListener("load", () => {
    setTimeout(() => {
      scrollInstance.update();
      ScrollTrigger.refresh();
    }, 500);
  });
}

function animateScrollElements() {
  // Entrance animation for Feat Items cards (.cnt)
  gsap.to("#work .cnt", {
    scrollTrigger: {
      trigger: "#work .all-works",
      scroller: "#main",
      start: "top 75%",
      toggleActions: "play none none none",
    },
    y: 0,
    opacity: 1,
    duration: 1.2,
    stagger: 0.2,
    ease: "power3.out",
  });

  // Entrance animation for Case Studies featured card
  gsap.to(".cs-featured-card", {
    scrollTrigger: {
      trigger: ".cs-featured-card",
      scroller: "#main",
      start: "top 80%",
      toggleActions: "play none none none",
    },
    y: 0,
    opacity: 1,
    duration: 1.2,
    ease: "power3.out",
  });

  // Entrance animation for Case Studies grid cards
  gsap.to(".cs-grid .cs-card", {
    scrollTrigger: {
      trigger: ".cs-grid",
      scroller: "#main",
      start: "top 80%",
      toggleActions: "play none none none",
    },
    y: 0,
    opacity: 1,
    duration: 1.2,
    stagger: 0.15,
    ease: "power3.out",
  });
}

function updateCursorPosition(scrollY) {
  const cursor = document.querySelector("#cursor");
  // Update the cursor position based on scrollY
  cursor.style.transform = `translateY(${scrollY}px)`;
}

function revealToSpan() {
  document.querySelectorAll(".reveal").forEach(function (elem) {
    // create two spans
    var parent = document.createElement("span");
    var child = document.createElement("span");

    // parent and child both sets their respective classes

    parent.classList.add("parent");
    child.classList.add("child");

    // span parents gets child and child gets elem details
    child.innerHTML = elem.innerHTML;
    parent.appendChild(child);

    // elem replaces its value with parents span

    elem.innerHTML = "";
    elem.appendChild(parent);
  });
}

function valuesSetters() {
  // homepage value set for parent child h1 tag of reveal span of (animateHomepage) function
  gsap.set("#nav a", { y: "-100%", opacity: 0 });
  gsap.set("#home span .child", { y: "100%" });
  gsap.set("#home .row img", { opacity: 0 });

  // svg animation value set of (animatesvg) function

  document.querySelectorAll("#Visual>g").forEach(function (e) {
    var character = e.childNodes[1].childNodes[1];

    character.style.strokeDasharray = character.getTotalLength() + "px";
    character.style.strokeDashoffset = character.getTotalLength() + "px";
  });
}

function loaderAnimation() {
  var tl = gsap.timeline();

  tl.from("#loader .child span", {
    x: 100,
    duration: 2,
    stagger: 0.1,
    // delay:1,
    opacity: 0.4,
    ease: Circ.easeOut,
  })
    .to("#loader .parent .child", {
      y: "-100%",
      duration: 1,
      delay: 1,
      ease: Circ.easeOut,
    })
    .to("#loader", {
      height: 0,
      duration: 2,
      ease: Expo.easeInOut,
    })
    .to("#loader-green", {
      height: "99%",
      top: 0,
      duration: 2,
      delay: -2,
      ease: Expo.easeInOut,
    })
    .to("#loader-green", {
      height: "0%",
      top: "-100%",
      duration: 0.4,
      delay: -0.4,
      ease: Expo.easeIn,
      onComplete: function () {
        animateHomepage();
        // Update locomotive scroll calculation once loader leaves
        if (typeof scrollInstance !== "undefined" && scrollInstance) {
          setTimeout(() => {
            scrollInstance.update();
          }, 200);
        }
      },
    });
}

function updateIndiaTime() {
  const options = {
    timeZone: "Asia/Kolkata",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  };

  const time = new Date().toLocaleTimeString("en-IN", options);
  const timeStr = "MY LOCAL TIME " + time;

  const timeEl = document.getElementById("india-time");
  if (timeEl) {
    const childSpan = timeEl.querySelector(".child");
    if (childSpan) {
      childSpan.innerText = timeStr;
    } else {
      timeEl.innerText = timeStr;
    }
  }
}

updateIndiaTime();
setInterval(updateIndiaTime, 1000);

function animateSvg() {
  gsap.to("#Visual>g>g>path, #Visual>g>g>polyline", {
    strokeDashoffset: 0,
    // strokeDasharray:0.000001,
    duration: 1,
    ease: Expo.easeInOut,
  });
}

function animateHomepage() {
  var tl = gsap.timeline();

  tl.to("#nav a", {
    y: 0,
    opacity: 1,
    stagger: 0.05,
    ease: Expo.easeInOut,
  })
    .to("#home  .parent .child ", {
      y: 0,
      // opacity: 1,
      stagger: 0.1,
      duration: 2,
      ease: Expo.easeInOut,
    })
    .to("#home  .row img ", {
      opacity: 1,
      ease: Expo.easeInOut,
      onComplete: function () {
        animateSvg();
      },
    });
}

function cardHover() {
  document.querySelectorAll(".cnt").forEach(function (cnt) {
    var showinImage;

    function handleMove(dets) {
      var targetElement = dets.target;

      // Ensure the target is an element with the required dataset
      if (
        targetElement &&
        targetElement.dataset &&
        targetElement.dataset.index !== undefined
      ) {
        if (dets.type === "mousemove") {
          // Mouse event logic
          document.querySelector("#cursor").children[
            targetElement.dataset.index
          ].style.opacity = 1;
          document.querySelector(".dpkCursor").style.opacity = 0;
          showinImage = targetElement;
          document.querySelector("#cursor").children[
            targetElement.dataset.index
          ].style.transform = `translate(${dets.x}px, ${dets.y}px)`;
          showinImage.style.filter = "grayscale(1)";
          document.querySelector("#work").style.backgroundColor =
            "#" + targetElement.dataset.color;
        } else if (dets.type === "touchmove") {
          // Touch event logic
          document.querySelector("#cursor").children[
            targetElement.dataset.index
          ].style.opacity = 1;
          document.querySelector(".dpkCursor").style.opacity = 0;
          showinImage = targetElement;
          let touch = dets.touches[0]; // Get touch position
          document.querySelector("#cursor").children[
            targetElement.dataset.index
          ].style.transform = `translate(${touch.pageX}px, ${touch.pageY}px)`;
          showinImage.style.filter = "grayscale(1)";
          document.querySelector("#work").style.backgroundColor =
            "#" + targetElement.dataset.color;
        }
      }
    }

    function handleLeave(dets) {
      if (
        showinImage &&
        showinImage.dataset &&
        showinImage.dataset.index !== undefined
      ) {
        document.querySelector("#cursor").children[
          showinImage.dataset.index
        ].style.opacity = 0;
        document.querySelector(".dpkCursor").style.opacity = 1;
        showinImage.style.filter = "grayscale(0)";
        document.querySelector("#work").style.backgroundColor = "#F2F2F2";
      }
    }

    cnt.addEventListener("mousemove", handleMove);
    cnt.addEventListener("mouseleave", handleLeave);
  });
}

revealToSpan();
valuesSetters();
loaderAnimation();
cardHover();
locoIntialize();

// Mobile drawer nav (markup is hidden above 768px by CSS)
function mobileDrawer() {
  var toggle = document.querySelector("#mobile-nav-toggle");
  var drawer = document.querySelector("#mobile-drawer");
  var overlay = document.querySelector("#drawer-overlay");
  if (!toggle || !drawer) return;

  function setOpen(open) {
    toggle.classList.toggle("is-open", open);
    drawer.classList.toggle("is-open", open);
    if (overlay) overlay.classList.toggle("is-open", open);
    document.body.classList.toggle("drawer-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    drawer.setAttribute("aria-hidden", String(!open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }

  toggle.addEventListener("click", function () {
    setOpen(!drawer.classList.contains("is-open"));
  });

  if (overlay) {
    overlay.addEventListener("click", function () {
      setOpen(false);
    });
  }

  drawer.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
      setOpen(false);
    });
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setOpen(false);
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) setOpen(false);
  });
}
mobileDrawer();

function slideCircle() {
  document.querySelectorAll(".slide").forEach(function (elem) {
    elem.addEventListener("mousemove", function (dets) {
      var dim = this.getBoundingClientRect();

      this.children[1].style.clipPath = `circle(30% at ${
        dets.clientX - dim.left
      }px ${dets.clientY - dim.top}px) `;
    });

    elem.addEventListener("mouseleave", function (dets) {
      var dim = this.getBoundingClientRect();

      this.children[1].style.clipPath = `circle(0% at ${
        dets.clientX - dim.left
      }px ${dets.clientY - dim.top}px) `;
    });
  });
}
slideCircle();

function skewer() {
  var dim = document.querySelector(".slide").getBoundingClientRect();
  var prev = dim.left;
  document.querySelector("#projects").addEventListener("scroll", function () {
    var dim2 = document.querySelector(".slide").getBoundingClientRect();
    var diff = prev - dim2.left;
    // console.log(diff);

    document.querySelectorAll(".slide").forEach(function (every) {
      every.style.transform = `skew(${diff * 0.15}deg)`;
    });
    prev = dim2.left;
  });
}
skewer();

// function loco() {
//   const scroll = new LocomotiveScroll({
//     el: document.querySelector("#main"),
//     smooth: true,
//   });
// }
// loco();

// gsap.from("g path",{
//     strokeDasharray:64.68521881103516,
//     strokeDashoffset:64.68521881103516,
//     duration:1,
//     ease:Expo.easeInOut
// })
