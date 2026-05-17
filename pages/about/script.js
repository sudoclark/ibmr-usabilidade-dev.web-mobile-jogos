// ===================================================================
// about.js — só o hambúrguer, a página não precisa de mais JS
// ===================================================================
var hamburger = document.getElementById("hamburger");
var mobileMenu = document.getElementById("mobile-menu");

hamburger.addEventListener("click", function() {
  mobileMenu.classList.toggle("open");
});