const menu={
      bolos:{label:'Bolos',mark:'BO',items:[['Nutella com ninho',12],['Nutella com maracujá',12],['Brigadeiro',10],['Prestígio',10],['Paçoca',10],['Maracujá',10]]},
      cookies:{label:'Cookies',mark:'CO',items:[['Ninho',10],['Nutella',10]]},
      batatas:{label:'Batatas',mark:'BA',items:[['Strogonoff de carne',22],['Strogonoff de frango',22],['Carne moída com queijo',22],['Frango com catupiry',22],['Bacon com queijo',22]],extras:[['Bacon',4],['Queijo',3],['Catupiry',3]]}
    };
    const money=value=>value.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
    const tabs=document.getElementById('tabs'),products=document.getElementById('products'),extras=document.getElementById('extras');
    function showCategory(key){
      const category=menu[key];
      tabs.querySelectorAll('button').forEach(button=>button.setAttribute('aria-selected',String(button.dataset.key===key)));
      products.replaceChildren();
      category.items.forEach(item=>{
        const card=document.createElement('article');card.className='product';
        const top=document.createElement('div');top.className='product-top';
        const title=document.createElement('h3');title.textContent=item[0];
        const mark=document.createElement('span');mark.className='food-mark';mark.setAttribute('aria-hidden','true');mark.textContent=category.mark;
        const price=document.createElement('div');price.className='price';price.textContent=money(item[1]);
        top.append(title,mark);card.append(top,price);products.append(card);
      });
      extras.hidden=!category.extras;
      extras.replaceChildren();
      if(category.extras){const heading=document.createElement('strong');heading.textContent='Adicionais para as batatas';extras.append(heading);category.extras.forEach(item=>{const chip=document.createElement('span');chip.className='extra-chip';chip.append(document.createTextNode(item[0]+' '));const value=document.createElement('b');value.textContent=money(item[1]);chip.append(value);extras.append(chip);});}
    }
    Object.entries(menu).forEach(([key,category])=>{const button=document.createElement('button');button.type='button';button.className='tab';button.setAttribute('role','tab');button.setAttribute('aria-selected','false');button.dataset.key=key;button.textContent=category.label;button.addEventListener('click',()=>showCategory(key));tabs.append(button);});
    showCategory('bolos');
    const toggle=document.getElementById('menu-toggle'),nav=document.getElementById('navlinks');
    toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.textContent=open?'×':'☰';});
    nav.addEventListener('click',event=>{if(event.target.closest('a')){nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.textContent='☰';}});
