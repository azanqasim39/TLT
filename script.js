const menu = [
  {category:"Barbecue",items:[
    {name:"Lamb Namkeen Tikka",half:"3,145",full:"5,795"},
    {name:"Mutton Seekh Kabab",full:"3,145"},
    {name:"Afghani Beef Kabab",full:"2,745"},
    {name:"Afghani Beef Tikka",full:"2,945"},
    {name:"Beef Seekh Kabab",full:"2,395"},
    {name:"Chicken Malai Boti",full:"2,395"},
    {name:"Chicken Tikka Boti",full:"2,395"},
    {name:"Chicken Sheesh Tawook",full:"2,395"},
    {name:"Chicken Kasturi Boti",full:"2,395"},
    {name:"Chicken Tikka",full:"1,695"},
    {name:"Chicken Seekh Kabab",full:"2,395"},
    {name:"Chicken Namkeen Tikka",full:"2,745"}
  ]},
  {category:"Chapli Kabab",items:[
    {name:"Mutton Chappal Kabab",half:"2,095",full:"3,345"},
    {name:"Beef Chappal Kabab",half:"1,785",full:"3,145"}
  ]},
  {category:"Chicken",items:[
    {name:"Chicken Karahi Shinwari",half:"1,780",full:"3,145"},
    {name:"Chicken Karahi Sulemani",full:"2,845"},
    
    {name:"Desi Chicken Karahi",half:"3,145",full:"5,245",note:"Made with butter"}
  ]},
  {category:"Pulao",items:[
    {name:"Kabuli Pulao with Lamb",full:"3,145"},
    {name:"Kabuli Pulao with Mutton",full:"3,145"},
    {name:"Mutton Yakhni Pulao",full:"3,145"},
    {name:"Kabuli Pulao with Beef",full:"2,095"},
    {name:"Plain Kabuli Pulao",full:"1,145"}
  ]},
  {category:"Lamb",items:[
    {name:"Shinwari Karahi",half:"3,145",full:"5,795"},
    {name:"Sulemani Karahi",half:"3,145",full:"5,795"},
    {name:"Lamb Qeema",half:"3,145",full:"5,795"},
    {name:"Masala Rosh",half:"3,145",full:"5,795"},
    {name:"Special Masala Rosh",half:"3,345",full:"6,295",note:"With bone marrow and naghaza"},
    {name:"Namkeen Rosh",half:"3,145",full:"5,795"},
    {name:"Ribs with Kabuli Pulao",full:"6,295",note:"Per kg"},
    {name:"Raan with Kabuli Pulao",full:"6,295",note:"Per kg"},
    {name:"Afghani Karahi Lamb",full:"6,295",note:"Golden unsalted butter"},
    {name:"Lamb White Rosh",half:"3,145",full:"6,095"},
    {name:"Lamb Shank Karahi",full:"6,295"},
    {name:"Badami Tikka",full:"5,995"}
  ]},
  {category:"Salam Dumba Dumpukht",items:[
    {name:"Salam Dumba Dumpukht",full:"5,895 / kg",note:"3 kg minimum · Pre-booking only"}
  ]},
  {category:"Mutton",items:[
    {name:"Wrata",half:"3,145",full:"5,795"},
    {name:"Shinwari Karahi",half:"3,145",full:"5,795"},
    {name:"Ribs with Kabuli Pulao",full:"6,295",note:"Per kg"},
    {name:"Raan with Kabuli Pulao",full:"6,295",note:"Per kg"},
    {name:"Mutton Afghani Karahi",full:"6,295"}
  ]},
  {category:"Platter",items:[
    {name:"Half Platter",full:"12,595",note:"Serves 3–4 · Lamb namkeen tikka, lamb ribs, mutton wrata, batair and chicken tikka with beef Kabuli pulao"},
    {name:"Full Platter",full:"20,995",note:"Serves 7–8 · Lamb namkeen tikka, lamb ribs, mutton wrata, batair and chicken tikka with beef Kabuli pulao"}
  ]},
  {category:"Sides",items:[
    {name:"Green Chatni",full:"395"},
    {name:"Tomato Chatni",full:"395"},
    {name:"Zeera Raita",full:"395"},
    {name:"Mint Raita",full:"395"},
    {name:"Fresh Salad",full:"495"},
    {name:"Imli Chatni",full:"345"}
  ]},
  {category:"Beverages",items:[
    {name:"Peshawari Kehwa",full:"195",note:"Serves 4"},
    {name:"Chai",full:"295"},
    {name:"Soft Drinks",full:"245"},
    {name:"Fresh Juices",full:"495"},
    {name:"Margarita",full:"595"},
    {name:"Mojito",full:"695"},
    {name:"Lemonade",full:"495"},
    {name:"Pina Colada",full:"795"},
    {name:"Water Small",full:"145"},
    {name:"Water Large",full:"295"},
    {name:"Fresh Lime",full:"445"}
  ]},
  {category:"Meetha",items:[
    {name:"Gur Wale Chawal",full:"1,595"},
    {name:"Gulab Jamun with Rabri",full:"995"},
    {name:"Special Desi Halwa",full:"995"}
  ]}
];

