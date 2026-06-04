// ===================================================================
// about.js — só o menu hambúrguer
// ===================================================================
var hamburger = document.getElementById("hamburger");
var mobileMenu = document.getElementById("mobile-menu");

hamburger.addEventListener("click", function() {
  mobileMenu.classList.toggle("open");
});