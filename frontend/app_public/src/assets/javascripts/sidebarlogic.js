if(window.location.pathname == "/map/"){
  document.getElementById("mySidenav").style.transition = "0s"
  openNav()
}
function openNav() {
  if(window.innerWidth<576){
    document.getElementById("mySidenav").style.width = "100%";
    document.getElementById("items").style.paddingTop = "30vh";
    document.getElementById("navbarImage").setAttribute("src", "/images/layout_mobile.svg")
    document.getElementById("navbarImage").style.top="100px"
    document.getElementById("navbarImage").style.right="0px"
  }else{
    document.getElementById("mySidenav").style.width = "30vw";
    document.getElementById("items").style.paddingTop = "10vh";
  }
}
function closeNav() {
  document.getElementById("mySidenav").style.transition = "0.5s";
  document.getElementById("mySidenav").style.width = "0";
}
function openBol() {
  if(document.getElementById("bolezen-drop").style.maxHeight=="0px")
    document.getElementById("bolezen-drop").style.maxHeight="500px";
  else
    document.getElementById("bolezen-drop").style.maxHeight="0px";
}