const nav = document.querySelector("#categoryNav");
const grid = document.querySelector("#menuGrid");
const search = document.querySelector("#menuSearch");
let activeCategory = "All";

function renderNav(){
  const categories = ["All", ...menu.map(section => section.category)];
  nav.innerHTML = categories.map(category =>
    '<button class="category-button'+(category===activeCategory?' active':'')+'" type="button" data-category="'+category+'">'+category+'</button>'
  ).join("");
}
function renderMenu(){
  const query = search.value.trim().toLocaleLowerCase();
  const sections = menu.filter(section => activeCategory==="All" || section.category===activeCategory)
    .map(section => ({...section,items:section.items.filter(item => (section.category+" "+item.name+" "+(item.note||"")).toLocaleLowerCase().includes(query))}))
    .filter(section => section.items.length);
  if(!sections.length){
    grid.innerHTML='<div class="empty-state">No dishes found. Try another search.</div>';
    return;
  }
  grid.innerHTML=sections.map(section => {
    const rows = section.items.map(item => {
      const portionLabels = item.half ? '<span class="price-col"><small>HALF</small>Rs '+item.half+'</span><span class="price-col"><small>FULL</small>Rs '+item.full+'</span>' :
        '<span class="price-col single-price">'+(item.full.includes("/")?'':'<small>PRICE</small>')+'Rs '+item.full+'</span>';
      return '<div class="dish"><span class="dish-name">'+item.name+(item.note?'<span class="dish-note">'+item.note+'</span>':'')+'</span><span class="dish-price">'+portionLabels+'</span></div>';
    }).join("");
    return '<article class="menu-card" id="category-'+section.category.toLowerCase().replaceAll(" ","-")+'"><div class="menu-card-head"><h3>'+section.category+'</h3><span class="category-count">'+String(section.items.length).padStart(2,"0")+' ITEMS</span></div>'+rows+'</article>';
  }).join("");
}
nav.addEventListener("click",event=>{
  const button=event.target.closest("[data-category]");
  if(!button)return;
  activeCategory=button.dataset.category;
  renderNav();renderMenu();
  if(activeCategory!=="All" && window.matchMedia("(max-width:760px)").matches) document.querySelector("#menuGrid").scrollIntoView({behavior:"smooth",block:"start"});
});
search.addEventListener("input",()=>renderMenu());
document.querySelectorAll("[data-category-jump]").forEach(link=>link.addEventListener("click",()=>{
  activeCategory=link.dataset.categoryJump;renderNav();renderMenu();
}));
const toggle=document.querySelector(".menu-toggle");
toggle.addEventListener("click",()=>{
  const open=toggle.getAttribute("aria-expanded")==="true";
  toggle.setAttribute("aria-expanded",String(!open));
  toggle.setAttribute("aria-label",open?"Open navigation":"Close navigation");
  document.querySelector(".main-nav").classList.toggle("open",!open);
});
document.querySelectorAll(".main-nav a").forEach(link=>link.addEventListener("click",()=>{
  toggle.setAttribute("aria-expanded","false");document.querySelector(".main-nav").classList.remove("open");
}));
document.querySelector("#year").textContent=new Date().getFullYear();
renderNav();renderMenu();


